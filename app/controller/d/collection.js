/**
 * Created by army8735 on 2017/10/18.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let collectionID = ctx.params.collectionID;
      yield ctx.render('dcollection', {
        collectionID,
      });
    }
  }
  return Controller;
};
