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
    let circleId = body.circleId;
    if(!circleId) {
      return;
    }
    let [info, isFollow, fansCount, postList] = await Promise.all([
      service.circle.info(circleId),
      service.circle.isFollow(circleId, uid),
      service.circle.fansCount(circleId),
      service.circle.postList(circleId, uid, 0, LIMIT)
    ]);
    postList.limit = LIMIT;
    ctx.body = ctx.helper.okJSON({
      info,
      isFollow,
      fansCount,
      postList,
    });
  }

  async postList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let circleId = body.circleId;
    if(!circleId) {
      return;
    }
    let res = await service.circle.postList(circleId, uid, body.offset || 0, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async all() {}
}

module.exports = Controller;
