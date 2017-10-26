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
