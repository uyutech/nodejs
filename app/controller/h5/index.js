/**
 * Created by army8735 on 2017/12/6.
 */

'use strict';
module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      yield ctx.render('h5.html');
    }
  }
  return Controller;
};
