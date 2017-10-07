/**
 * Created by army8735 on 2017/10/7.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * weibo(ctx) {
      const query = ctx.query;
      let goto = query.goto;
      ctx.session.goto = goto || '/';
      yield ctx.render('weibo');
    }
  }
  return Controller;
};
