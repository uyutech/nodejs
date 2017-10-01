/**
 * Created by army8735 on 2017/10/1.
 */

'use strict';

module.exports = app => {
  class FindController extends app.Controller {
    * index(ctx) {
      yield ctx.render('find');
    }
  }
  return FindController;
};
