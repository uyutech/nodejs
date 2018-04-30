/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let id = ctx.params.id;
    if(!id) {
      return;
    }
    let [info, commentList] = await Promise.all([
      service.post.info(id, uid),
      service.post.commentList(id, uid, 0, LIMIT)
    ]);
    commentList.limit = LIMIT;
    await ctx.render('dpost', {
      id,
      info,
      commentList,
    });
  }
}

module.exports = Controller;
