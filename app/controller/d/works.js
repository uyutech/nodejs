/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let worksID = ctx.params.worksID;
      if(!worksID) {
        return;
      }
      let workID = ctx.params.workID;
      let worksDetail = {};
      let commentData = {};
      let res = yield {
        worksDetail: ctx.service.works.index(worksID),
        commentData: ctx.helper.postServiceJSON2('api/Users_Comment/GetToWorkMessage_List', {
          uid,
          WorkID: worksID,
          WorksID: worksID,
        }),
      };
      if(res.worksDetail) {
        worksDetail = res.worksDetail;
      }
      if(res.commentData.data.success) {
        commentData = res.commentData.data.data;
      }
      let labelList = [];
      if(worksDetail.WorkType === 11) {
        let res = yield ctx.helper.postServiceJSON2('api/works/GetPhotoInfo', {
          uid,
          WorksID: worksID,
        });
        if(res.data.success) {
          labelList = res.data.data.TipsList || [];
        }
      }
      yield ctx.render('dworks', {
        worksID,
        workID,
        worksDetail,
        commentData,
        labelList,
      });
    }
  }
  return Controller;
};
