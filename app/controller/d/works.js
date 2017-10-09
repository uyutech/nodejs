/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let worksID = ctx.params.worksID;
      let worksDetail = {};
      let commentData = {};
      let res = yield {
        worksDetail: ctx.curl(ctx.helper.getRemoteUrl('api/works/GetWorkDetails'), {
          method: 'POST',
          data: {
            uid,
            WorksID: worksID,
          },
          dataType: 'json',
          gzip: true,
        }),
        commentData: ctx.curl(ctx.helper.getRemoteUrl('api/works/GetToWorkMessage_List'), {
          method: 'POST',
          data: {
            uid,
            WorksID: worksID,
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
      yield ctx.render('dworks', {
        worksID,
        worksDetail,
        commentData,
      });
    }
  }
  return Controller;
};
