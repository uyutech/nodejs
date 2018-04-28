/**
 * Created by army8735 on 2018/3/29.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

class Controller extends egg.Controller {
  async comment() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = body.authorId;
    if(!authorId) {
      return;
    }
    let offset = body.offset || 0;
    let res = await service.author.comment(authorId, offset, LIMIT);
    res.LIMIT = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
