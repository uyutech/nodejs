/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let circleID = ctx.params.circleID;
      if(!circleID) {
        return;
      }
      let circleDetail = {};
      let postList = {};
      let res = yield {
        circleDetail: ctx.helper.postServiceJSON2('api/circling/GetCirclingDetails', {
          uid,
          circlingID: circleID,
        }),
        postList: ctx.helper.postServiceJSON2('api/circling/GetPostList', {
          uid,
          circlingID: circleID,
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
      yield ctx.render('mcircle', {
        uid,
        circleID,
        circleDetail,
        postList,
      });
    }
    * post(ctx) {
      let uid = ctx.session.uid;
      let circleID = ctx.query.circleID;
      let circleDetail = {};
      let hotCircleList = [];
      let res = yield {
        circleDetail: circleID ? ctx.helper.postServiceJSON('api/tag/GetTagDetails', {
          uid,
          TagID: circleID,
        }) : null,
        hotCircleList: ctx.helper.postServiceJSON('api/find/GetPost', {
          uid,
          Skip: 0,
          Take: 6,
        }),
      };
      if(res.circleDetail && res.circleDetail.data.success) {
        circleDetail = res.circleDetail.data.data;
      }
      if(res.hotCircleList.data.success) {
        hotCircleList = res.hotCircleList.data.data.data;
      }
      yield ctx.render('mcpost', {
        uid,
        circleID,
        circleDetail,
        hotCircleList,
      });
    }
  }
  return Controller;
};
