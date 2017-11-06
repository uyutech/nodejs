/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * detail(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/works/GetWorkDetails', {
        uid,
        WorksID: body.worksID,
        WorkID: body.worksID,
      });
      ctx.body = res.data;
    }
    * commentList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/works/GetToWorkMessage_List', {
        uid,
        WorksID: body.worksID,
        WorkID: body.worksID,
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
      let content = body.content || '';
      if(!content || content.length > 256) {
        return ctx.body = {
          success: false,
        };
      }
      let res = yield ctx.helper.postServiceJSON('api/works/AddComment', {
        uid,
        ParentID: body.parentID,
        RootID: body.rootID,
        Content: content,
        subWorkID: body.workID || '',
        WorkID: body.worksID,
        BarrageTime: body.barrageTime,
      });
      ctx.body = res.data;
    }
    * likeComment(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/works/AddWorkCommentLike', {
        uid,
        CommentID: body.commentID,
      });
      ctx.body = res.data;
    }
    * delComment(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/works/DeleteCommentByID', {
        uid,
        CommentID: body.commentID,
      });
      ctx.body = res.data;
    }
    * subCommentList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/works/GetTocomment_T_List', {
        uid,
        RootID: body.rootID,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * likeWork(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/works/AddLikeBehavior', {
        uid,
        WorkItemsID: body.workID,
      });
      ctx.body = res.data;
    }
    * favorWork(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/works/AddCollection', {
        uid,
        WorkItemsID: body.workID,
      });
      ctx.body = res.data;
    }
    * unFavorWork(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/works/RemoveCollection', {
        uid,
        WorkItemsID: body.workID,
      });
      ctx.body = res.data;
    }
    * photoList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/works/GetPhotoPicByWorkID', {
        uid,
        WorksID: body.worksID,
        Skip: body.skip,
        Take: body.take,
        SortType: body.sortType,
        tagname: body.tagName,
      });
      ctx.body = res.data;
    }
    * addTempLink(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/UserAddOutsite', {
        uid,
        workid: body.worksID,
        workitemid: body.workID,
        OutSiteUrl: body.url,
        OutSiteName: body.name,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
