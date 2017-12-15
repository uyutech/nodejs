/**
 * Created by army8735 on 2017/11/17.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let userID = ctx.params.userID;
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
          currentuid: uid,
          Skip: 0,
          Take: 10,
        }),
        followState: ctx.helper.postServiceJSON2('api/users/User_FollowState', {
          uid,
          touid: userID,
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
      yield ctx.render('muser', {
        userInfo,
        userPost,
        followState,
      });
    }
  }
  return Controller;
};
