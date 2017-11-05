/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let circleID = ctx.params.circleID;
      let circleDetail = {};
      let postList = {};
      let res = yield {
        circleDetail: ctx.helper.postServiceJSON('api/tag/GetTagDetails', {
          uid,
          TagID: circleID,
        }),
        postList: ctx.helper.postServiceJSON('api/tag/GetTagPost', {
          uid,
          TagID: circleID,
          Skip: 0,
          Take: 20,
        }),
      };
      if(res.circleDetail.data.success) {
        circleDetail = res.circleDetail.data.data;
      }
      if(res.postList.data.success) {
        postList = res.postList.data.data;
      }
      yield ctx.render('dcircle', {
        uid,
        circleID,
        circleDetail,
        postList,
      });
    }
  }
  return Controller;
};
