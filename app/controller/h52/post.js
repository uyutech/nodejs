/**
 * Created by army8735 on 2018/4/2.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let postId = body.postId;
    if(!postId) {
      return;
    }
    let [info, commentList] = await Promise.all([
      service.post.info(postId, uid),
      service.post.commentList(postId, uid, 0, LIMIT)
    ]);
    commentList.limit = LIMIT;
    ctx.body = ctx.helper.okJSON({
      info,
      commentList,
    });
  }

  async commentList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let postId = body.postId;
    if(!postId) {
      return;
    }
    let res = await service.post.commentList(postId, uid, body.offset || 0, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
