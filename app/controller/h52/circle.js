/**
 * Created by army8735 on 2018/4/2.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;
const ALL_LIMIT = 30;

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

  async all() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let res = await service.circle.all(body.offset || 0, ALL_LIMIT);
    ctx.body = ctx.helper.okJSON(res);
  }

  async follow() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    if(!body.circleId) {
      return;
    }
    let res = await service.circle.follow(body.circleId, uid, true);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res.data);
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async unFollow() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    if(!body.circleId) {
      return;
    }
    let res = await service.circle.follow(body.circleId, uid, false);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res.data);
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }
}

module.exports = Controller;
