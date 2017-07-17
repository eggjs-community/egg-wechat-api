'use strict';

const wechatApi = require('./lib/wechat-api');

module.exports = app => {
  wechatApi(app);
};
