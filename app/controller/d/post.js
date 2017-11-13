/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let id = ctx.params.id;
      if(!id) {
        return;
      }
      let postData = {};
      let replyData = {};
      let res = yield {
        postData: ctx.helper.postServiceJSON('api/tag/GetTagPostDetailes', {
          uid,
          PostID: id,
        }),
        replyData: ctx.helper.postServiceJSON('api/tag/GetToPostMessage_List', {
          uid,
          PostID: id,
          Skip: 0,
          Take: 10,
          sortType: 0,
          currentCount: 0,
          myComment: 0,
        }),
      };
      if(res.postData.data.success) {
        postData = res.postData.data.data;
      }
      if(res.replyData.data.success) {
        replyData = res.replyData.data.data;
      }
      yield ctx.render('dpost', {
        id,
        postData,
        replyData,
      });
    }
  }
  return Controller;
};
