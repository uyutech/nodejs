/**
 * Created by army8735 on 2017/10/7.
 */

'use strict';

module.exports = () => {
  return function* (next) {
    let ctx = this;
    let helper = ctx.helper;
    if(ctx.session.uid) {
      helper.$CONFIG += `$CONFIG.isLogin = true;\n$CONFIG.uid = '${ctx.session.uid}';\n`;
      if(ctx.session.authorID) {
        helper.$CONFIG += `$CONFIG.isAuthor = true;\n$CONFIG.authorID = '${ctx.session.authorID}';\n`;
      }
    }
    yield next;
  };
};
