/**
 * Created by army8735 on 2017/10/7.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * weibo(ctx) {
      const query = ctx.query;
      let goto = query.goto;
      ctx.session.goto = goto || '/';
      let appKey = ctx.helper.weiboAppKey;
      let redirect = ctx.helper.weiboRedirect;
      ctx.redirect(`https://api.weibo.com/oauth2/authorize?client_id=${appKey}&response_type=code&redirect_uri=${redirect}`);
    }
    * login(ctx) {
      const query = ctx.query;
      let code = query.code;
      let appKey = ctx.helper.weiboAppKey;
      let appSecret = ctx.helper.weiboAppSecret;
      let redirect = ctx.helper.weiboRedirect;
      let res = yield ctx.curl('https://api.weibo.com/oauth2/access_token', {
        method: 'POST',
        data: {
          client_id: appKey,
          client_secret: appSecret,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: redirect,
        },
        dataType: 'json',
        gzip: true,
      });
      let data = res.data;
      let access_token = data.access_token;
      let weiboUid = data.uid;
      if(access_token && weiboUid) {
        let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/users/WeibouidToUid'), {
          method: 'POST',
          data: {
            openid: weiboUid,
            Token: access_token,
          },
          dataType: 'json',
          gzip: true,
        });
        let data = res.data;
        if(data && data.success) {
          let uid = data.data;
          ctx.session.uid = uid;
        }
        else {
          let userInfo = yield ctx.curl('https://api.weibo.com/2/users/show.json', {
            data: {
              uid: weiboUid,
              access_token,
            },
            dataType: 'json',
            gzip: true,
          });
          let info = userInfo.data;
          ctx.body = info;
        }
      }
      ctx.redirect(ctx.session.goto || '/');
    }
  }
  return Controller;
};
