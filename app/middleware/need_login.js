/**
 * Created by army8735 on 2017/10/9.
 */

'use strict';

module.exports = () => {
  return async function(ctx, next) {
    if(!ctx.session.uid) {
      let url = ctx.request.url;
      if(url) {
        url = url.replace(/^\/[dm]/, '');
        url = encodeURIComponent(ctx.app.config.host + url);
      }
      return ctx.redirect('/oauth/weibo' + (url ? ('?goto=' + url) : ''));
    }
    await next();
  };
};
