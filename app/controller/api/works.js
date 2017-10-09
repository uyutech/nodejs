/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * commentList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/works/GetToWorkMessage_List'), {
        method: 'POST',
        data: {
          uid,
          WorksID: body.worksID,
          WorkID: body.worksID,
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
      let body = ctx.request.body;console.log(body);
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/works/AddComment'), {
        method: 'POST',
        data: {
          uid,
          ParentID: body.parentID,
          RootID: body.rootID,
          Content: body.content,
          subWorkID: body.workID,
          WorkID: body.worksID,
          BarrageTime: body.barrageTime,
        },
        dataType: 'json',
        gzip: true,
      });
      ctx.body = res.data;
    }
    * likeComment(ctx) {
      let uid = ctx.session.uid;
      const body = ctx.request.body;
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/works/AddWorkCommentLike'), {
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
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/works/DeleteCommentByID'), {
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
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/works/GetTocomment_T_List'), {
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
    * likeWork(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/works/AddLikeBehavior'), {
        method: 'POST',
        data: {
          uid,
          WorkItemsID: body.workID,
        },
        dataType: 'json',
        gzip: true,
      });
      ctx.body = res.data;
    }
    * favorWork(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/works/AddCollection'), {
        method: 'POST',
        data: {
          uid,
          WorkItemsID: body.workID,
        },
        dataType: 'json',
        gzip: true,
      });
      ctx.body = res.data;
    }
    * unFavorWork(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/works/RemoveCollection'), {
        method: 'POST',
        data: {
          uid,
          WorkItemsID: body.workID,
        },
        dataType: 'json',
        gzip: true,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
