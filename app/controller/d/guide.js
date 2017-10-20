/**
 * Created by army8735 on 2017/10/20.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      yield ctx.render('dguide', {
      });
    }
  }
  return Controller;
};
