/**
 * Created by army8735 on 2017/10/2.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * hotWorkList(ctx) {
      let res = yield ctx.helper.postServiceJSON('api/find/Hot_works_List');
      ctx.body = res.data;
    }
    * tagB(ctx) {
    }
    * playList(ctx) {
      let query = ctx.request.body;
      let playList = {};
      let playList2 = {};
      let res = yield {
        playList: ctx.helper.postServiceJSON('api/find/GetFindWorkList', {
          Parameter: query.Parameter,
          Skip: 0,
          Take: 10,
          SortType: 1,
        }),
        playList2: ctx.helper.postServiceJSON('api/find/GetFindWorkList', {
          Parameter: query.Parameter,
          Skip: 0,
          Take: 10,
          SortType: 0,
        }),
      };
      if(res.playList.data.success) {
        playList = res.playList.data.data.data;
      }
      if(res.playList2.data.success) {
        playList2 = res.playList2.data.data.data;
      }
      ctx.body = {
        success: true,
        data: {
          playList,
          playList2,
        },
      };
    }
  }
  return Controller;
};
