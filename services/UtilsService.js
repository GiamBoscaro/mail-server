/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const path = require('path');
const Service = require('./Service');
const utilsHelper = require('../helpers/utils').getInstance();

const infoLogger = utilsHelper.getInfoLogger('UtilsService');
const errorLogger = utilsHelper.getErrorLogger('UtilsService');

/**
* API version
* Checks the API version running on the server
*
* returns Version
* */
const getApiVersion = () => new Promise(
  async (resolve, reject) => {
    try {
      infoLogger('getApiVersion', 'Request Received');
      const filename = 'version';
      const absPath = path.join(process.cwd(), filename);
      fs.readFile(absPath, 'utf8', (err, data) => {
        if (err) return errorLogger('getApiVersion', err);
        const [major, minor, patch] = data.split('.');
        const v = {
          major: parseInt(major, 10),
          minor: parseInt(minor, 10),
          patch: parseInt(patch, 10),
          version: data,
        };
        return resolve(Service.successResponse(v));
      });
    } catch (e) {
      errorLogger('getApiVersion', e);
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  getApiVersion,
};
