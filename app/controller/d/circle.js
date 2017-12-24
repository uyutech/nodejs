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
      let stick = [];
      let postList = {};
      let hotCircleList = [];
      let res = yield {
        circleDetail: ctx.helper.postServiceJSON2('api/circling/GetCirclingDetails', {
          uid,
          circlingID: circleID,
        }),
        // stick: ctx.helper.postServiceJSON2('api/Circling/GetTopPostList', {
        //   uid,
        //   circlingID: circleID,
        // }),
        postList: ctx.helper.postServiceJSON2('api/circling/GetPostList', {
          uid,
          circlingID: circleID,
          Skip: 0,
          Take: 10,
        }),
        hotCircleList: ctx.helper.postServiceJSON2('api/find/GetCirclingInfo', {
          uid,
          Skip: 0,
          Take: 6,
        }),
      };
      if(res.circleDetail.data.success) {
        circleDetail = res.circleDetail.data.data;
      }
      // if(res.stick.data.success) {
      //   stick = res.stick.data.data.data;
      // }
      if(res.postList.data.success) {
        postList = res.postList.data.data;
      }
      if(res.hotCircleList.data.success) {
        hotCircleList = res.hotCircleList.data.data.data;
      }
      yield ctx.render('dcircle', {
        uid,
        circleID,
        circleDetail,
        stick,
        postList,
        hotCircleList,
      });
    }
  }
  return Controller;
};
