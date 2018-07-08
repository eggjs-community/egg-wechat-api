'use strict';

module.exports = app => {

  app.get('/', async function() {
    const { wechatApi } = app;

    try {
      const ticket = await wechatApi.getTicket();
      this.status = 200;
      this.body = ticket;

    } catch (error) {
      this.status = 500;
      this.body = error;
    }
  });
};
