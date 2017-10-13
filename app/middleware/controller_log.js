/**
 * Created by army8735 on 2017/10/13.
 */

'use strict';

module.exports = () => {
  return function* (next) {
    let start = Date.now();
    yield next;
    let end = Date.now();
    let ip = this.request.ip;
    let uid = this.session ? this.session.uid || '-' : '-';
    let method = this.request.method;
    let url = this.request.url;
    this.app.logger.info('[%s/%s/-/%sms %s %s]', uid, ip, end - start, method, url);
  };
};
