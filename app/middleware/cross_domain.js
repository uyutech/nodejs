/**
 * Created by army8735 on 2017/11/28.
 */

'use strict';

module.exports = () => {
  return function* (next) {
    let origin = this.request.header.origin;
    let allowOrigin;
    if(origin.indexOf('circling.cc') > -1) {
      allowOrigin = origin;
    }
    if(allowOrigin) {
      this.set('Access-Control-Allow-Origin', allowOrigin);
      this.set('Access-Control-Allow-Credentials', 'true');
      this.set('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
    }
    yield next;
  }
};
