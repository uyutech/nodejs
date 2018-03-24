/**
 * Created by army8735 on 2018/2/8.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/Report/AddReport', {
        uid,
        businessID: body.businessId,
        ReportType: body.reportType,
        Describe: body.describe || '',
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
