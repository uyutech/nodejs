/**
 * Created by army8735 on 2017/11/28.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      if(!uid) {
        return ctx.body = ctx.helper.errorJSON({
          code: 1000,
        });
      }
    }
  }
  return Controller;
};
