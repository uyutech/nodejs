/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      if(ctx.session.uid) {
        let uid = ctx.session.uid;console.log(uid);
        let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/users/GetUserInfo'), {
          method: 'POST',
          data: {
            uid,
          },
          dataType: 'json',
          gzip: true,
        });
        let userInfo = res.data.data || {};
        yield ctx.render('dindex', {
          userInfo,
        });
      }
      else {
        yield ctx.render('dindex', {
          userInfo: {},
        });
      }
    }
  }
  return Controller;
};
