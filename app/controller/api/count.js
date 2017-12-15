/**
 * Created by army8735 on 2017/12/12.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let ip = ctx.request.header['x-real-ip'];
      yield ctx.helper.postServiceJSON2('api/users/PostRecordUserIP', {
        uid,
        ip,
      });
      ctx.body = { success: true };
    }
  }
  return Controller;
};
