const axios = require('axios');
const ZSchema = require('z-schema');

const validator = new ZSchema({});

describe('UtilsService', () => {
  // #### GET API VERSION TEST ####
  test('Gets the current API version', (done) => {
    // JSON Schema
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
    // Sends request
    axios.get('http://localhost:3000/api/utils/version')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(validator.validate(res.data, schema)).toBe(true);
        done();
      })
      .catch((e) => {
        expect(e).toBeDefined();
        done(e);
      });
  });
});
