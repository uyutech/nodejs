/**
 * Created by army8735 on 2017/12/22.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let res = yield ctx.helper.postServiceJSON2('api/Mall_Product/GetProduct_List', {
        uid,
        skip: 0,
        take: 20,
      });
      ctx.body = res.data;
    }
    * new(ctx) {
      let uid = ctx.session.uid;
      let res = yield ctx.helper.postServiceJSON2('api/users/GetNewGoodsList', {
        uid,
        skip: 0,
        take: 20,
      });
      ctx.body = res.data;
    }
    * wait(ctx) {
      let uid = ctx.session.uid;
      let res = yield ctx.helper.postServiceJSON2('api/users/GetWaitingGoodsList', {
        uid,
        skip: 0,
        take: 20,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
