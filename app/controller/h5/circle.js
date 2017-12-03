/**
 * Created by army8735 on 2017/12/3.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let circleID = body.circleID;
      if(!circleID) {
        return;
      }
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
          Take: 10,
        }),
      };
      if(res.circleDetail.data.success) {
        circleDetail = res.circleDetail.data.data;
      }
      if(res.postList.data.success) {
        postList = res.postList.data.data;
      }
      ctx.body = ctx.helper.okJSON({
        circleDetail,
        postList,
      });
    }
    * postList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let circleID = body.circleID;
      let skip = body.skip;
      let take = body.take;
      let res = yield ctx.helper.postServiceJSON('api/tag/GetTagPost', {
        uid,
        TagID: circleID,
        Skip: skip,
        Take: take,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
