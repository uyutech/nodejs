/**
 * Created by army8735 on 2017/10/7.
 */

'use strict';

module.exports = () => {
  return function* (next) {
    let ctx = this;
    let helper = ctx.helper;
    if(ctx.session.uid) {
      helper.$CONFIG += `
  $CONFIG.isLogin = true;
  $CONFIG.uid = '${ctx.session.uid}';
  $CONFIG.uname = '${ctx.session.uname}';
  $CONFIG.head = '${ctx.session.head}';
  $CONFIG.messageNum = ${ctx.session.messageNum || 0}`;
      if(ctx.session.authorID) {
        helper.$CONFIG += `
  $CONFIG.isAuthor = true;
  $CONFIG.authorID = '${ctx.session.authorID}';
  $CONFIG.authorName = '${ctx.session.authorName}';
  $CONFIG.isPublic = ${!!ctx.session.isPublic};`;
      }
    }
    yield next;
  };
};
