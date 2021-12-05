const { transports, createLogger, format } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  defaultMeta: { service: 'common-service' },
  transports: [
    // new transports.Console(),
    new transports.File({ filename: './logs/error.log', level: 'error', timestamp: true }),
    new transports.File({ filename: './logs/combined.log', level: 'info', timestamp: true }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    level: 'debug',
    format: format.combine(
      format.timestamp(),
      format.json(),
      format.prettyPrint(),
      format.colorize(),
    ),
  }));
}

module.exports = logger;
