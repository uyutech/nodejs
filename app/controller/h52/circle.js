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
    let circleId = body.circleId;
    if(!circleId) {
      return;
    }
    let [info, post] = await Promise.all([
      service.circle.info(circleId),
      service.circle.post(circleId, 0, 10)
    ]);
    comment.limit = 10;
    ctx.body = ctx.helper.okJSON({
      info,
      post,
    });
  }
  async post() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let circleId = body.circleId;
    if(!circleId) {
      return;
    }
    let res = await service.circle.post(circleId, body.offset || 0, body.limit || 10);
    res.limit = 10;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
