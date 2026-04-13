/* eslint-disable global-require */
const mailHelper = require('../../helpers/mail');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('sendPlainText', () => {
  test('Sends a simple text email', async () => {
    // MOCKs

    const data = {
      from: 'g.boscaro@im-tech.it',
      to: [
        'gimmy94.boscaro@gmail.com',
      ],
      subject: 'E-Mail Subject',
      body: 'This is an email message',
    };

    const plainTextEmailMock = jest
      .spyOn(mailHelper, 'plainTextEmail')
      .mockResolvedValue({});

    // TEST

    const { sendPlainText } = require('../MailService');
    const response = await sendPlainText({ plainTextEmailRequestBody: data });

    expect(response.code).toBe(200);
    expect(response.payload).toStrictEqual({ success: true });

    expect(plainTextEmailMock).toHaveBeenCalledWith(data);
  });

  test('Fails because error while inserting notification in the database', async () => {
    const plainTextEmailMock = jest
      .spyOn(mailHelper, 'plainTextEmail')
      .mockRejectedValue(new Error('Cannot send email'));

    try {
      const { sendPlainText } = require('../MailService');
      await sendPlainText({
        plainTextEmailRequestBody: {
          from: 'g.boscaro@im-tech.it',
          to: [
            'gimmy94.boscaro@gmail.com',
          ],
          subject: 'E-Mail Subject',
          body: 'This is an email message',
        },
      });
      throw new Error('Should have thrown an error');
    } catch (e) {
      expect(e.code).toBe(405);
      expect(plainTextEmailMock).toHaveBeenCalled();
    }
  });
});

describe('sendHtml', () => {
  test('Sends a simple text email', async () => {
    // MOCKs

    const data = {
      from: 'g.boscaro@im-tech.it',
      to: [
        'gimmy94.boscaro@gmail.com',
      ],
      subject: 'E-Mail Subject',
      body: 'This is an email message',
    };

    const htmlEmailMock = jest
      .spyOn(mailHelper, 'htmlEmail')
      .mockResolvedValue({});

    // TEST

    const { sendHtml } = require('../MailService');
    const response = await sendHtml({ htmlEmailRequestBody: data });

    expect(response.code).toBe(200);
    expect(response.payload).toStrictEqual({ success: true });

    expect(htmlEmailMock).toHaveBeenCalledWith({ ...data, replacements: {} });
  });

  test('Fails because error while inserting notification in the database', async () => {
    const htmlEmailMock = jest
      .spyOn(mailHelper, 'htmlEmail')
      .mockRejectedValue(new Error('Cannot send email'));

    try {
      const { sendHtml } = require('../MailService');
      await sendHtml({
        htmlEmailRequestBody: {
          from: 'g.boscaro@im-tech.it',
          to: [
            'gimmy94.boscaro@gmail.com',
          ],
          subject: 'E-Mail Subject',
          body: 'This is an email message',
          replacements: [],
        },
      });
      throw new Error('Should have thrown an error');
    } catch (e) {
      expect(e.code).toBe(405);
      expect(htmlEmailMock).toHaveBeenCalled();
    }
  });
});
