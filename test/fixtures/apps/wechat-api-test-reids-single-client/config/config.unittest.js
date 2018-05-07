'use strict';

exports.keys = '123456';

exports.redis = {
  client: {
    port: 6379,
    host: '127.0.0.1',
    password: null,
    family: 4,
    db: 0,
  },
};

exports.wechatApi = {
  default: {
  },
  app: true,
  agent: false,

  // wechat
  appId: process.env.WECHAT_API_APP_ID,
  appSecret: process.env.WECHAT_API_APP_SECRET,
};
