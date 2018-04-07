/**
 * Created by army8735 on 2018/4/7.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

class Controller extends egg.Controller {
  async comment() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let postId = body.postId;
    if(!postId) {
      return;
    }
    let offset = body.offset || 0;
    let res = await service.post.comment(postId, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
