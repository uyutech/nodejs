/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

const TYPE = {
  POST: '1',
  AUTHOR: '2',
  WORKS: '3',
};

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let id = body.id;
      let type = body.type;
      if(!id || !type) {
        return ctx.body = {
          success: false,
        };
      }
      let content = (body.content || '').trim();
      if(content.length < 3 || content.length > 1024) {
        return ctx.body = {
          success: false,
        };
      }
      let cid = body.cid || -1;
      let rid = body.rid || -1;
      let res;
      switch(type) {
        case TYPE.POST:
          res = yield ctx.helper.postServiceJSON('api/tag/AddComment', {
            uid,
            ParentID: cid,
            RootID: rid,
            Content: content,
            PostID: id,
          });
          ctx.body = res.data;
          break;
        case TYPE.AUTHOR:
          res = yield ctx.helper.postServiceJSON('api/author/AddComment', {
            uid,
            ParentID: cid,
            RootID: rid,
            Content: content,
            AuthorCommentID: id,
          });
          ctx.body = res.data;
          break;
        case TYPE.WORKS:
          res = yield ctx.helper.postServiceJSON('api/works/AddComment', {
            uid,
            ParentID: cid,
            RootID: rid,
            Content: content,
            WorkID: id,
            subWorkID: body.sid,
            BarrageTime: body.barrageTime,
          });
          ctx.body = res.data;
          break;
      }
    }
  }
  return Controller;
};
