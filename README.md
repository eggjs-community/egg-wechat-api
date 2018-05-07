# egg-wechat-api

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-wechat-api.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-wechat-api
[travis-image]: https://img.shields.io/travis/eggjs-community/egg-wechat-api.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs-community/egg-wechat-api
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs-community/egg-wechat-api.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs-community/egg-wechat-api?branch=master
[david-image]: https://img.shields.io/david/eggjs-community/egg-wechat-api.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs-community/egg-wechat-api
[snyk-image]: https://snyk.io/test/npm/egg-wechat-api/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-wechat-api
[download-image]: https://img.shields.io/npm/dm/egg-wechat-api.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-wechat-api

<!--
Description here.
-->

egg plugin for [wechat-api](https://github.com/node-webot/co-wechat-api)

## Install

```bash
$ npm i egg-wechat-api --save
```

## Prerequisite

Node.js >= 7.x

## Usage

- [co-wechat-api](https://github.com/node-webot/co-wechat-api)

## Dependencies

- egg
	- [egg-redis](https://github.com/eggjs/egg-redis)
- other
	- [co-wechat-api](https://github.com/node-webot/co-wechat-api)

## Configuration

```js
// {app_root}/config/plugin.js
exports.wechatApi = {
  enable: true,
  package: 'egg-wechat-api',
};
```
> if redis is single client

```js
// {app_root}/config/config.default.js
exports.wechatApi = {  
  appId: '',
  appSecret: '',
};
```
> if redis is multi clients

```js
// {app_root}/config/config.default.js
exports.wechatApi = {
  appId: '',
  appSecret: '',
  redisInstance: '', // select instance of redis
};
```

> __Redis is required !__

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

```
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
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
