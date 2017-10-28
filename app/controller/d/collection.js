/**
 * Created by army8735 on 2017/10/18.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let collectionID = ctx.params.collectionID;
      ctx.redirect('/works/' + collectionID);
    }
  }
  return Controller;
};
