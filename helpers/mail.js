/* eslint-disable max-classes-per-file */
/** MAIL SERVICE
*/

const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const isHtml = require('is-html');
const path = require('path');
const utilsHelper = require('./utils').getInstance();
const TemplateTypesEnum = require('../enums/templateTypes');

const infoLogger = utilsHelper.getInfoLogger('MailHelper');
const errorLogger = utilsHelper.getErrorLogger('MailHelper');

class PrivateMailHelper {
  constructor() {
    this.templatesPath = path.join(process.cwd(), 'templates');
    this.createClient();
    infoLogger('constructor', 'LOADED');
  }

  getClient() {
    if (this.client) return this.client;
    this.createClient();
    return this.client;
  }

  createClient() {
    this.client = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      service: 'mail',
      //   secureConnection: process.env.SECURE === 'true',
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  loadTemplate(templateData) {
    try {
      const { type, encoding, content } = templateData;
      if (type === TemplateTypesEnum.PATH) {
        const filePath = path.join(this.templatesPath, content);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return fileContent;
      }
      if (type === TemplateTypesEnum.RAW) {
        return Buffer.from(content, encoding);
      }
      throw new Error('Wrong Template Type');
    } catch (e) {
      errorLogger('loadTemplate', e.message);
      return null;
    }
  }

  sendMail(options) {
    return new Promise((resolve, reject) => {
      this.client.sendMail(options, (error, info) => {
        if (error) return reject(error);
        infoLogger('sendMail', info.response);
        return resolve(info);
      });
    });
  }

  sendPlainMessage(data) {
    infoLogger('sendPlainMessage', data);
    try {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: data.to.join(','),
        cc: data.cc ? data.cc.join(',') : [],
        bcc: data.bcc ? data.bcc.join(',') : [],
        subject: data.subject,
        text: data.body,
      };
      return this.sendMail(mailOptions);
    } catch (e) {
      errorLogger('sendPlainMessage', e);
      throw e;
    }
  }

  sendHtmlMessage(data) {
    infoLogger('sendHtmlMessage', data);
    try {
      const fileContent = this.loadTemplate(data.template);
      if (!isHtml(fileContent)) { throw new Error('The template file content is not HTML'); }
      const template = handlebars.compile(fileContent.toString());
      const compiledHtml = template(data.replacements ? data.replacements : {});

      const mailOptions = {
        from: process.env.MAIL_USER,
        to: data.to.join(','),
        cc: data.cc ? data.cc.join(',') : null,
        bcc: data.bcc ? data.bcc.join(',') : null,
        subject: data.subject,
        text: data.body,
        html: compiledHtml,
        attachments: data.attachments ? data.attachments : null,
      };
      return this.sendMail(mailOptions);
    } catch (e) {
      errorLogger('sendHtmlMessage', e);
      throw e;
    }
  }
}

class MailHelper {
  constructor() {
    throw new Error('use MailHelper.getInstance()');
  }

  static getInstance() {
    if (!MailHelper.instance) {
      MailHelper.instance = new PrivateMailHelper();
    }
    return MailHelper.instance;
  }
}

module.exports = MailHelper;
