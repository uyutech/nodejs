/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let id = ctx.params.id;
      let list = [];
      let postData = {};
      let commentData = {};
      let res = yield {
        list: ctx.helper.postServiceJSON('api/tag/GetTagPost', {
          uid,
          TagID: 21,
        }),
        post: ctx.helper.postServiceJSON('api/tag/GetTagPostDetailes', {
          uid,
          PostID: id,
        }),
        commentData: ctx.helper.postServiceJSON('api/tag/GetToPostMessage_List', {
          uid,
          PostID: id,
          Skip: 0,
          Take: 10,
          sortType: 0,
          currentCount: 0,
          myComment: 0,
        }),
      };
      if(res.list.data.success) {
        list = res.list.data.data;
      }
      if(res.post.data.success) {
        postData = res.post.data.data;
      }
      if(res.commentData.data.success) {
        commentData = res.commentData.data.data;
      }
      yield ctx.render('dpost', {
        isLogin: !!uid,
        id,
        list,
        postData,
        commentData,
      });
    }
  }
  return Controller;
};
