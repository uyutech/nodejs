/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let myCircleList = {};
      let postList = {};
      let res = yield {
        myCircleList: ctx.helper.postServiceJSON2('api/Circling/GetAddPostCircling', {
          uid,
          Skip: 0,
          Take: 6,
        }),
        postList: ctx.helper.postServiceJSON2('api/find/Hot_Post_List', {
          uid,
          Skip: 0,
          Take: 30,
        }),
      };
      if(res.myCircleList.data.success) {
        myCircleList = res.myCircleList.data.data;
      }
      if(res.postList.data.success) {
        postList = res.postList.data.data;
      }
      yield ctx.render('dcircling', {
        myCircleList,
        postList,
      });
    }
  }

  return Controller;
};
