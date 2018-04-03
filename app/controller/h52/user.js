/**
 * Created by army8735 on 2018/4/3.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let userId = body.userId;
    if(!userId) {
      return;
    }
    let [info, post] = await Promise.all([
      service.user.info(userId),
      service.user.post(userId, 0, 10)
    ]);
    post.limit = 10;
    ctx.body = ctx.helper.okJSON({
      info,
      post,
    });
  }
  async post() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let userId = body.userId;
    if(!userId) {
      return;
    }
    let res = await service.user.post(userId, body.offset || 0, body.limit || 10);
    res.limit = 10;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
