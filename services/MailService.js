/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
const Service = require('./Service');
const MailHelper = require('../helpers/mail').getInstance();
const utilsHelper = require('../helpers/utils').getInstance();

const infoLogger = utilsHelper.getInfoLogger('MailService');
const errorLogger = utilsHelper.getErrorLogger('MailService');

/**
* Sends an HTML template E-Mail
* Sends an HTML E-Mail from a template
*
* sendHtmlTemplateBody SendHtmlTemplateBody
* returns inline_response_200
* */
const sendHtmlTemplate = ({ sendHtmlTemplateBody }) => new Promise(
  async (resolve, reject) => {
    try {
      infoLogger('sendHtmlTemplate', sendHtmlTemplateBody);
      // Transforms the array of tuples in a json dictionary that works with nodemailer
      const replacements = utilsHelper.preProcessReplacements(sendHtmlTemplateBody.replacements);
      const data = sendHtmlTemplateBody;
      data.replacements = replacements;
      // Sends the email
      await MailHelper.sendHtmlMessage(data);
      resolve(Service.successResponse({
        success: true,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

/**
* Sends a plain text E-Mail
* Sends a plain text E-Mail
*
* sendPlainTextBody SendPlainTextBody
* returns inline_response_200
* */
const sendPlainText = ({ sendPlainTextBody }) => new Promise(
  async (resolve, reject) => {
    try {
      infoLogger('sendPlainText', sendPlainTextBody);
      await MailHelper.sendPlainMessage(sendPlainTextBody);
      resolve(Service.successResponse({
        success: true,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  sendHtmlTemplate,
  sendPlainText,
};
