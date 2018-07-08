'use strict';

const assert = require('assert');

module.exports = app => {
  const { appId, appSecret } = app.config.wechatApi || {};
  assert(appId && appSecret,
    '[egg-wechat-api] Must set `appId` and `appSecret` and in wechat-api\'s config');
};
