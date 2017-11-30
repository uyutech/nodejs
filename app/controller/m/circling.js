/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let hotCircle = {};
      let postList = {};
      let res = yield {
        hotCircle: ctx.helper.postServiceJSON('api/find/GetPost', {
          uid,
          Skip: 0,
          Take: 6,
        }),
        postList: ctx.helper.postServiceJSON('api/find/Hot_Post_List', {
          uid,
          Skip: 0,
          Take: 10,
        }),
      };
      if(res.hotCircle.data.success) {
        hotCircle = res.hotCircle.data.data;
      }
      if(res.postList.data.success) {
        postList = res.postList.data.data;
      }
      yield ctx.render('mcircling', {
        hotCircle,
        postList,
      });
    }
  }

  return Controller;
};
