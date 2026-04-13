/* eslint-disable no-shadow */
const LoggerFactory = require('../logger-factory');
const LoggerService = require('../logger');

const defaultConfig = {
  level: 'info',
  serviceName: 'vc-commons',
  consoleLogEnabled: true,
  // File
  fileLogEnabled: true,
  fileLogDir: 'tests/out/LoggerService.spec/logs',
};

const logger = LoggerFactory.buildLogger(defaultConfig);
const service = new LoggerService(logger);

describe('constructor', () => {
  test('Istantiates a new LoggerService', () => {
    const logger = LoggerFactory.buildLogger(defaultConfig);
    const service = new LoggerService(logger);
    expect(typeof service).toBe('object');
    expect(typeof service.getClassLogger).toBe('function');
    expect(typeof service.getMethodLogger).toBe('function');
    expect(typeof service.getClassLogger('class')).toBe('object');
    expect(typeof service.getMethodLogger('class', 'method')).toBe('object');
  });
});

describe('getClassLogger', () => {
  test('Returns the class logger', () => {
    const classLogger = service.getClassLogger('Class');
    classLogger.debug('Method', 'Message');
    classLogger.error('Method', 'Message');
    classLogger.http('Method', 'Message');
    classLogger.info('Method', 'Message');
    classLogger.silly('Method', 'Message');
    classLogger.verbose('Method', 'Message');
    classLogger.warn('Method', 'Message');
  });
  test('Logs with additional metadata', () => {
    const classLogger = service.getClassLogger('Class', { user: 'test123' });
    classLogger.info('Method', 'Message');
  });
  test('Logs an object', () => {
    const classLogger = service.getClassLogger('Class', { user: 'test123' });
    classLogger.info('Method', 'Message', { new: {}, old: {} });
  });
});

describe('getMethodLogger', () => {
  test('Returns the class logger', () => {
    const methodLogger = service.getMethodLogger('Class', 'Method');
    methodLogger.debug('Message');
    methodLogger.error('Message');
    methodLogger.http('Message');
    methodLogger.info('Message');
    methodLogger.silly('Message');
    methodLogger.verbose('Message');
    methodLogger.warn('Message');
  });
  test('Logs with additional metadata', () => {
    const methodLogger = service.getMethodLogger('Class', 'Method', { user: 'test123' });
    methodLogger.info('Message');
  });
  test('Logs an object', () => {
    const methodLogger = service.getMethodLogger('Class', 'Method', { user: 'test123' });
    methodLogger.info('Message', { new: {}, old: {} });
  });
});
