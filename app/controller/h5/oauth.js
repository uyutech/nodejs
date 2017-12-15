/**
 * Created by army8735 on 2017/12/2.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * weibo(ctx) {
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/WeibouidToUid', {
        openid: body.openID,
        Token: body.token,
      });
      let data = res.data;
      ctx.logger.info('openid %s, token %s, res', body.openID, body.token, data.success);
      if(data && !data.success && data.code === 1002) {
        let userInfo = yield ctx.curl('https://api.weibo.com/2/users/show.json', {
          data: {
            uid: body.openID,
            access_token: body.token,
          },
          dataType: 'json',
          gzip: true,
        });
        userInfo = userInfo.data;
        let name = userInfo.screen_name || userInfo.name;
        let head = userInfo.avatar_hd || userInfo.avatar_large || userInfo.profile_image_url;
        let create = yield ctx.helper.postServiceJSON2('api/users/CreateWeiboUser', {
          openid: body.openID,
          Token: body.token,
          Head_Url: head,
          NickName: name,
        });
        create = create.data;
        if(create && create.success) {
          let uid = create.data;
          data.success = true;
          data.data = uid;
        }
      }
      ctx.logger.info('openid %s, token %s, res', body.openID, body.token, data.success);
      if(data && data.success) {
        let uid = data.data;
        ctx.session.uid = uid;
        let userInfo = {};
        let bonusPoint = {};
        let lastUpdateNickNameTime;
        let lastUpdateHeadTime;
        let prize = [];
        let res = yield {
          userInfo: ctx.helper.postServiceJSON2('api/users/GetUserInfo', {
            uid,
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
          prize: ctx.helper.postServiceJSON('api/users/GetMallCartList', {
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
        if(res.prize.data.success) {
          prize = res.prize.data.data;
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
          prize,
        });
      }
      ctx.body = ctx.helper.errorJSON(data || {});
    }
  }
  return Controller;
};
