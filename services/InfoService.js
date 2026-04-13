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
const fs = require('fs').promises;
const Service = require('./Service');
const { loggerService } = require('../helpers');

/**
* Server version
* Returns the server version running
*
* returns Version
* */
const version = async () => {
  const logger = loggerService.getMethodLogger('InfoService', 'version');
  try {
    const filename = 'package.json';
    const absPath = path.join(process.cwd(), filename);

    const fileContent = await fs.readFile(absPath, 'utf8');
    const data = JSON.parse(fileContent);
    const [major, minor, patch] = data.version.split('.');
    const v = {
      major: parseInt(major, 10),
      minor: parseInt(minor, 10),
      patch: parseInt(patch, 10),
      version: data.version,
    };
    return Service.successResponse(v);
  } catch (e) {
    logger.error(e.message);
    throw Service.rejectResponse(
      e.message || 'Invalid input',
      e.status || 500,
    );
  }
};

module.exports = {
  version,
};
