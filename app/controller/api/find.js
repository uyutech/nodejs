/**
 * Created by army8735 on 2017/10/2.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * hotWorkList(ctx) {
      let uid = ctx.session.uid;
      let res = yield ctx.helper.postServiceJSON('api/find/Hot_works_List', {
        uid,
        Skip: 0,
        Take: 10,
      });
      ctx.body = res.data;
    }
    * hotPostList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/find/Hot_Post_List', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
