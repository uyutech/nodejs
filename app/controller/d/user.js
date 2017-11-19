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
      let res = yield {
        userInfo: ctx.helper.postServiceJSON('api/users/GetUserInfo', {
          uid: userID,
        }),
        userPost: ctx.helper.postServiceJSON('api/users/User_Post_List', {
          uid: userID,
          Skip: 0,
          Take: 10,
          MyPost: 1,
        }),
      };
      if(res.userInfo.data.success) {
        userInfo = res.userInfo.data.data;
      }
      if(res.userPost.data.success) {
        userPost = res.userPost.data.data;
      }
      yield ctx.render('duser', {
        userInfo,
        userPost,
      });
    }
  }

  return Controller;
};
