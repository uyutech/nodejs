/**
 * Created by army8735 on 2017/12/2.
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
