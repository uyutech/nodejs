/**
 * Created by army8735 on 2017/12/4.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let userID = body.userID;
      if(!userID) {
        return;
      }
      let userInfo = {};
      let userPost = {};
      let followState = uid ? 0 : 2;
      let res = yield {
        userInfo: ctx.helper.postServiceJSON2('api/users/GetUserInfo', {
          uid: userID,
        }),
        userPost: ctx.helper.postServiceJSON2('api/users/User_Post_List', {
          uid: userID,
          currentUid: uid,
          Skip: 0,
          Take: 10,
        }),
        followState: ctx.helper.postServiceJSON2('api/users/User_FollowState', {
          uid,
          toUid: userID,
        }),
      };
      if(res.userInfo.data.success) {
        userInfo = res.userInfo.data.data;
      }
      if(res.userPost.data.success) {
        userPost = res.userPost.data.data;
      }
      if(uid && uid.toString() !== userID && res.followState.data.success) {
        followState = res.followState.data.data;
      }
      ctx.body = ctx.helper.okJSON({
        userInfo,
        userPost,
        followState,
      });
    }
    * postList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      if(!body.userID) {
        return;
      }
      let res = yield ctx.helper.postServiceJSON2('api/users/User_Post_List', {
        uid: body.userID,
        Skip: body.skip,
        Take: body.take,
        currentuid: uid,
      });
      ctx.body = res.data;
    }
    * follow(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      if(!body.userID) {
        return;
      }
      let res = yield ctx.helper.postServiceJSON2('api/users/AddFollowUser', {
        uid,
        toUid: body.userID,
      });
      ctx.body = res.data;
    }
    * unFollow(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      if(!body.userID) {
        return;
      }
      let res = yield ctx.helper.postServiceJSON2('api/users/RemoveFollowUser', {
        uid,
        toUid: body.userID,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
