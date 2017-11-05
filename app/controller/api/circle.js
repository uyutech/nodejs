/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * join(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let circleID = body.circleID;
      let state = body.state;
      if(state === 'true') {
        let res = yield ctx.helper.postServiceJSON('api/tag/RemoveTagToUser', {
          uid,
          TagID: circleID,
        });
        ctx.body = res.data;
      }
      else {
        let res = yield ctx.helper.postServiceJSON('api/tag/SaveTagToUser', {
          uid,
          TagID: circleID,
        });
        ctx.body = res.data;
      }
    }
  }
  return Controller;
};