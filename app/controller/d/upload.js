/**
 * Created by army8735 on 2017/10/15.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      yield app.redis.set('a', null);
      let a = yield app.redis.get('a');
      if(ctx.session.uid) {
        // let uid = ctx.session.uid;
        // let res = yield ctx.helper.postServiceJSON2('api/users/GetUserInfo', {
        //   uid,
        // });
        // let userInfo = res.data.data || {};
        yield ctx.render('dupload', {
          // userInfo,
        });
      }
    }
  }
  return Controller;
};
