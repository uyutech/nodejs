/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let worksID = ctx.params.worksID;
      let worksDetail = {};
      let commentData = {};
      try {
        let res = yield {
          worksDetail: ctx.curl(ctx.helper.getRemoteUrl('api/works/GetWorkDetails'), {
            method: 'POST',
            data: {
              WorksID: worksID,
            },
            dataType: 'json',
            gzip: true,
          }),
          commentData: ctx.curl(ctx.helper.getRemoteUrl('api/works/GetToWorkMessage_List'), {
            method: 'POST',
            data: {
              WorkID: worksID,
              Skip: 0,
              Take: 10,
              SortType: 0,
              MyComment: 0,
              CurrentCount: 0,
            },
            dataType: 'json',
            gzip: true,
          }),
        };
        if(res.worksDetail.data.success) {
          worksDetail = res.worksDetail.data.data;
        }
        if(res.commentData.data.success) {
          commentData = res.commentData.data.data;
        }
      }
      catch(e) {
        ctx.logger.error(e.toString());
      }
      yield ctx.render('mworks', {
        worksID,
        worksDetail,
        commentData,
      });
    }
  }
  return Controller;
};
