/**
 * Created by army8735 on 2017/10/12.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * commentList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/tag/GetToPostMessage_List'), {
        method: 'POST',
        data: {
          uid,
          PostID: body.activityID,
          Skip: body.skip,
          Take: body.take,
          SortType: body.sortType,
          MyComment: body.myComment,
          CurrentCount: body.currentCount,
        },
        dataType: 'json',
        gzip: true,
      });
      ctx.body = res.data;
    }
    * addComment(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/tag/AddComment'), {
        method: 'POST',
        data: {
          uid,
          ParentID: body.parentID,
          RootID: body.rootID,
          Content: body.content,
          PostID: body.activityID,
        },
        dataType: 'json',
        gzip: true,
      });
      ctx.body = res.data;
    }
    * likeComment(ctx) {
      let uid = ctx.session.uid;
      const body = ctx.request.body;
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/tag/AddWorkCommentLike'), {
        method: 'POST',
        data: {
          uid,
          CommentID: body.commentID,
        },
        dataType: 'json',
        gzip: true,
      });
      ctx.body = res.data;
    }
    * delComment(ctx) {
      let uid = ctx.session.uid;
      const body = ctx.request.body;
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/tag/DeleteCommentByID'), {
        method: 'POST',
        data: {
          uid,
          CommentID: body.commentID,
        },
        dataType: 'json',
        gzip: true,
      });
      ctx.body = res.data;
    }
    * subCommentList(ctx) {
      let uid = ctx.session.uid;
      const body = ctx.request.body;
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/tag/GetTocomment_T_List'), {
        method: 'POST',
        data: {
          uid,
          RootID: body.rootID,
          Skip: body.skip,
          Take: body.take,
        },
        dataType: 'json',
        gzip: true,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
