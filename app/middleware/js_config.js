/**
 * Created by army8735 on 2017/10/7.
 */

'use strict';

module.exports = () => {
  return async function(ctx, next) {
    let helper = ctx.helper;
    if(ctx.session.uid) {
      helper.$CONFIG += `
  $CONFIG.isLogin = true;
  $CONFIG.uid = '${ctx.session.uid}';
  $CONFIG.uname = '${ctx.session.uname}';
  $CONFIG.head = '${ctx.session.head}';
  // $CONFIG.messageNum = ${ctx.session.messageNum || 0}`;
      if(ctx.session.authorId) {
        helper.$CONFIG += `
  $CONFIG.isAuthor = true;
  $CONFIG.authorId = '${ctx.session.authorId}';
  $CONFIG.authorName = '${ctx.session.authorName}';
  $CONFIG.authorHead = '${ctx.session.authorHead}';
  $CONFIG.isPublic = ${!!ctx.session.isPublic};`;
      }
    }
    await next();
  };
};
