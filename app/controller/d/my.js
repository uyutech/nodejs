/**
 * Created by army8735 on 2017/10/9.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let userInfo = {};
      let follows = [];
      let favors = [];
      let res = yield {
        userInfo: ctx.curl(ctx.helper.getRemoteUrl('api/users/GetUserInfo'), {
          method: 'POST',
          data: {
            uid,
          },
          dataType: 'json',
          gzip: true,
        }),
        follows: ctx.curl(ctx.helper.getRemoteUrl('api/users/GetLikeAuthorList'), {
          method: 'POST',
          data: {
            uid,
          },
          dataType: 'json',
          gzip: true,
        }),
        favors: ctx.curl(ctx.helper.getRemoteUrl('api/users/GetLikeWorksList'), {
          method: 'POST',
          data: {
            uid,
          },
          dataType: 'json',
          gzip: true,
        }),
      };
      if(res.userInfo.data.success) {
        userInfo = res.userInfo.data.data;
      }
      if(res.follows.data.success) {
        follows = res.follows.data.data;
      }
      if(res.favors.data.success) {
        favors = res.favors.data.data;
      }
      yield ctx.render('dmy', {
        userInfo,
        follows,
        favors,
      });
    }
  }
  return Controller;
};
