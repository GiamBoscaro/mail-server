/**
 * Loads error definitions from the database and throws error based on error codes
 *
 * @summary Errors Handler Helper
 * @author Giammarco Boscaro
 *
 * Created at     : 2023-06-21 14:45:14
 * Last modified  : 2024-11-10 14:02:35
 */

class LoggerService {

  constructor(logger) {
    this.logger = logger;
  }

  /**
     * Wraps a winston logger in a class logger that automatically prints the class
     * from where the log occurs
     * @param {string} component name of the class/service where the logger is being used
     * @returns {object} Class logger object
     */
  getClassLogger(component, additionalMetadata) {
    return {
      error: (method, message, data) => this.logger.error(message, { component, method, ...additionalMetadata, data }),
      warn: (method, message, data) => this.logger.warn(message, { component, method, ...additionalMetadata, data }),
      info: (method, message, data) => this.logger.info(message, { component, method, ...additionalMetadata, data }),
      http: (method, message, data) => this.logger.http(message, { component, method, ...additionalMetadata, data }),
      debug: (method, message, data) => this.logger.debug(message, { component, method, ...additionalMetadata, data }),
      verbose: (method, message, data) => this.logger.verbose(message, { component, method, ...additionalMetadata, data }),
      silly: (method, message, data) => this.logger.silly(message, { component, method, ...additionalMetadata, data }),
    };
  }

  /**
     * Wraps a winston logger in a method logger that automatically prints the class
     * and the method from where the log occurs
     * @param {string} component name of the class/service where the logger is being used
     * @param {string} method name of the method where the logger is being used
     * @returns {object} Method logger object
     */
  getMethodLogger(component, method, additionalMetadata) {
    return {
      error: (message, data) => this.logger.error(message, { component, method, ...additionalMetadata, data }),
      warn: (message, data) => this.logger.warn(message, { component, method, ...additionalMetadata, data }),
      info: (message, data) => this.logger.info(message, { component, method, ...additionalMetadata, data }),
      http: (message, data) => this.logger.http(message, { component, method, ...additionalMetadata, data }),
      debug: (message, data) => this.logger.debug(message, { component, method, ...additionalMetadata, data }),
      verbose: (message, data) => this.logger.verbose(message, { component, method, ...additionalMetadata, data }),
      silly: (message, data) => this.logger.silly(message, { component, method, ...additionalMetadata, data }),
    };
  }
}

module.exports = LoggerService;
