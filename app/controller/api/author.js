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
    * commentList(ctx) {
      let query = ctx.request.body;
      let res = {};
      try {
        res = yield ctx.curl(ctx.helper.getRemoteUrl('api/author/GetToAuthorMessage_List'), {
          method: 'POST',
          data: {
            AuthorID: query.authorID,
            Skip: query.skip,
            Take: query.take,
            SortType: query.sortType,
            MyComment: query.myComment,
            CurrentCount: query.currentCount,
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
