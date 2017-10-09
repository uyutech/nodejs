/**
 * Created by army8735 on 2017/10/8.
 */

'use strict';

module.exports = () => {
  return function* (next) {
    let ctx = this;console.log(ctx);
    if(!ctx.session.uid) {
      return ctx.body = {
        success: false,
        code: 1000,
        message: '请先登录',
      };
    }
    yield next;
  };
};
