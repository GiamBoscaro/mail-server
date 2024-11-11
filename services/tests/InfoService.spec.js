/* eslint-disable global-require */
const ZSchema = require('z-schema');

const validator = new ZSchema({});

describe('version', () => {
  const schema = {
    type: 'object',
    properties: {
      patch: { type: 'number' },
      minor: { type: 'number' },
      major: { type: 'number' },
      version: { type: 'string' },
    },
    required: ['patch', 'minor', 'major', 'version'],
  };

  test('Gets the current server version', async (done) => {
    const { version } = require('../InfoService');
    const response = await version();

    expect(validator.validate(response.payload, schema)).toBe(true);

    done();
  });
});
