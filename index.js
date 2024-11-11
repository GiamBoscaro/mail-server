const config = require('./config');
const { loggerService } = require('./helpers');
const ExpressServer = require('./expressServer');

const logger = loggerService.getMethodLogger('ExpressServer', 'launchServer');

const launchServer = async () => {
  try {
    this.expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
    this.expressServer.launch();
    logger.info('Express server running');
  } catch (error) {
    logger.error(`Express Server failure ${error.message}`);
    await this.close();
  }
};

launchServer().catch((e) => logger.error(e));
