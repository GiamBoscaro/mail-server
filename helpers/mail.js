/**
 * Sends E-Mails through Nodemon
 *
 * @summary Mailer Helper
 * @author Giammarco Boscaro
 *
 * Created at     : 2024-11-10 14:04:05
 * Last modified  : 2024-11-11 20:38:49
 */

const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const isHtml = require('is-html');
const { loggerService } = require('.');
const config = require('../config');

const TemplateType = Object.freeze({
  RAW: 'raw',
  PATH: 'path',
});

const logger = loggerService.getClassLogger('MailHelper');

class PrivateMailHelper {
  constructor() {
    this.connect();
    logger.debug('constructor', 'LOADED');
  }

  /**
   * Creates the nodemailer client to send
   * email through the SMTP server
   */
  connect() {
    const mailSettings = {
      name: `node-mailer-${config.NODE_ENV}`,
      service: 'mail',
      host: config.MAIL_HOST,
      port: config.MAIL_PORT,
      secure: config.MAIL_SECURE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    };
    logger.info('connect', { ...mailSettings, auth: null });
    this.client = nodemailer.createTransport(mailSettings);
  }

  /**
   * Sends a plain text email
   * @param {any} data
   * @returns {Promise} response
   */
  plainTextEmail(data) {
    logger.silly('plainTextEmail', data);
    try {
      const mailOptions = {
        ...this.buildHeader(data),
        text: data.body,
      };
      return this.sendMail(mailOptions);
    } catch (e) {
      logger.error('plainTextEmail', e.message);
      throw e;
    }
  }

  /**
   * Sends an HTML email by loading the
   * content into an HTML template
   * @param {any} data
   * @returns {Promise} response
   */
  htmlEmail(data) {
    logger.silly('htmlEmail', data);
    try {
      const fileContent = this.loadTemplate(data.template);
      if (!isHtml(fileContent)) { throw new Error('The template file content is not HTML'); }
      const template = handlebars.compile(fileContent.toString());
      const compiledHtml = template(data.replacements || {});
      const mailOptions = {
        ...this.buildHeader(data),
        text: data.body,
        html: compiledHtml,
        attachments: data.attachments || null,
      };
      return this.sendMail(mailOptions);
    } catch (e) {
      logger.error('htmlEmail', e);
      throw e;
    }
  }

  /**
   * Send an email through nodemailer
   * @param {any} options
   * @returns {Promise} response
   */
  sendMail(options) {
    return new Promise((resolve, reject) => {
      this.client.sendMail(options, (error, info) => {
        if (error) return reject(error);
        logger.info('sendMail', info.response);
        return resolve(info);
      });
    });
  }

  /**
   * Transforms the array of tuples in a json dictionary that works with nodemailer
   * @param {{key: string, value: string}[]} replacements
   * @returns {any}
   */
  preProcessReplacements(replacements) {
    const json = {};
    if (replacements) {
      replacements.forEach((element) => {
        json[element.key] = element.value;
      });
    }
    return json;
  }

  /**
   * Loads a template either from the file system
   * or from the base64 content of the request, based
   * on the content type
   * @param {any} data
   * @returns {Buffer} template content
   */
  loadTemplate(data) {
    logger.silly('loadTemplate', data);
    try {
      const { type, encoding, content } = data;
      if (type === TemplateType.PATH) {
        const filePath = path.join(config.ASSETS_PATH, content);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return fileContent;
      }
      if (type === TemplateType.RAW) {
        return Buffer.from(content, encoding);
      }
      throw new Error(`Unsupported template type ${type}`);
    } catch (e) {
      logger.error('loadTemplate', e.message);
      return null;
    }
  }

  /**
   * Creates the mail header object
   * containing to, from, subject etc.
   * @param {any} data
   * @returns {any} email header
   */
  buildHeader(data) {
    return {
      from: data.from || process.env.MAIL_USER,
      to: data.to.join(','),
      cc: data.cc ? data.cc.join(',') : [],
      bcc: data.bcc ? data.bcc.join(',') : [],
      subject: data.subject,
    };
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
