/**
 * Created by army8735 on 2018/1/19.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      if(!body.workIDs) {
        return;
      }
      let res = yield ctx.helper.postServiceJSON2('/api/RecommendHomes/GetItemsByItemsID', {
        uid,
        ItemsID: body.workIDs,
        skip: 0,
        take: 20,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
