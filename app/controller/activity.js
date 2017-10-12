/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let id = ctx.params.id;
      let list = [];
      let postData = {};
      let commentData = {};
      let res = yield {
        list: ctx.curl(ctx.helper.getRemoteUrl('api/tag/GetTagPost'), {
          method: 'POST',
          data: {
            uid,
            TagID: 21,
          },
          dataType: 'json',
          gzip: true,
        }),
        post: ctx.curl(ctx.helper.getRemoteUrl('api/tag/GetTagPostDetailes'), {
          method: 'POST',
          data: {
            uid,
            PostID: id,
          },
          dataType: 'json',
          gzip: true,
        }),
        commentData: ctx.curl(ctx.helper.getRemoteUrl('api/tag/GetToPostMessage_List'), {
          method: 'POST',
          data: {
            uid,
            PostID: id,
            Skip: 0,
            Take: 10,
            sortType: 0,
            currentCount: 0,
            myComment: 0,
          },
          dataType: 'json',
          gzip: true,
        }),
      };
      if(res.list.data.success) {
        list = res.list.data.data;
      }
      if(res.post.data.success) {
        postData = res.post.data.data;
      }
      if(res.commentData.data.success) {
        commentData = res.commentData.data.data;
      }
      if(uid) {
        let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/users/GetUserInfo'), {
          method: 'POST',
          data: {
            uid,
          },
          dataType: 'json',
          gzip: true,
        });
        let userInfo = res.data.data || {};
        yield ctx.render('activity', {
          isLogin: true,
          userInfo,
          id,
          list,
          postData,
          commentData,
        });
      }
      else {
        yield ctx.render('activity', {
          isLogin: false,
          userInfo: {},
          id,
          list,
          postData,
          commentData,
        });
      }
    }
  }
  return Controller;
};
