/**
 * Handlers for E-Mail APIs
 *
 * @summary MailService
 * @author Giammarco Boscaro
 *
 * Created at     : 2024-11-10 14:05:32
 * Last modified  : 2024-11-11 20:55:18
 */

/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { loggerService } = require('../helpers');
const mailHelper = require('../helpers/mail');

/**
* HTML E-Mail
* Sends an HTML E-Mail from a template
*
* htmlEmailRequestBody HtmlEmailRequestBody HTML Email Request Body
* returns SuccessResponse
* */
const sendHtml = async (params) => {
  const htmlEmailRequestBody = params.htmlEmailRequestBody || params.body;
  const logger = loggerService.getMethodLogger('MailService', 'sendHtml');
  try {
    logger.debug('Received new HTML email to be sent', htmlEmailRequestBody);

    if (!htmlEmailRequestBody) {
      throw new Error('Missing request body');
    }

    const replacements = mailHelper.preProcessReplacements(htmlEmailRequestBody.replacements);
    const data = { ...htmlEmailRequestBody, replacements };

    await mailHelper.htmlEmail(data);

    return Service.successResponse({
      success: true,
    });
  } catch (e) {
    logger.error(e.message);
    throw Service.rejectResponse(
      e.message || 'Invalid input',
      e.status || 405,
    );
  }
};
/**
* Plain text E-Mail
* Sends a plain text E-Mail
*
* plainTextEmailRequestBody PlainTextEmailRequestBody Plain Text Email Request Body
* returns SuccessResponse
* */
const sendPlainText = async (params) => {
  const plainTextEmailRequestBody = params.plainTextEmailRequestBody || params.body;
  const logger = loggerService.getMethodLogger('MailService', 'sendPlainText');
  try {
    logger.debug('Received new plain text email to be sent', plainTextEmailRequestBody);

    if (!plainTextEmailRequestBody) {
      throw new Error('Missing request body');
    }

    await mailHelper.plainTextEmail(plainTextEmailRequestBody);

    return Service.successResponse({
      success: true,
    });
  } catch (e) {
    logger.error(e.message);
    throw Service.rejectResponse(
      e.message || 'Invalid input',
      e.status || 405,
    );
  }
};

module.exports = {
  sendHtml,
  sendPlainText,
};
