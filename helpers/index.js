const config = require('../config');
const LoggerFactory = require('./logger-factory');
const LoggerService = require('./logger');

const logger = LoggerFactory.buildLogger({
  level: config.LOG_LEVEL,
  consoleLogPrettyPrint: config.LOG_CONSOLE_PRETTY_PRINT,
  fileLogEnabled: config.LOG_FILE_ENABLED,
  fileLogDir: config.LOG_FILE_DIR,
  serviceName: config.APP_NAME,
  consoleLogEnabled: config.LOG_CONSOLE_ENABLED,
});
const loggerService = new LoggerService(logger);

module.exports = {
  logger,
  loggerService,
};
