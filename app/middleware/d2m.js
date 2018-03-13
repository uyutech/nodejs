/**
 * Created by army8735 on 2017/10/7.
 */

'use strict';

module.exports = () => {
  return async function(ctx, next) {
    let ua = ctx.get('user-agent');
    if(/(iPhone|iPod|Android|ios)/i.test(ua)) {
      ctx.body = `<!DOCTYPE html><html>
        <head>
        ${ctx.helper.getMHead()}
        <script>
          var pathname = location.pathname;
          if(pathname && pathname !== '/') {
            location.replace('//m.' + location.host + pathname);
          }
          else {
            var hash = location.hash;
            hash = hash || '#/';
            hash = hash.replace(/^#/, '').replace(/^\\//, '');
            location.replace('//m.' + location.host + '/' + hash);
          }
        </script>
        </head>
        <body></body></html>`;
      return;
    }
    await next();
  };
};
