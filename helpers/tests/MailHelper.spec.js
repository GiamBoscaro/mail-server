/* eslint-disable no-undef */
const isHtml = require('is-html');
const helper = require('../mail');

describe('preProcessReplacements', () => {
  test('Processes the list of replacements', (done) => {
    const res = helper.preProcessReplacements([{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }]);
    expect(res).toBeDefined();
    expect(res.key).toBe('value');
    expect(res.key2).toBe('value2');
    done();
  });
});

describe('loadTemplate', () => {
  test('Load a template from a file', (done) => {
    const res = helper.loadTemplate({
      type: 'path',
      encoding: 'utf-8',
      content: 'example.html',
    });
    expect(res).toBeDefined();
    expect(isHtml(res)).toBe(true);
    done();
  });
});

describe('buildHeader', () => {
  test('Builds the header of a email', (done) => {
    const res = helper.buildHeader({
      from: 'test@mail.com',
      to: ['target@mail.com'],
      cc: ['cc1@mail.com', 'cc2@mail.com'],
      bcc: ['bcc1@mail.com', 'bcc2@mail.com'],
      subject: 'Subject',
    });
    expect(res).toBeDefined();
    expect(res.from).toBe('test@mail.com');
    expect(res.to).toBe('target@mail.com');
    expect(res.cc).toBe('cc1@mail.com,cc2@mail.com');
    expect(res.bcc).toBe('bcc1@mail.com,bcc2@mail.com');
    expect(res.subject).toBe('Subject');
    done();
  });
  test('Builds the header of a email with default values', (done) => {
    const res = helper.buildHeader({
      from: 'test@mail.com',
      to: ['target@mail.com'],
      subject: 'Subject',
    });
    expect(res).toBeDefined();
    expect(res.from).toBe('test@mail.com');
    expect(res.to).toBe('target@mail.com');
    expect(res.cc).toStrictEqual([]);
    expect(res.bcc).toStrictEqual([]);
    expect(res.subject).toBe('Subject');
    done();
  });
});
