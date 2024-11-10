/**
 * Handles files to send as E-Mail attachments
 *
 * @summary Files Helper
 * @author Giammarco Boscaro
 *
 * Created at     : 2024-11-10 14:04:20
 * Last modified  : 2024-11-10 14:04:20
 */

const fs = require('fs');
const { loggerService } = require('.');

const logger = loggerService.getClassLogger('FilesHelper');

class PrivateFilesHelper {
  constructor() {
    logger.debug('constructor', 'LOADED');
  }

  /**
   * Creates a new folder in the desired path
   * @param {string} dirPath
   * @returns {boolean} true if successful
   */
  createFolder(dirPath) {
    return fs.mkdirSync(dirPath, true);
  }

  /**
   * Write a file in the specified path
   * @param {string} fileContent
   * @param {string} targetPath
   * @param {string} encoding
   * @returns {boolean} true if successful
   */
  writeFile(fileContent, targetPath, encoding) {
    try {
      fs.writeFileSync(targetPath, fileContent, encoding || 'utf8');
      return true;
    } catch (e) {
      logger.error('writeFile', e.message);
      return false;
    }
  }

  /**
   * Deletes a file in the specified path
   * @param {string} filePath
   * @returns {boolean} true if successful
   */
  deleteFile(filePath) {
    try {
      fs.unlinkSync(filePath);
      return true;
    } catch (e) {
      logger.error('deleteFile', e.message);
      return false;
    }
  }

  /**
   * Read the content of a file
   * @param {string} filePath
   * @param {string} encoding
   * @returns {string} file content
   */
  readFile(filePath, encoding) {
    try {
      return fs.readFileSync(filePath, encoding || 'utf8');
    } catch (e) {
      logger.error('readFile', e.message);
      return null;
    }
  }
}

class FilesHelper {
  constructor() {
    throw new Error('use FilesHelper.getInstance()');
  }

  static getInstance() {
    if (!FilesHelper.instance) {
      FilesHelper.instance = new PrivateFilesHelper();
    }
    return FilesHelper.instance;
  }
}

module.exports = FilesHelper;
