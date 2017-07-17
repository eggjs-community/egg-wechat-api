'use strict';

const wechatApi = require('./lib/wechat-api');

module.exports = agent => {
  if (agent.config.wechatApi.agent) wechatApi(agent);
};
