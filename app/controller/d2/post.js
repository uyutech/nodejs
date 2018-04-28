/**
 * Created by army8735 on 2018/4/7.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let postId = ctx.params.postId;
    if(!postId) {
      return;
    }
    let [info, comment] = await Promise.all([
      service.post.info(postId),
      service.post.comment(postId, 0, LIMIT)
    ]);
    comment.limit = LIMIT;
    await ctx.render('dpost2', {
      postId,
      info,
      comment,
    });
  }
}

module.exports = Controller;
