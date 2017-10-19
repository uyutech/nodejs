/**
 * Created by army8735 on 2017/10/18.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let collectionID = ctx.params.collectionID;
      let collectionDetail = {};
      let commentData = {};
      let res = yield {
        collectionDetail: ctx.helper.postServiceJSON('api/works/GetWorkDetails', {
          uid,
          WorksID: collectionID,
        }),
        commentData: ctx.helper.postServiceJSON('api/works/GetToWorkMessage_List', {
          uid,
          WorksID: collectionID,
        }),
      };
      if(res.collectionDetail.data.success) {
        collectionDetail = res.collectionDetail.data.data;
      }
      if(res.commentData.data.success) {
        commentData = res.commentData.data.data;
      }
      yield ctx.render('dcollection', {
        collectionID,
        collectionDetail,
        commentData,
      });
    }
  }
  return Controller;
};
