/**
 * Created by army8735 on 2017/12/3.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let hotCircle = {};
      let follows = {};
      let userFollows = {};
      let postList = {};
      let res = yield {
        hotCircle: ctx.helper.postServiceJSON('api/users/User_Follow_Circling', {
          uid,
          Skip: 0,
          Take: 6,
        }),
        follows: ctx.helper.postServiceJSON('api/users/GetLikeAuthorList', {
          uid,
          Skip: 0,
          Take: 10,
        }),
        userFollows: ctx.helper.postServiceJSON('api/users/User_FollowList', {
          uid,
          Skip: 0,
          Take: 10,
        }),
        postList: ctx.helper.postServiceJSON('api/users/GetUserFollowUserCircling', {
          uid,
          Skip: 0,
          Take: 10,
        }),
      };
      if(res.hotCircle.data.success) {
        hotCircle = res.hotCircle.data.data;
      }
      if(res.follows.data.success) {
        follows = res.follows.data.data;
      }
      if(res.userFollows.data.success) {
        userFollows = res.userFollows.data.data;
      }
      if(res.postList.data.success) {
        postList = res.postList.data.data;
      }
      ctx.body = ctx.helper.okJSON({
        hotCircle,
        follows,
        userFollows,
        postList,
      });
    }
    * postList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/GetUserFollowUserCircling', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
