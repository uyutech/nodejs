/**
 * Created by army8735 on 2018/4/3.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async post() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let res = await service.user.post(uid, body.offset || 0, body.limit || 10);
    res.limit = 10;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
