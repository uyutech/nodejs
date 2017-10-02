/**
 * Created by army8735 on 2017/10/2.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * c404(ctx) {
      yield ctx.render('404.html');
    }
  }
  return Controller;
};
