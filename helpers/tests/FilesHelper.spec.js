/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs');
const helper = require('../files');

describe('createFolder', () => {
  test('Creates a new folder', () => {
    // Prepares test environment
    const directoryPath = path.join(process.cwd(), 'tests', 'tmp');
    try {
      fs.rmdirSync(directoryPath, { force: true });
    } catch (e) {
      console.warn(e.message);
    }
    // Run test
    const res = helper.createFolder(directoryPath);
    expect(res).toBe(undefined);
    const exists = fs.existsSync(directoryPath);
    expect(exists).toBe(true);
  });
  test('Try to create a folder that already exist', () => {
    // Prepares test environment
    const directoryPath = path.join(process.cwd(), 'tests', 'tmp');
    try {
      fs.rmdirSync(directoryPath, { force: true });
    } catch (e) {
      console.warn(e.message);
    }
    // Run test
    helper.createFolder(directoryPath);
    try {
      helper.createFolder(directoryPath);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});

describe('writeFile', () => {
  test('Write some content to a file', () => {
    const filePath = path.join(process.cwd(), 'tests', 'tmp', 'test.txt');
    try {
      fs.rmSync(filePath, { force: true });
    } catch (e) {
      console.warn(e.message);
    }
    const res = helper.writeFile('This is a test file', filePath);
    expect(res).toBeDefined();
    expect(res).toBe(true);
    const content = helper.readFile(path.join(process.cwd(), 'tests', 'tmp', 'test.txt'));
    expect(content).toBeDefined();
    expect(content).toBe('This is a test file');
  });
});

describe('readFile', () => {
  test('Read the content of a file', () => {
    const filePath = path.join(process.cwd(), 'tests', 'tmp', 'test.txt');
    try {
      fs.rmSync(filePath, { force: true });
    } catch (e) {
      console.warn(e.message);
    }
    helper.writeFile('This is a test file', filePath);
    const res = helper.readFile(filePath);
    expect(res).toBeDefined();
    expect(typeof res).toBe('string');
    expect(res.toString()).toBe('This is a test file');
    fs.rmSync(filePath, { force: true });
  });
});

describe('deleteFile', () => {
  test('Delete a file', () => {
    const filePath = path.join(process.cwd(), 'tests', 'tmp', 'delete_this.txt');
    try {
      fs.rmSync(filePath, { force: true });
    } catch (e) {
      console.warn(e.message);
    }
    let res = helper.writeFile('Test should delete this file', filePath);
    expect(res).toBe(true);
    res = helper.deleteFile(filePath);
    expect(res).toBeDefined();
    expect(res).toBe(true);
  });
});
