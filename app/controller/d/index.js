/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      if(ctx.session.uid) {
        let uid = ctx.session.uid;
        let res = yield ctx.helper.postServiceJSON('api/users/GetUserInfo', {
          uid,
        });
        if(res.data.success) {
          let userInfo = res.data.data || {};
          ctx.session.uname = userInfo.NickName;
          ctx.session.head = userInfo.Head_Url;
          if(userInfo.ISAuthor) {
            ctx.session.authorID = userInfo.AuthorID;
            ctx.session.authorName = userInfo.AuthorName;
            // 没有经过主动登录，session未过期时，js_config中间件没有添加信息，需要补上
            if(ctx.helper.$CONFIG.indexOf('$CONFIG.isAuthor') === -1) {
              ctx.helper.$CONFIG += `$CONFIG.isAuthor = true;\n$CONFIG.authorID = '${ctx.session.authorID}';\n`;
            }
          }
          let authorInfo = {};
          if(ctx.session.authorID) {
            let res2 = yield ctx.helper.postServiceJSON('api/users/GetAuthorRelevant', {
              uid,
              AuthorID: ctx.session.authorID,
              HotWork_Skip: 0,
              HotWork_Take: 2,
              ToAuthorSkip: 0,
              ToAuthorTake: 2,
            });
            if(res2.data.success) {
              authorInfo = res2.data.data;
            }
          }
          return yield ctx.render('dindex', {
            userInfo,
            authorInfo,
          });
        }
      }
      yield ctx.render('dindex', {
        userInfo: {},
        authorInfo: {},
      });
    }
  }
  return Controller;
};
