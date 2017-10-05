/**
 * Created by army8735 on 2017/10/4.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let kw = ctx.params.kw;
      let datas = {};
      try {
        let res = yield {
          datas: ctx.curl(ctx.helper.getRemoteUrl('api/search/Homesearch'), {
            method: 'POST',
            data: {
              Parameter: kw,
            },
            dataType: 'json',
            gzip: true,
          }),
        }
        if(res.datas.data.success) {
          datas = res.datas.data;
        }
      }
      catch(e) {
        ctx.logger.error(e.toString());
      }
      yield ctx.render('search', {
        kw,
        datas,
      });
    }
  }
  return Controller;
};
