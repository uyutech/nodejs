/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * postList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/GetUserFollowUserCircling', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
