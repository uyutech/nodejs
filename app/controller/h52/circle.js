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
    let [info, comment] = await Promise.all([
      service.circle.info(circleId),
      service.circle.comment(circleId, 0, 10)
    ]);
    comment.take = 10;
    ctx.body = ctx.helper.okJSON({
      info,
      comment,
    });
  }
  async comment() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let circleId = body.circleId;
    if(!circleId) {
      return;
    }
    let res = await service.circle.comment(circleId, body.skip || 0, body.take || 10);
    res.take = 10;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
