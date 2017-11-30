/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let hotCircle = {};
      let follows = [];
      let userFollows = [];
      let userFans = [];
      let res = yield {
        // hotCircle: ctx.helper.postServiceJSON('api/users/User_Follow_Circling', {
        //   uid,
        //   Skip: 0,
        //   Take: 6,
        // }),
        follows: ctx.helper.postServiceJSON('api/users/GetLikeAuthorList', {
          uid,
        }),
        userFollows: ctx.helper.postServiceJSON('api/users/User_FollowList', {
          uid,
          Skip: 0,
          Take: 10,
        }),
        userFans: ctx.helper.postServiceJSON('api/users/User_FansList', {
          uid,
          Skip: 0,
          Take: 10,
        }),
      };
      // if(res.hotCircle.data.success) {
      //   hotCircle = res.hotCircle.data.data;
      // }
      if(res.follows.data.success) {
        follows = res.follows.data.data;
      }
      if(res.userFollows.data.success) {
        userFollows = res.userFollows.data.data;
      }
      if(res.userFans.data.success) {
        userFans = res.userFans.data.data;
      }
      yield ctx.render('mfollow', {
        hotCircle,
        follows,
        userFollows,
        userFans,
      });
    }
  }
  return Controller;
};
