/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * tagB(ctx) {
      let query = ctx.request.body;
      let res = {};
      try {
        res = yield ctx.curl(ctx.helper.getRemoteUrl('api/author/GetAuthorFilterlevelB'), {
          method: 'POST',
          data: {
            AuthorID: query.authorID,
            FilterlevelA: query.tagA,
          },
          dataType: 'json',
          gzip: true,
        });
      }
      catch(e) {
        ctx.logger.error(e.toString());
      }
      ctx.body = res.data;
    }
    * playList(ctx) {
      let query = ctx.request.body;
      let res = {};
      try {
        res = yield ctx.curl(ctx.helper.getRemoteUrl('api/author/SearchWorks'), {
          method: 'POST',
          data: {
            AuthorID: query.authorID,
            Parameter: query.parameter,
            Skip: 0,
            Take: 10,
            SortType: 1,
          },
          dataType: 'json',
          gzip: true,
        });
      }
      catch(e) {
        ctx.logger.error(e.toString());
      }
      ctx.body = res.data;
    }
    * follow(ctx) {
      let uid = ctx.session.uid;
      let authorID = ctx.request.body.authorID;
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/author/SaveAuthorToUser'), {
        method: 'POST',
        data: {
          uid,
          Author: authorID,
        },
        dataType: 'json',
        gzip: true,
      });
      ctx.body = res.data;
    }
    * unFollow(ctx) {
      let uid = ctx.session.uid;
      let authorID = ctx.request.body.authorID;
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/author/RemoveAuthorToUser'), {
        method: 'POST',
        data: {
          uid,
          Author: authorID,
        },
        dataType: 'json',
        gzip: true,
      });
      ctx.body = res.data;
    }
    * commentList(ctx) {
      let uid = ctx.session.uid;
      const body = ctx.request.body;
      let res = {};
      try {
        res = yield ctx.curl(ctx.helper.getRemoteUrl('api/author/GetToAuthorMessage_List'), {
          method: 'POST',
          data: {
            uid,
            AuthorID: body.authorID,
            Skip: body.skip,
            Take: body.take,
            SortType: body.sortType,
            MyComment: body.myComment,
            CurrentCount: body.currentCount,
          },
          dataType: 'json',
          gzip: true,
        });
      }
      catch(e) {
        ctx.logger.error(e.toString());
      }
      ctx.body = res.data;
    }
    * addComment(ctx) {
      let uid = ctx.session.uid;
      const body = ctx.request.body;
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/author/AddComment'), {
        method: 'POST',
        data: {
          uid,
          ParentID: body.parentID,
          RootID: body.rootID,
          Content: body.content,
          AuthorCommentID: body.authorID,
        },
        dataType: 'json',
        gzip: true,
      });
      ctx.body = res.data;
    }
    * likeComment(ctx) {
      let uid = ctx.session.uid;
      const body = ctx.request.body;
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/author/AddWorkCommentLike'), {
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
      let res = yield ctx.curl(ctx.helper.getRemoteUrl('api/author/DeleteCommentByID'), {
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
      let res = {};
      try {
        res = yield ctx.curl(ctx.helper.getRemoteUrl('api/author/GetTocomment_T_List'), {
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
      }
      catch(e) {
        ctx.logger.error(e.toString());
      }
      ctx.body = res.data;
    }
  }
  return Controller;
};
