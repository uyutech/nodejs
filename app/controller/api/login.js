/**
 * Created by army8735 on 2017/10/9.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * loginOut(ctx) {
      ctx.session = null;
      ctx.body = {
        success: true,
      };
    }
  }
  return Controller;
};
