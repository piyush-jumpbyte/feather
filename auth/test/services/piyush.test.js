const assert = require('assert');
const app = require('../../feather/app');

describe('\'piyush\' service', () => {
  it('registered the service', () => {
    const service = app.service('piyush');

    assert.ok(service, 'Registered the service');
  });
});
