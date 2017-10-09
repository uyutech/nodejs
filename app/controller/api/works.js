/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * commentList(ctx) {
      let query = ctx.request.body;
      let res = {};
      try {
        res = yield ctx.curl(ctx.helper.getRemoteUrl('api/works/GetToWorkMessage_List'), {
          method: 'POST',
          data: {
            WorkID: query.worksID,
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
    * likeWork(ctx) {
      let uid = ctx.session.uid;
      let query = ctx.request.body;
      let res = {};
      try {
        res = yield ctx.curl(ctx.helper.getRemoteUrl('api/works/AddLikeBehavior'), {
          method: 'POST',
          data: {
            uid,
            WorkItemsID: query.workID,
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
    * favorWork(ctx) {
      let uid = ctx.session.uid;
      let query = ctx.request.body;
      let res = {};
      try {
        res = yield ctx.curl(ctx.helper.getRemoteUrl('api/works/AddCollection'), {
          method: 'POST',
          data: {
            uid,
            WorkItemsID: query.workID,
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
    * unFavorWork(ctx) {
      let uid = ctx.session.uid;
      let query = ctx.request.body;
      let res = {};
      try {
        res = yield ctx.curl(ctx.helper.getRemoteUrl('api/works/RemoveCollection'), {
          method: 'POST',
          data: {
            uid,
            WorkItemsID: query.workID,
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
