/**
 * Logger Factory
 *
 * @summary Create a logger object to be used in Node.JS microservices
 * @author Giammarco Boscaro
 *
 * Created at     : 2024-11-10 14:00:08
 * Last modified  : 2024-11-10 14:08:58
 */

const { transports, createLogger, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

class LoggerFactory {
  constructor() {
    this.defaults = {
      level: 'info',
      origin: 'default',
      serviceName: 'mailer',
      consoleLogEnabled: true,
      consoleLogPrettyPrint: false,
      // File
      fileLogEnabled: false,
      fileLogDir: 'logs',
      // Mongo
      mongoLogEnabled: false,
      mongoUri: 'mongodb://mongo:27017',
      mongoDatabase: 'logs',
    };
  }

  /**
     * Builds a logger based on the server configuration
     * @param {any} opts server config
     * @returns {winston.Logger} logger
     */
  static buildLogger(opts) {
    const config = { ...this.defaults, ...opts };
    const logger = createLogger({
      level: config.level,
      transports: [],
      defaultMeta: {
        origin: config.origin,
        service: config.serviceName,
      },
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
    });
    if (config.consoleLogEnabled) {
      logger.add(this.consoleTransport(config));
    }
    if (config.fileLogEnabled) {
      logger.add(this.logRotateTransport('info', config));
      logger.add(this.logRotateTransport('error', config));
    }
    if (config.mongoLogEnabled) {
      logger.add(this.mongoDBTransport(config));
    }
    return logger;
  }

  /**
     * Configure a winston file transport by level
     * @param {string} level
     * @param {any} config Logger config
     * @returns {FileTransportInstance} winston file log transport
     */
  static fileTransport(level, config) {
    return new transports.File({
      level,
      filename: level,
      // extension: '.log',
      dirname: config.fileLogDir,
      // timestamp: true,
      maxsize: 10000000, // 10MB
      maxFiles: 10,
      tailable: true,
    });
  }

  /**
     * Configure a winston file transport with log rotate by level
     * @param {string} level
     * @param {any} config Logger config
     * @returns {DailyRotateFile} winston log transport
    */
  static logRotateTransport(level, config) {
    return new DailyRotateFile({
      level,
      filename: level,
      extension: '.log',
      symlinkName: `${level}.log`,
      dirname: config.fileLogDir,
      frequency: '1d',
      datePattern: 'YYYY-MM-DDTHH:mm:ss',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '7d',
      auditFile: `${config.fileLogDir}/${config.serviceName}.${level}-audit.json`,
    });
  }

  /**
     * Configure a winston console transport
     * @param {any} config Logger config
     * @returns {ConsoleTransportInstance} winston log transport
    */
  static consoleTransport(config) {
    let customFormat = format.combine(
      format.timestamp(),
      format.json(),
    );
    if (config.consoleLogPrettyPrint) {
      customFormat = format.combine(customFormat, format.prettyPrint());
    }
    return new transports.Console({
      level: config.level,
      format: customFormat,
    });
  }
}

module.exports = LoggerFactory;
