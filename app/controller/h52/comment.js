/**
 * Created by army8735 on 2018/4/7.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async like() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let commentId = body.commentId;
    if(!commentId) {
      return;
    }
    let res = await service.comment.like(commentId, uid, true);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unLike() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let commentId = body.commentId;
    if(!commentId) {
      return;
    }
    let res = await service.comment.like(commentId, uid, false);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
