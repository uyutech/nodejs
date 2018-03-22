/**
 * Created by army8735 on 2017/10/5.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let versionCacheKey = 'h5_version';
      let urlCacheKey = 'h5_url';
      let [version, url] = yield [
        ctx.app.redis.get(versionCacheKey),
        ctx.app.redis.get(urlCacheKey)
      ];
      if(!version) {
        version = 87;
        yield ctx.app.redis.set(versionCacheKey, version);
      }
      if(!url) {
        url = 'https://circling.net.cn/h5/h5-0.6.10.zip';
        yield ctx.app.redis.set(urlCacheKey, url);
      }
      ctx.body = {
        success: true,
        version: version,
        url: url,
        minSdk: 12,
      };
    }
  }
  return Controller;
};
