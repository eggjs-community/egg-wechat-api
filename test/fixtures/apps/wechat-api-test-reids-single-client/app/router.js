'use strict';

module.exports = app => {

  app.get('/', function* () {
    const { wechatApi } = app;

    try {
      const ticket = yield wechatApi.getTicket();
      this.status = 200;
      this.body = ticket;

    } catch (error) {
      this.status = 500;
      this.body = error;
    }
  });
};
