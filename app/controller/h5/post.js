/**
 * Created by army8735 on 2017/12/4.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let postID = body.postID;
      if(!postID) {
        return;
      }
      let postData = {};
      let replyData = {};
      let res = yield {
        postData: ctx.helper.postServiceJSON('api/tag/GetTagPostDetailes', {
          uid,
          PostID: postID,
        }),
        replyData: ctx.helper.postServiceJSON('api/tag/GetToPostMessage_List', {
          uid,
          PostID: postID,
          Skip: 0,
          Take: 30,
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
      ctx.body = ctx.helper.okJSON({
        postData,
        replyData,
      });
    }
    * like(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/tag/AddLikeBehavior', {
        uid,
        PostID: body.postID,
      });
      ctx.body = res.data;
    }
    * favor(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/tag/AddCollection', {
        uid,
        PostID: body.postID,
      });
      ctx.body = res.data;
    }
    * unFavor(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/tag/RemoveCollection', {
        uid,
        PostID: body.postID,
      });
      ctx.body = res.data;
    }
    * del(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/tag/DelPost', {
        uid,
        PostID: body.postID,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
