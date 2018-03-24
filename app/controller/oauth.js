/**
 * Created by army8735 on 2017/10/7.
 */

'use strict';

const utility = require('utility');

module.exports = app => {
  class Controller extends app.Controller {
    * weibo(ctx) {
      const query = ctx.query;
      let goto = query.goto;
      ctx.session.goto = goto;
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
        let res = yield ctx.helper.postServiceJSON2('api/users/WeibouidToUid', {
          openid: weiboUid,
          Token: access_token,
        });
        let data = res.data;
        if(data && data.success) {
          ctx.rotateCsrfSecret();
          let uid = data.data;
          ctx.session.uid = uid;
          let res = yield ctx.helper.postServiceJSON2('api/users/GetUserInfo', {
            uid,
          });
          let data2 = res.data;
          if(data2 && data2.success) {
            let userInfo = data2.data;
            ctx.session.uname = userInfo.NickName;
            ctx.session.head = userInfo.Head_Url;
            if(userInfo.ISAuthor) {
              ctx.session.authorId = ctx.session.authorID = userInfo.AuthorID;
              ctx.session.authorName = userInfo.AuthorName;
              ctx.session.isPublic = userInfo.ISOpen;
              ctx.session.authorHead = userInfo.AuthorHead_Url;
            }
          }
        }
        // uid不存在需要创建新用户
        else if(data.code === 1002) {
          let userInfo = yield ctx.curl('https://api.weibo.com/2/users/show.json', {
            data: {
              uid: weiboUid,
              access_token,
            },
            dataType: 'json',
            gzip: true,
          });
          userInfo = userInfo.data;
          let name = userInfo.screen_name || userInfo.name;
          let head = userInfo.avatar_hd || userInfo.avatar_large || userInfo.profile_image_url;
          let create = yield ctx.helper.postServiceJSON2('api/users/CreateWeiboUser', {
            openid: weiboUid,
            Token: access_token,
            Head_Url: head,
            NickName: name,
          });
          create = create.data;
          if(create && create.success) {
            ctx.rotateCsrfSecret();
            let uid = create.data;
            ctx.session.uid = uid;
            let res = yield ctx.helper.postServiceJSON2('api/users/GetUserInfo', {
              uid,
            });
            let data2 = res.data;
            if(data2 && data2.success) {
              let userInfo = data2.data;
              ctx.session.uname = userInfo.NickName;
              ctx.session.head = userInfo.Head_Url;
              if(userInfo.ISAuthor) {
                ctx.session.authorId = ctx.session.authorID = userInfo.AuthorID;
                ctx.session.authorName = userInfo.AuthorName;
                ctx.session.isPublic = userInfo.ISOpen;
                ctx.session.authorHead = userInfo.AuthorHead_Url;
              }
            }
          }
        }
      }
      let goto = ctx.session.goto || '/my';
      delete ctx.session.goto;
      ctx.redirect(goto);
    }
    * session(ctx) {
      let sessionid = ctx.request.body.sessionid;
      if(!sessionid) {
        return ctx.body = ctx.helper.errorJSON();
      }
      sessionid = utility.base64decode(sessionid, true, 'buffer');
      if(!sessionid) {
        return ctx.body = ctx.helper.errorJSON();
      }
      sessionid = ctx.cookies.keys.decrypt(sessionid).value.toString();
      if(!sessionid) {
        return ctx.body = ctx.helper.errorJSON();
      }
      sessionid = new Buffer(sessionid, 'base64').toString();
      if(!sessionid) {
        return ctx.body = ctx.helper.errorJSON();
      }
      ctx.body = ctx.helper.okJSON({
        sessionid,
      });
    }
  }
  return Controller;
};
