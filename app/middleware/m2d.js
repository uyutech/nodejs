/**
 * Created by army8735 on 2017/10/7.
 */

'use strict';

module.exports = () => {
  return async function(ctx, next) {
    let ua = ctx.get('user-agent');
    if(!/(iPhone|iPod|Android|ios)/i.test(ua)) {
      ctx.body = `<!DOCTYPE html><html>
        <head>
        ${ctx.helper.getDHead()}
        <script>
          var pathname = location.pathname;
          location.replace('//' + location.host.replace('m.', '') + '/#' + pathname);
        </script>
        </head>
        <body></body></html>`;
      return;
    }
    await next();
  };
};
