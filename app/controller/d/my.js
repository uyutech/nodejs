/**
 * Created by army8735 on 2017/10/9.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let userInfo = {};
      let follows = [];
      let favors = [];
      let lastUpdateNickNameTime;
      let lastUpdateHeadTime;
      let res = yield {
        userInfo: ctx.helper.postServiceJSON('api/users/GetUserInfo', {
          uid,
        }),
        follows: ctx.helper.postServiceJSON('api/users/GetLikeAuthorList', {
          uid,
        }),
        favors: ctx.helper.postServiceJSON('api/users/GetLikeWorksList', {
          uid,
        }),
        lastUpdateNickNameTime: ctx.helper.postServiceJSON('api/users/GetUpdateNickNameLastTime', {
          uid,
        }),
        lastUpdateHeadTime: ctx.helper.postServiceJSON('api/users/GetUpdateHead_UrlLastTime', {
          uid,
        }),
      };
      if(res.userInfo.data.success) {
        userInfo = res.userInfo.data.data;
      }
      if(res.follows.data.success) {
        follows = res.follows.data.data;
      }
      if(res.favors.data.success) {
        favors = res.favors.data.data;
      }
      if(res.lastUpdateNickNameTime.data.success) {
        lastUpdateNickNameTime = res.lastUpdateNickNameTime.data.data;
      }
      if(res.lastUpdateHeadTime.data.success) {
        lastUpdateHeadTime = res.lastUpdateHeadTime.data.data;
      }
      yield ctx.render('dmy', {
        userInfo,
        follows,
        favors,
        lastUpdateNickNameTime,
        lastUpdateHeadTime,
      });
    }
  }
  return Controller;
};
