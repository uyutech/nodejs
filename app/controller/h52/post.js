/**
 * Created by army8735 on 2018/4/2.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let postId = body.postId;
    if(!postId) {
      return;
    }
    let [info, comment] = await Promise.all([
      service.post.info(postId),
      service.post.comment(postId, 0, 10)
    ]);
    comment.limit = 10;
    ctx.body = ctx.helper.okJSON({
      info,
      comment,
    });
  }
  async comment() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let postId = body.postId;
    if(!postId) {
      return;
    }
    let res = await service.post.comment(postId, body.offset || 0, body.limit || 10);
    res.limit = 10;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
