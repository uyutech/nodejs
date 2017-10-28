/**
 * Created by army8735 on 2017/10/7.
 */

'use strict';

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
        let res = yield ctx.helper.postServiceJSON('api/users/WeibouidToUid', {
          openid: weiboUid,
          Token: access_token,
        });
        let data = res.data;
        if(data && data.success) {
          let uid = data.data;
          ctx.session.uid = uid;
          let res = yield ctx.helper.postServiceJSON('api/users/GetUserInfo', {
            uid,
          });
          let data2 = res.data;
          if(data2 && data2.success) {
            let userInfo = data2.data;
            ctx.session.uname = userInfo.NickName;
            ctx.session.head = userInfo.Head_Url;
            if(userInfo.ISAuthor) {
              ctx.session.authorID = userInfo.AuthorID;
              ctx.session.authorName = userInfo.AuthorName;
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
          let create = yield ctx.helper.postServiceJSON('api/users/CreateWeiboUser', {
            openid: weiboUid,
            Token: access_token,
            Head_Url: head,
            NickName: name,
          });
          create = create.data;
          if(create && create.success) {
            let uid = create.data;
            ctx.session.uid = uid;
            let res = yield ctx.helper.postServiceJSON('api/users/GetUserInfo', {
              uid,
            });
            let data2 = res.data;
            if(data2 && data2.success) {
              let userInfo = data2.data;
              ctx.session.uname = userInfo.NickName;
              ctx.session.head = userInfo.Head_Url;
              if(userInfo.ISAuthor) {
                ctx.session.authorID = userInfo.AuthorID;
                ctx.session.authorName = userInfo.AuthorName;
              }
            }
          }
        }
      }
      let goto = ctx.session.goto || '/my';
      delete ctx.session.goto;
      ctx.redirect(goto);
    }
    * rhymeWeibo(ctx) {
      const query = ctx.query;
      let goto = query.goto;
      ctx.session.goto = goto || '/';
      let appKey = ctx.helper.rhymeAppKey;
      let redirect = ctx.helper.rhymeRedirect;
      ctx.redirect(`https://api.weibo.com/oauth2/authorize?client_id=${appKey}&response_type=code&redirect_uri=${redirect}`);
    }
    * rhymeLogin(ctx) {
      const query = ctx.query;
      let code = query.code;
      let appKey = ctx.helper.rhymeAppKey;
      let appSecret = ctx.helper.rhymeAppSecret;
      let redirect = ctx.helper.rhymeRedirect;
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
        let res = yield ctx.helper.postServiceJSON('api/users/WeibouidToUid', {
          openid: weiboUid,
          Token: access_token,
        });
        let data = res.data;
        if(data && data.success) {
          let uid = data.data;
          ctx.session.uid = uid;
        }
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
          let create = yield ctx.helper.postServiceJSON('api/users/CreateWeiboUser', {
            openid: weiboUid,
            Token: access_token,
            Head_Url: head,
            NickName: name,
          });
          create = create.data;
          if(create && create.success) {
            let uid = create.data;
            ctx.session.uid = uid;
          }
        }
      }
      let goto = ctx.session.goto || '/';
      delete ctx.session.goto;
      ctx.redirect(goto);
    }
  }
  return Controller;
};
