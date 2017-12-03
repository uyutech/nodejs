/**
 * Created by army8735 on 2017/12/3.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let worksID = body.worksID;
      if(!worksID) {
        return;
      }
      let workID = body.workID;
      let worksDetail = {};
      let commentData = {};
      let res = yield {
        worksDetail: ctx.helper.postServiceJSON('api/works/GetWorkDetails', {
          uid,
          WorksID: worksID,
        }),
        commentData: ctx.helper.postServiceJSON('api/works/GetToWorkMessage_List', {
          uid,
          WorkID: worksID,
          WorksID: worksID,
          Skip: 0,
          Take: 30,
        }),
      };
      if(res.worksDetail.data.success) {
        worksDetail = res.worksDetail.data.data;
      }
      if(res.commentData.data.success) {
        commentData = res.commentData.data.data;
      }
      let labelList = [];
      if(worksDetail.WorkType === 11) {
        let res = yield ctx.helper.postServiceJSON('api/works/GetPhotoInfo', {
          uid,
          WorksID: worksID,
        });
        if(res.data.success) {
          labelList = res.data.data.TipsList || [];
        }
      }
      ctx.body = ctx.helper.okJSON({
        worksDetail,
        commentData,
        labelList,
      });
    }
    * commentList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/works/GetToWorkMessage_List', {
        uid,
        WorksID: body.worksID,
        WorkID: body.worksID,
        Skip: body.skip,
        Take: body.take,
        SortType: body.sortType,
        MyComment: body.myComment,
        CurrentCount: body.currentCount,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
