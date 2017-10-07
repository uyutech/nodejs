/**
 * Created by army8735 on 2017/10/7.
 */

'use strict';

module.exports = () => {
  return function* (next) {
    let ua = this.get('user-agent');
    if(!/(iPhone|iPod|Android|ios|iPad)/i.test(ua)) {
      this.body = `<!DOCTYPE html><html>
        <head>
        ${this.helper.getDTopNav()}
        <script>
          var pathname = location.pathname;
          location.replace('//' + location.host.replace('m.', '') + '/#' + pathname);
        </script>
        </head>
        <body></body></html>`;
      return;
    }
    yield next;
  };
};
