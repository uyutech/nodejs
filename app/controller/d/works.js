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
        worksDetail: ctx.helper.postServiceJSON('api/works/GetWorkDetails', {
          uid,
          WorksID: worksID,
        }),
        commentData: ctx.helper.postServiceJSON('api/works/GetToWorkMessage_List', {
          uid,
          WorksID: worksID,
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
