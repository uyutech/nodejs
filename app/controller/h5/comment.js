/**
 * Created by army8735 on 2017/12/5.
 */

'use strict';

const TYPE = {
  POST: '1',
  AUTHOR: '2',
  WORKS: '3',
};

module.exports = app => {
  class Controller extends app.Controller {
    * sub(ctx) {
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
      if(content.length < 3 || content.length > 2048) {
        return ctx.body = {
          success: false,
        };
      }
      let cid = body.cid || -1;
      let rid = body.rid || -1;
      let res;
      switch(type) {
        case TYPE.POST:
          // if(rid === -1) {
          //   rid = cid = id;
          // }
          res = yield ctx.helper.postServiceJSON2('api/Users_Comment/AddPostComment', {
            uid,
            ParentID: cid,
            RootID: rid,
            SendContent: content,
            PostID: id,
          });
          ctx.body = res.data;
          break;
        case TYPE.AUTHOR:
          res = yield ctx.helper.postServiceJSON2('api/Users_Comment/AddAuthorComment', {
            uid,
            ParentID: cid,
            RootID: rid,
            SendContent: content,
            AuthorID: id,
          });
          ctx.body = res.data;
          break;
        case TYPE.WORKS:
          res = yield ctx.helper.postServiceJSON2('api/Users_Comment/AddWorksComment', {
            uid,
            ParentID: cid,
            RootID: rid,
            SendContent: content,
            WorksID: id,
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
