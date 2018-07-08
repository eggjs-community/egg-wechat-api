'use strict';

const WechatApi = require('co-wechat-api');
const WECHAT = Symbol('Application#wechat');

module.exports = {
  get wechatApi() {
    if (!this[WECHAT]) {
      this[WECHAT] = createClient(this);
      return this[WECHAT];
    }
    return this[WECHAT];
  },
};

function createClient(app) {
  const config = app.config.wechatApi;
  const { appId, appSecret } = config;

  if (!appId || !appSecret) {
    app.logger.error('[egg-wechat-api] must set `appId` and `appSecret` in plugin\'s config.');
    return null;
  }

  let adapter;
  if (config.adapter === 'redis') {
    adapter = config.redisInstance ? app.redis && app.redis.get(config.redisInstance) : app.redis;
  }

  if (config.adapter === 'tair') {
    adapter = app.tair;
  }

  if (!adapter) {
    app.logger.error('[egg-wechat-api] adapter is ready ?');
    return null;
  }

  async function getTicketToken(type) {
    const raw = await adapter.get(`wechat_${type}`);
    return JSON.parse(raw);
  }

  async function saveTicketToken(type, _ticketToken) {
    await adapter.set(`wechat_${type}`, JSON.stringify(_ticketToken));
  }

  async function getAccessToken() {
    const token = await adapter.get('wechat_access_token');
    return JSON.parse(token);
  }

  async function saveAccessToken(token) {
    await adapter.set('wechat_access_token', JSON.stringify(token));
  }

  const api = new WechatApi(appId, appSecret, getAccessToken, saveAccessToken);
  api.registerTicketHandle(getTicketToken, saveTicketToken);
  return api;
}
