/**
 * Created by army8735 on 2017/10/10.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      yield ctx.render('dlogin', {
      });
    }
  }
  return Controller;
};
