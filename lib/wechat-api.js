'use strict';

const assert = require('assert');
const WechatApi = require('co-wechat-api');

module.exports = app => {

  let redis = app.redis;
  const { appId, appSecret, redisInstance } = app.config.wechatApi || {};

  // select redis instance
  if (redisInstance) {
    redis = app.redis.get(redisInstance);
  }

  // check key & secret
  assert(appId && appSecret,
    '[egg-wechat-api] Must set `appId` and `appSecret` in wechat-api\'s config');

  // persistence methods
  async function getTicketToken(type) {
    try {
      const raw = await redis.get(`wechat_${type}`);
      return JSON.parse(raw);
    } catch (error) {
      throw (error);
    }
  }

  async function saveTicketToken(type, _ticketToken) {
    try {
      await redis.set(`wechat_${type}`, JSON.stringify(_ticketToken));
    } catch (error) {
      throw (error);
    }
  }

  async function getAccessToken() {
    try {
      const raw = await redis.get('wechat_access_token');
      return JSON.parse(raw);
    } catch (error) {
      throw (error);
    }
  }

  async function saveAccessToken(token) {
    try {
      await redis.set('wechat_access_token', JSON.stringify(token));
    } catch (error) {
      throw (error);
    }
  }

  app.coreLogger.info('[egg-wechat-api] setup');

  const api = new WechatApi(appId, appSecret, getAccessToken, saveAccessToken);
  api.registerTicketHandle(getTicketToken, saveTicketToken);
  app.wechatApi = api;

};
