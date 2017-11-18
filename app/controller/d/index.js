/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      if(ctx.session.uid) {
        let uid = ctx.session.uid;
        let userInfo = {};
        let messages = {};
        let res = yield {
          userInfo: ctx.helper.postServiceJSON('api/users/GetUserInfo', {
            uid,
          }),
          messages: ctx.helper.postServiceJSON('api/users/GetUserNotify', {
            uid,
            Skip: 0,
            Take: 10,
          }),
        };
        if(res.userInfo.data.success) {
          userInfo = res.userInfo.data.data;
        }
        if(res.messages.data.success) {
          messages = res.messages.data.data;
        }
        ctx.session.uname = userInfo.NickName;
        ctx.session.head = userInfo.Head_Url;
        if(userInfo.ISAuthor) {
          ctx.session.authorID = userInfo.AuthorID;
          ctx.session.authorName = userInfo.AuthorName;
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
          messages,
        });
      }
      yield ctx.render('dindex', {
        userInfo: {},
        authorInfo: {},
        messages: {},
      });
    }
  }

  return Controller;
};
