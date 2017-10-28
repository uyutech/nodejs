/**
 * Created by army8735 on 2017/10/27.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      if(ctx.session.uid) {
        return ctx.redirect('/my');
      }
      yield ctx.render('mlogin', {
      });
    }
  }
  return Controller;
};
