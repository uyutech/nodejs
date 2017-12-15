/**
 * Created by army8735 on 2017/10/9.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let userInfo = {};
      let myPost = {};
      let bonusPoint = {};
      let lastUpdateNickNameTime;
      let lastUpdateHeadTime;
      let privateInfo = {};
      let res = yield {
        userInfo: ctx.helper.postServiceJSON2('api/users/GetUserInfo', {
          uid,
        }),
        myPost: ctx.helper.postServiceJSON2('api/users/User_Post_List', {
          uid,
          currentuid: uid,
          Skip: 0,
          Take: 10,
        }),
        bonusPoint: ctx.helper.postServiceJSON2('api/users/GetUserRank', {
          uid,
        }),
        lastUpdateNickNameTime: ctx.helper.postServiceJSON2('api/users/GetUpdateNickNameLastTime', {
          uid,
        }),
        lastUpdateHeadTime: ctx.helper.postServiceJSON2('api/users/GetUpdateHead_UrlLastTime', {
          uid,
        }),
        privateInfo: ctx.helper.postServiceJSON2('api/users/GetUserAddressInfo', {
          uid,
        }),
      };
      if(res.userInfo.data.success) {
        userInfo = res.userInfo.data.data;
      }
      if(res.myPost.data.success) {
        myPost = res.myPost.data.data;
      }
      if(res.bonusPoint.data.success) {
        bonusPoint = res.bonusPoint.data.data || {};
      }
      if(res.lastUpdateNickNameTime.data.success) {
        lastUpdateNickNameTime = res.lastUpdateNickNameTime.data.data;
      }
      if(res.lastUpdateHeadTime.data.success) {
        lastUpdateHeadTime = res.lastUpdateHeadTime.data.data;
      }
      if(res.privateInfo.data.success) {
        privateInfo = res.privateInfo.data.data;
      }
      ctx.session.uname = userInfo.NickName;
      ctx.session.head = userInfo.Head_Url;
      if(userInfo.ISAuthor) {
        ctx.session.authorID = userInfo.AuthorID;
        ctx.session.authorName = userInfo.AuthorName;
        ctx.session.authorHead = userInfo.AuthorHead_Url;
      }
      yield ctx.render('dmy', {
        userInfo,
        myPost,
        bonusPoint,
        lastUpdateNickNameTime,
        lastUpdateHeadTime,
        privateInfo,
      });
    }
    * message(ctx) {
      let uid = ctx.session.uid;
      let messages = yield ctx.helper.postServiceJSON2('api/users/GetUserNotify', {
        uid,
        Skip: 0,
        Take: 10,
      });
      messages = messages.data.data;
      yield ctx.render('dmy_message', {
        messages,
      });
    }
  }
  return Controller;
};
