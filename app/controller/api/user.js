/**
 * Created by army8735 on 2017/10/17.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * updateNickName(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/UpdateNickName', {
        uid,
        NickName: body.nickName,
      });
      ctx.body = res.data;
    }
    * tagB(ctx) {
    }
  }
  return Controller;
};
