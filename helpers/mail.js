/**
 * Sends E-Mails through Nodemon
 *
 * @summary Mailer Helper
 * @author Giammarco Boscaro
 *
 * Created at     : 2024-11-10 14:04:05
 * Last modified  : 2024-12-10 19:04:08
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

let client = null;

/**
 * Creates the nodemailer client to send
 * email through the SMTP server
 */
function connect() {
  const mailSettings = {
    name: `node-mailer-${config.NODE_ENV}`,
    service: 'mail',
    host: config.MAIL_HOST,
    port: config.MAIL_PORT,
    secure: config.MAIL_SECURE,
    auth: {
      user: config.MAIL_USER,
      pass: config.MAIL_PASSWORD,
    },
  };
  logger.info('connect', { ...mailSettings, auth: null });
  client = nodemailer.createTransport(mailSettings);
}

function getClient() {
  if (!client) {
    connect();
  }
  return client;
}

/**
 * Send an email through nodemailer
 * @param {any} options
 * @returns {Promise} response
 */
async function sendMail(options) {
  try {
    const info = await getClient().sendMail(options);
    logger.info('sendMail', info.response);
    return info;
  } catch (error) {
    logger.error('sendMail failure', error.message);
    throw error;
  }
}

/**
 * Transforms the array of tuples in a json dictionary that works with nodemailer
 * @param {{key: string, value: string}[]} replacements
 * @returns {any}
 */
const preProcessReplacements = (replacements) => {
  const json = {};
  if (replacements) {
    replacements.forEach(({ key, value }) => {
      json[key] = value;
    });
  }
  return json;
};

/**
 * Loads a template either from the file system
 * or from the base64 content of the request, based
 * on the content type
 * @param {any} data
 * @returns {string|Buffer} template content
 */
async function loadTemplate(data) {
  logger.silly('loadTemplate', data);
  try {
    const { type, encoding, content } = data;
    if (type === TemplateType.PATH) {
      const filePath = path.join(config.ASSETS_PATH, content);
      return await fs.promises.readFile(filePath, 'utf8');
    }
    if (type === TemplateType.RAW) {
      return Buffer.from(content, encoding);
    }
    throw new Error(`Unsupported template type ${type}`);
  } catch (e) {
    logger.error('loadTemplate', e.message);
    throw e;
  }
}

/**
 * Creates the mail header object
 * containing to, from, subject etc.
 * @param {any} data
 * @returns {any} email header
 */
const buildHeader = (data) => ({
  from: data.from || config.MAIL_FROM,
  to: data.to.join(','),
  cc: data.cc ? data.cc.join(',') : [],
  bcc: data.bcc ? data.bcc.join(',') : [],
  subject: data.subject,
});

/**
 * Sends a plain text email
 * @param {any} data
 * @returns {Promise} response
 */
async function plainTextEmail(data) {
  logger.silly('plainTextEmail', data);
  const mailOptions = {
    ...buildHeader(data),
    text: data.body,
  };
  return sendMail(mailOptions);
}

/**
 * Sends an HTML email by loading the
 * content into an HTML template
 * @param {any} data
 * @returns {Promise} response
 */
async function htmlEmail(data) {
  logger.silly('htmlEmail', data);
  const fileContent = await loadTemplate(data.template);
  if (!isHtml(fileContent.toString())) {
    throw new Error('The template file content is not HTML');
  }
  const template = handlebars.compile(fileContent.toString());
  const compiledHtml = template(data.replacements || {});
  const mailOptions = {
    ...buildHeader(data),
    text: data.body,
    html: compiledHtml,
    attachments: data.attachments || null,
  };
  return sendMail(mailOptions);
}

module.exports = {
  preProcessReplacements,
  connect,
  plainTextEmail,
  htmlEmail,
  loadTemplate,
  buildHeader,
};
