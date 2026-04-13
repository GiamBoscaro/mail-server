const config = require('./config');
const { loggerService } = require('./helpers');
const ExpressServer = require('./expressServer');

const logger = loggerService.getMethodLogger('ExpressServer', 'launchServer');

let expressServer;

const launchServer = async () => {
  try {
    expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
    expressServer.launch();
    logger.info('Express server running');
  } catch (error) {
    logger.error(`Express Server failure ${error.message}`);
    process.exit(1);
  }
};

const gracefulShutdown = async (signal) => {
  logger.info(`${signal} signal received: closing HTTP server`);
  if (expressServer) {
    await expressServer.close();
  }
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

launchServer().catch((e) => {
  logger.error(e);
  process.exit(1);
});
