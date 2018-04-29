/**
 * Created by army8735 on 2017/10/5.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { app, ctx } = this;
    let versionCacheKey = 'h5_version';
    let urlCacheKey = 'h5_url';
    let [version, url] = await Promise.all([
      app.redis.get(versionCacheKey),
      app.redis.get(urlCacheKey)
    ]);
    if(!version) {
      version = 118;
      await app.redis.set(versionCacheKey, version);
    }
    if(!url) {
      url = 'https://circling.net.cn/h5/h5-0.6.44.zip';
      await app.redis.set(urlCacheKey, url);
    }
    ctx.body = {
      success: true,
      version: version,
      url: url,
      minSdk: 12,
    };
  }
}

module.exports = Controller;
