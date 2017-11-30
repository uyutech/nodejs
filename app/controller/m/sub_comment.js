/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let id = ctx.query.id;
      let type = ctx.query.type;
      let cid = ctx.query.cid;
      if(!id || !type) {
        return;
      }
      yield ctx.render('msubcomment', {
        uid,
        id,
        type,
        cid,
      });
    }
  }
  return Controller;
};
