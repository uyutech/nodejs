/**
 * Created by army8735 on 2017/11/17.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let userID = ctx.params.userID;
      if(!userID) {
        return;
      }
      if(userID === uid.toString()) {
        return ctx.redirect('/my');
      }
      ctx.body = userID;
    }
  }

  return Controller;
};
