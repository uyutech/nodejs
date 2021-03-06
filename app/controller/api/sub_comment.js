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
          ctx.logger.info('postID %s cid %s rid %s', id, cid, rid);
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
          ctx.logger.info('authorID %s cid %s rid %s', id, cid, rid);
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
          ctx.logger.info('worksID %s cid %s rid %s', id, cid, rid);
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
