'use strict';

const request = require('supertest');
const mm = require('egg-mock');

describe('test/wechat-api-redis-multi-clients.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/wechat-api-test-redis-multi-clients',
    });

    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should return { ticket, expireTime } with code 200 GET /', () => {
    return request(app.callback())
      .get('/')
      .expect(200)
      .expect(({ body }) => {
        if (!body.ticket) throw new Error('no ticket');
        if (!body.expireTime) throw new Error('no expireTime');
      });
  });
});
