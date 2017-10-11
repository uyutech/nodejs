/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let id = ctx.params.id;
      let postData = {};
      let post = yield ctx.curl(ctx.helper.getRemoteUrl('api/tag/GetTagPostDetailes'), {
        method: 'POST',
        data: {
          uid,
          PostID: id,
        },
        dataType: 'json',
        gzip: true,
      });
      if(post.data.success) {
        postData = post.data.data;
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
          userInfo,
          id,
          postData,
        });
      }
      else {
        yield ctx.render('activity', {
          userInfo: {},
          id,
          postData,
        });
      }
    }
  }
  return Controller;
};
