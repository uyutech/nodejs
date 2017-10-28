/**
 * Created by army8735 on 2017/10/7.
 */

'use strict';

module.exports = () => {
  return function* (next) {
    let ua = this.get('user-agent');
    if(/(iPhone|iPod|Android|ios|iPad)/i.test(ua)) {
      this.body = `<!DOCTYPE html><html>
        <head>
        ${this.helper.getMHead()}
        <script>
          var pathname = location.pathname;
          if(pathname && pathname !== '/') {
            location.replace('//m.' + location.host + pathname);
          }
          else {
            var hash = location.hash;
            hash = hash || '#/find';
            hash = hash.replace(/^#/, '').replace(/^\\//, '');
            location.replace('//m.' + location.host + '/' + hash);
          }
        </script>
        </head>
        <body></body></html>`;
      return;
    }
    yield next;
  };
};
