/**
 * Created by army8735 on 2017/10/16.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let follows = {};
      let res = yield ctx.helper.postServiceJSON('api/users/GetUserLikeYSYAuthor', {
        uid,
      });
      if(res.data.success) {
        follows = res.data.data;
      }
      yield ctx.render('rhyme', {
        isLogin: !!uid,
        uid,
        follows,
      });
    }
    * rjrjs(ctx) {
      ctx.redirect('/#work2015000000000006');
    }
    * jrj(ctx) {
      ctx.redirect('/#work2015000000000001');
    }
    * shuomeng(ctx) {
      ctx.redirect('/#work2015000000000002');
    }
  }
  return Controller;
};
