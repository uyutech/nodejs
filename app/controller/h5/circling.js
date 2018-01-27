/**
 * Created by army8735 on 2017/12/3.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let hotCircleList = {};
      let hotCircle = {};
      let postList = {};
      let res = yield {
        hotCircleList: ctx.helper.postServiceJSON2('api/find/GetCirclingInfo', {
          uid,
          Skip: 0,
          Take: 6,
        }),
        hotCircle: ctx.helper.postServiceJSON2('api/find/GetCirclingInfo', {
          uid,
          Skip: 0,
          Take: 6,
        }),
        postList: ctx.helper.postServiceJSON2('api/find/Hot_Post_List', {
          uid,
          Skip: 0,
          Take: 10,
        }),
      };
      if(res.hotCircleList.data.success) {
        hotCircleList = res.hotCircleList.data.data;
      }
      if(res.hotCircle.data.success) {
        hotCircle = res.hotCircle.data.data;
      }
      if(res.postList.data.success) {
        postList = res.postList.data.data;
      }
      ctx.body = ctx.helper.okJSON({
        hotCircleList,
        hotCircle,
        postList,
      });
    }
    * postList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let skip = body.skip;
      let take = body.take;
      let res = yield ctx.helper.postServiceJSON2('api/find/Hot_Post_List', {
        uid,
        Skip: skip,
        Take: take,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
