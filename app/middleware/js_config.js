/**
 * Created by army8735 on 2017/10/7.
 */

'use strict';

module.exports = () => {
  return function* (next) {
    let ctx = this;
    let helper = ctx.helper;
    if(ctx.session.uid) {
      helper.$CONFIG += `$CONFIG.isLogin = true; $CONFIG.uid = '${ctx.session.uid}';`;
    }
    yield next;
  };
};
