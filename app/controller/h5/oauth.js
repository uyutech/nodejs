/**
 * Created by army8735 on 2017/12/2.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * weibo(ctx) {
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/WeibouidToUid', {
        openid: body.openID,
        Token: body.token,
      });
      let data = res.data;
      if(data && data.success) {
        let uid = data.data;
        ctx.session.uid = uid;
        let userInfo = {};
        let bonusPoint = {};
        let lastUpdateNickNameTime;
        let lastUpdateHeadTime;
        let res = yield {
          userInfo: ctx.helper.postServiceJSON('api/users/GetUserInfo', {
            uid,
          }),
          bonusPoint: ctx.helper.postServiceJSON('api/users/getuserrank', {
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
        if(res.bonusPoint.data.success) {
          bonusPoint = res.bonusPoint.data.data || {};
        }
        if(res.lastUpdateNickNameTime.data.success) {
          lastUpdateNickNameTime = res.lastUpdateNickNameTime.data.data;
        }
        if(res.lastUpdateHeadTime.data.success) {
          lastUpdateHeadTime = res.lastUpdateHeadTime.data.data;
        }
        ctx.session.uname = userInfo.NickName;
        ctx.session.head = userInfo.Head_Url;
        if(userInfo.ISAuthor) {
          ctx.session.authorID = userInfo.AuthorID;
          ctx.session.authorName = userInfo.AuthorName;
          ctx.session.isPublic = userInfo.ISOpen;
          ctx.session.authorHead = userInfo.AuthorHead_Url;
        }
        return ctx.body = ctx.helper.okJSON({
          userInfo,
          bonusPoint,
          lastUpdateNickNameTime,
          lastUpdateHeadTime,
        });
      }
    }
  }
  return Controller;
};
