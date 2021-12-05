/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
const logger = require('../logger');

class PrivateUtilsHelper {
  constructor() {
    this.infoLogger = this.getInfoLogger('UtilsHelper');
    this.errorLogger = this.getErrorLogger('UtilsHelper');
    this.infoLogger('constructor', 'LOADED');
  }

  getInfoLogger(service) {
    return (method, msg) => {
      logger.info(msg, { service, method });
      // let date = (new Date()).toString();
      // console.log("### " + service + "###");
      // console.log("Timestamp: " + date + " | Method: " + method);
      // console.log(msg);
    };
  }

  getErrorLogger(service) {
    return (method, msg) => {
      logger.error(msg, { service, method });
    };
  }

  preProcessReplacements(replacements) {
    const json = {};
    replacements.forEach((element) => {
      json[element.key] = element.value;
    });
    return json;
  }
}

class UtilsHelper {
  constructor() {
    throw new Error('use UtilsHelper.getInstance()');
  }

  static getInstance() {
    if (!UtilsHelper.instance) {
      UtilsHelper.instance = new PrivateUtilsHelper();
    }
    return UtilsHelper.instance;
  }
}

module.exports = UtilsHelper;
