const axios = require('axios');
const fs = require('fs');
const path = require('path');

const testTos = ['gimmy94.boscaro@gmail.com'];
const testCcs = [];

describe('MailService', () => {
  // #### PLAIN TEXT EMAIL TEST ####
  test('Sends a plain text E-Mail', (done) => {
    // Request Body
    const body = {
      to: testTos,
      cc: testCcs,
      subject: 'Mailer Service - Automated Test E-Mail (Plain Text)',
      body: 'This is a plain text test E-Mail sent by Node Mailer Microservice by I.M. Technologies S.r.l.',
    };
    // Sends request
    axios.post('http://localhost:3000/api/mail/plain', body)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.data.success).toBe(true);
        done();
      })
      .catch((e) => {
        expect(e).toBeDefined();
        done(e);
      });
  });
  // #### ATTACHMENTS EMAIL TEST ####
  test('Sends an E-Mail with Attachments', (done) => {
    const fileContent = fs.readFileSync(path.join('tests', 'assets', 'sample.pdf'), 'utf8');
    // Request Body
    const body = {
      to: testTos,
      cc: testCcs,
      subject: 'Mailer Service - Automated Test E-Mail (HTML)',
      template: {
        type: 'path',
        content: 'example.html',
      },
      replacements: [
        { key: 'name', value: 'Mario Rossi' },
        { key: 'link', value: 'https://im-tech.it' },
        { key: 'link_text', value: 'Go To IM-Tech' },
      ],
      attachments: [
        {
          filename: 'sample.pdf',
          content: fileContent,
        },
      ],
    };
    // Sends request
    axios.post('http://localhost:3000/api/mail/html', body)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.data.success).toBe(true);
        done();
      })
      .catch((e) => {
        expect(e).toBeDefined();
        done(e);
      });
  });
  // #### BASE64 ATTACHMENTS EMAIL TEST ####
  test('Sends an E-Mail with Base 64 Attachments', (done) => {
    const fileContent = fs.readFileSync(path.join('tests', 'assets', 'sample.pdf'), 'base64');
    // Request Body
    const body = {
      to: testTos,
      cc: testCcs,
      subject: 'Mailer Service - Automated Test E-Mail (Byte64 Attachments)',
      template: {
        type: 'path',
        content: 'example.html',
      },
      replacements: [
        { key: 'name', value: 'Mario Rossi' },
        { key: 'link', value: 'https://im-tech.it' },
        { key: 'link_text', value: 'Go To IM-Tech' },
      ],
      attachments: [
        {
          filename: 'sample.pdf',
          content: fileContent,
          encoding: 'base64',
        },
      ],
    };
    // Sends request
    axios.post('http://localhost:3000/api/mail/html', body)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.data.success).toBe(true);
        done();
      })
      .catch((e) => {
        expect(e).toBeDefined();
        done(e);
      });
  });
  // #### RAW HTML EMAIL TEST ####
  test('Sends an E-Mail with Raw Template', (done) => {
    const fileContent = fs.readFileSync(path.join('tests', 'assets', 'template.html'), 'base64');
    // Request Body
    const body = {
      to: testTos,
      cc: testCcs,
      subject: 'Mailer Service - Automated Test E-Mail (Raw HTML)',
      template: {
        type: 'raw',
        content: fileContent,
        encoding: 'base64',
      },
      replacements: [
        { key: 'name', value: 'Mario Rossi' },
        { key: 'link', value: 'https://im-tech.it' },
        { key: 'link_text', value: 'Go To IM-Tech' },
      ],
    };
    // Sends request
    axios.post('http://localhost:3000/api/mail/html', body)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.data.success).toBe(true);
        done();
      })
      .catch((e) => {
        expect(e).toBeDefined();
        done(e);
      });
  });
});
