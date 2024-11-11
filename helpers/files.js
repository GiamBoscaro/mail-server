/**
 * Handles files to send as E-Mail attachments
 *
 * @summary Files Helper
 * @author Giammarco Boscaro
 *
 * Created at     : 2024-11-10 14:04:20
 * Last modified  : 2024-11-11 20:44:53
 */

const fs = require('fs');
const { loggerService } = require('.');

const logger = loggerService.getClassLogger('FilesHelper');

/**
 * Creates a new folder in the desired path
 * @param {string} dirPath
 * @returns {boolean} true if successful
 */
function createFolder(dirPath) {
  return fs.mkdirSync(dirPath, true);
}

/**
 * Write a file in the specified path
 * @param {string} fileContent
 * @param {string} targetPath
 * @param {string} encoding
 * @returns {boolean} true if successful
 */
function writeFile(fileContent, targetPath, encoding) {
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
function deleteFile(filePath) {
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
function readFile(filePath, encoding) {
  try {
    return fs.readFileSync(filePath, encoding || 'utf8');
  } catch (e) {
    logger.error('readFile', e.message);
    return null;
  }
}

module.exports = {
  readFile,
  writeFile,
  deleteFile,
  createFolder,
};
