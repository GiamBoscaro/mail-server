/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
const fs = require('fs');
const path = require('path');
const utilsHelper = require('./utils').getInstance();

const infoLogger = utilsHelper.getInfoLogger('FileUtilsHelper');
const errorLogger = utilsHelper.getErrorLogger('FileUtilsHelper');

class PrivateFileUtilsHelper {
  constructor() {
    infoLogger('constructor', 'LOADED');
  }

  createFolder(dirPath) {
    fs.mkdirSync(dirPath, (err) => {
      if (err) return errorLogger('createFolder', err.message);
      infoLogger('createFolder', 'New directory successfully created.');
      return true;
    });
  }

  cleanFileName(fileName) {
    return fileName.trim().toLowerCase().replace(/\s/g, '_');
  }

  getFileExtension(filePath) {
    return path.parse(filePath).ext.split('.').pop();
  }

  writeFile(fileContent, targetPath, encoding) {
    try {
      fs.writeFileSync(targetPath, fileContent, encoding || 'utf8');
      return true;
    } catch (e) {
      errorLogger('writeFile', e.message);
      return false;
    }
  }

  deleteFile(filePath) {
    try {
      fs.unlinkSync(filePath);
      return true;
    } catch (e) {
      errorLogger('deleteFile', e.message);
      return false;
    }
  }

  readFile(filePath, encoding) {
    try {
      return fs.readFileSync(filePath, encoding || 'utf8');
    } catch (e) {
      errorLogger('readFile', e.message);
      return null;
    }
  }
}

class FileUtilsHelper {
  constructor() {
    throw new Error('use FileUtilsHelper.getInstance()');
  }

  static getInstance() {
    if (!FileUtilsHelper.instance) {
      FileUtilsHelper.instance = new PrivateFileUtilsHelper();
    }
    return FileUtilsHelper.instance;
  }
}

module.exports = FileUtilsHelper;
