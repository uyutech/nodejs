/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * follow(ctx) {
      let uid = ctx.session.uid;
      let authorID = ctx.request.body.authorID;
      let res = yield ctx.helper.postServiceJSON2('api/author/SaveAuthorToUser', {
        uid,
        Author: authorID,
      });
      ctx.body = res.data;
    }
    * unFollow(ctx) {
      let uid = ctx.session.uid;
      let authorID = ctx.request.body.authorID;
      let res = yield ctx.helper.postServiceJSON2('api/author/RemoveAuthorToUser', {
        uid,
        Author: authorID,
      });
      ctx.body = res.data;
    }
    * commentList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/Users_Comment/GetToAuthorMessage_List', {
        uid,
        AuthorID: body.authorID,
        Skip: body.skip,
        Take: body.take,
        SortType: body.sortType,
        MyComment: body.myComment,
        CurrentCount: body.currentCount,
      });
      ctx.body = res.data;
    }
    * addComment(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let content = (body.content || '').trim();
      if(content.length < 3 || content.length > 2048) {
        return ctx.body = {
          success: false,
        };
      }
      let res = yield ctx.helper.postServiceJSON2('api/Users_Comment/AddAuthorComment', {
        uid,
        ParentID: body.parentID,
        RootID: body.rootID,
        SendContent: content,
        AuthorID: body.authorID,
      });
      ctx.body = res.data;
    }
    * likeComment(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/Users_Comment/AddCommentLike', {
        uid,
        CommentID: body.commentID,
      });
      ctx.body = res.data;
    }
    * delComment(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/Users_Comment/DeleteCommentByID', {
        uid,
        CommentID: body.commentID,
      });
      ctx.body = res.data;
    }
    * subCommentList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/Users_Comment/GetTocomment_T_List', {
        uid,
        RootID: body.rootID,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * maList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/find/Hot_WorkItems', {
        uid,
        AuthorID: body.authorID,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * picList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/find/Hot_PicWorkItems', {
        uid,
        AuthorID: body.authorID,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
