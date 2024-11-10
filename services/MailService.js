/**
 * Handlers for E-Mail APIs
 *
 * @summary MailService
 * @author Giammarco Boscaro
 *
 * Created at     : 2024-11-10 14:05:32
 * Last modified  : 2024-11-10 14:30:35
 */

/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { loggerService } = require('../helpers');
const mailHelper = require('../helpers/mail').getInstance();

/**
* HTML E-Mail
* Sends an HTML E-Mail from a template
*
* htmlEmailRequestBody HtmlEmailRequestBody HTML Email Request Body
* returns SuccessResponse
* */
const sendHtml = ({ htmlEmailRequestBody }) => new Promise(
  async (resolve, reject) => {
    const logger = loggerService.getMethodLogger('MailService', 'sendHtml');
    try {
      logger.debug('Received new HTML email to be sent', htmlEmailRequestBody);
      const replacements = mailHelper.preProcessReplacements(htmlEmailRequestBody.replacements);
      const data = htmlEmailRequestBody;
      data.replacements = replacements;
      await mailHelper.htmlEmail(data);
      resolve(Service.successResponse({
        success: true,
      }));
    } catch (e) {
      logger.error('sendHtml', e.message);
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Plain text E-Mail
* Sends a plain text E-Mail
*
* plainTextEmailRequestBody PlainTextEmailRequestBody Plain Text Email Request Body
* returns SuccessResponse
* */
const sendPlainText = ({ plainTextEmailRequestBody }) => new Promise(
  async (resolve, reject) => {
    const logger = loggerService.getMethodLogger('MailService', 'sendPlainText');
    try {
      logger.debug('Received new plain text email to be sent', plainTextEmailRequestBody);
      await mailHelper.plainTextEmail(plainTextEmailRequestBody);
      resolve(Service.successResponse({
        success: true,
      }));
    } catch (e) {
      logger.error('sendPlainText', e.message);
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  sendHtml,
  sendPlainText,
};
