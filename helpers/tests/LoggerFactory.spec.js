const LoggerFactory = require('../logger-factory');

const defaultConfig = {
  level: 'info',
  serviceName: 'test',
  consoleLogEnabled: true,
  consoleLogPrettyPrint: false,
  // File
  fileLogEnabled: true,
  fileLogDir: 'tests/out/LoggerService.spec/logs',
};

describe('buildLogger', () => {
  test('Imports the LoggerFactory class', (done) => {
    try {
      expect(typeof LoggerFactory).toBe('function');
      done();
    } catch (e) {
      expect(e).toBeDefined();
      done(e);
    }
  });
  test('Builds a logger service from the factory', (done) => {
    try {
      const logger = LoggerFactory.buildLogger(defaultConfig);
      expect(typeof logger).toBe('object');
      expect(logger.transports.length).toBe(3);
      done();
    } catch (e) {
      expect(e).toBeDefined();
      done(e);
    }
  });
});

describe('Console Transport', () => {
  test('Logs within a single line', (done) => {
    try {
      const logger = LoggerFactory.buildLogger(defaultConfig);
      expect(typeof logger).toBe('object');
      logger.info('This is a single line JSON message', { component: 'Component', service: 'Service' });
      done();
    } catch (e) {
      expect(e).toBeDefined();
      done(e);
    }
  });
  test('Pretty prints a log in multiple lines', (done) => {
    try {
      const logger = LoggerFactory.buildLogger({
        ...defaultConfig,
        consoleLogPrettyPrint: true,
      });
      expect(typeof logger).toBe('object');
      logger.info('This is a multi line JSON message', { component: 'Component', service: 'Service' });
      done();
    } catch (e) {
      expect(e).toBeDefined();
      done(e);
    }
  });
});
