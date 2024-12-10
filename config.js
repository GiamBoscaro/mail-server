const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  ROOT_DIR: __dirname,
  URL_PORT: 3000,
  URL_PATH: 'http://localhost',
  BASE_VERSION: '/api',
  CONTROLLER_DIRECTORY: path.join(__dirname, 'controllers'),
  PROJECT_DIR: __dirname,
  APP_NAME: 'mail-server',
  NODE_ENV: process.env.NODE_ENV || 'development',
  // SMTP
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_FROM: process.env.MAIL_FROM,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_PORT: process.env.MAIL_PORT ? parseFloat(process.env.MAIL_PORT, 10) : 25,
  MAIL_SECURE: process.env.MAIL_SECURE === 'true' || false,
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE ? parseFloat(process.env.MAX_FILE_SIZE, 10) : 10,
  // LOGGING
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  LOG_CONSOLE_ENABLED: process.env.LOG_CONSOLE_ENABLED === 'true' || false,
  LOG_CONSOLE_PRETTY_PRINT: process.env.LOG_CONSOLE_PRETTY_PRINT === 'true' || false,
  LOG_FILE_ENABLED: process.env.LOG_FILE_ENABLED === 'true' || false,
  LOG_FILE_DIR: process.env.LOG_FILE_DIR || `${__dirname}/logs`,
};
config.OPENAPI_YAML = path.join(config.ROOT_DIR, 'api', 'openapi.yaml');
config.FULL_PATH = `${config.URL_PATH}:${config.URL_PORT}/${config.BASE_VERSION}`;
config.FILE_UPLOAD_PATH = path.join(config.PROJECT_DIR, 'uploaded_files');
config.ASSETS_PATH = process.env.ASSETS_PATH || path.join(config.ROOT_DIR, 'templates');

module.exports = config;
