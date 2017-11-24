/**
 * Created by army8735 on 2017/10/4.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let kw = ctx.params.kw;
      let datas = {};
      let res = yield {
        datas: ctx.curl(ctx.helper.postServiceJSON('api/search/Homesearch'), {
          Parameter: kw,
        }),
      };
      if(res.datas.data.success) {
        datas = res.datas.data;
      }
      yield ctx.render('msearch', {
        kw,
        datas,
      });
    }
  }
  return Controller;
};
