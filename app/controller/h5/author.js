/**
 * Created by army8735 on 2017/12/3.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let authorID = body.authorID;
      if(!authorID) {
        return;
      }
      let authorDetail = {};
      let homeDetail = {};
      let album = {};
      let commentData = {};
      let hotPlayList = {};
      let res = yield {
        authorDetail: ctx.helper.postServiceJSON('api/author/GetAuthorDetails', {
          uid,
          AuthorID: authorID,
        }),
        homeDetail: ctx.helper.postServiceJSON('api/author/GetAuthorHomePage', {
          AuthorID: authorID,
        }),
        album: ctx.helper.postServiceJSON('api/author/GetAuthoralbum_List', {
          AuthorID: authorID,
          Skip: 0,
          Take: 10,
        }),
        commentData: ctx.helper.postServiceJSON('api/author/GetToAuthorMessage_List', {
          uid,
          AuthorID: authorID,
          Skip: 0,
          Take: 30,
          SortType: 0,
          MyComment: 0,
          CurrentCount: 0,
        }),
        hotPlayList: ctx.helper.postServiceJSON('api/find/Hot_WorkItems', {
          uid,
          Skip: 0,
          Take: 30,
          AuthorID: authorID,
        }),
      };
      if(res.authorDetail.data.success) {
        authorDetail = res.authorDetail.data.data;
      }
      if(res.homeDetail.data.success) {
        homeDetail = res.homeDetail.data.data;
      }
      if(res.album.data.success) {
        album = res.album.data.data;
      }
      if(res.commentData.data.success) {
        commentData = res.commentData.data.data;
      }
      if(res.hotPlayList.data.success) {
        hotPlayList = res.hotPlayList.data.data;
      }
      ctx.body = ctx.helper.okJSON({
        authorDetail,
        homeDetail,
        album,
        commentData,
        hotPlayList,
      });
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
      let res = yield ctx.helper.postServiceJSON('api/author/AddComment', {
        uid,
        ParentID: body.parentID,
        RootID: body.rootID,
        Content: content,
        AuthorCommentID: body.authorID,
      });
      ctx.body = res.data;
    }
    * likeComment(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/author/AddWorkCommentLike', {
        uid,
        CommentID: body.commentID,
      });
      ctx.body = res.data;
    }
    * delComment(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/author/DeleteCommentByID', {
        uid,
        CommentID: body.commentID,
      });
      ctx.body = res.data;
    }
    * subCommentList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/author/GetTocomment_T_List', {
        uid,
        RootID: body.rootID,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
