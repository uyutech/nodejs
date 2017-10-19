/**
 * Created by army8735 on 2017/10/19.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * detail(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/works/GetWorkDetails', {
        uid,
        collectionID: body.collectionID,
        WorkID: body.collectionID,
      });
      ctx.body = res.data;
    }
    * commentList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/works/GetToWorkMessage_List', {
        uid,
        collectionID: body.collectionID,
        WorkID: body.collectionID,
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
      let res = yield ctx.helper.postServiceJSON('api/works/AddComment', {
        uid,
        ParentID: body.parentID,
        RootID: body.rootID,
        Content: body.content,
        subWorkID: body.workID || '',
        WorkID: body.collectionID,
        BarrageTime: body.barrageTime,
      });
      ctx.body = res.data;
    }
    * likeComment(ctx) {
      let uid = ctx.session.uid;
      const body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/works/AddWorkCommentLike', {
        uid,
        CommentID: body.commentID,
      });
      ctx.body = res.data;
    }
    * delComment(ctx) {
      let uid = ctx.session.uid;
      const body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/works/DeleteCommentByID', {
        uid,
        CommentID: body.commentID,
      });
      ctx.body = res.data;
    }
    * subCommentList(ctx) {
      let uid = ctx.session.uid;
      const body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/works/GetTocomment_T_List', {
        uid,
        RootID: body.rootID,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * addTempLink(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/UserAddOutsite', {
        uid,
        workid: body.collectionID,
        workitemid: body.workID,
        OutSiteUrl: body.url,
        OutSiteName: body.name,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
