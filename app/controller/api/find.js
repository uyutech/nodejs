/**
 * Created by army8735 on 2017/10/2.
 */

'use strict';

module.exports = app => {
  class FindController extends app.Controller {
    * playList(ctx) {
      let query = ctx.request.body;
      let res;
      try {
        res = yield ctx.curl(ctx.helper.getRemoteUrl('api/find/GetFindWorkList'), {
          method: 'POST',
          data: {
            Parameter: query.Parameter,
            Skip: 1,
            Take: 10,
            SortType: 1,
          },
          dataType: 'json',
          gzip: true,
        });
      }
      catch(e) {
        ctx.logger.error(e.toString());
      }
      ctx.body = res.data;
    }
  }
  return FindController;
};
