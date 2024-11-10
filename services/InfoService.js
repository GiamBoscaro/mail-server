/**
 * API handlers for server status and info
 *
 * @summary InfoService
 * @author Giammarco Boscaro
 *
 * Created at     : 2024-11-10 14:05:14
 * Last modified  : 2024-11-10 14:05:14
 */

/* eslint-disable no-unused-vars */
const path = require('path');
const fs = require('fs');
const Service = require('./Service');
const { loggerService } = require('../helpers');

const logger = loggerService.getClassLogger('InfoService');

/**
* Server version
* Returns the server version running
*
* returns Version
* */
const version = () => new Promise(
  async (resolve, reject) => {
    try {
      logger.debug('version');
      const filename = 'package.json';
      const absPath = path.join(process.cwd(), filename);

      fs.readFile(absPath, 'utf8', (e, data) => {
        if (e) {
          logger.error('readFile', e.message);
          return reject(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 500,
          ));
        }
        data = JSON.parse(data);
        const [major, minor, patch] = data.version.split('.');
        const v = {
          major: parseInt(major, 10),
          minor: parseInt(minor, 10),
          patch: parseInt(patch, 10),
          version: data.version,
        };
        return resolve(Service.successResponse(v));
      });
    } catch (e) {
      logger.error('version', e.message);
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  version,
};
