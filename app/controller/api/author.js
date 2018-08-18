/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

class Controller extends egg.Controller {
  async suggest() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let name = (body.name || '').trim();
    let offset = parseInt(body.offset) || 0;
    if(!name) {
      return ctx.body = ctx.helper.errorJSON('作者名不能为空');
    }
    let res = await service.author.listByName(name, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
