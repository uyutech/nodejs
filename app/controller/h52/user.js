/**
 * Created by army8735 on 2018/4/3.
 */

'use strict';

const egg = require('egg');

const limit = 10;

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let userId = body.userId;
    if(!userId) {
      return;
    }
    let [info, followCount, fansCount, isFollow, isFans, post] = await Promise.all([
      service.user.info(userId),
      service.user.followCount(userId),
      service.user.fansCount(userId),
      service.user.isFollow(userId, uid),
      service.user.isFans(userId, uid),
      service.user.post(userId, 0, limit)
    ]);
    post.limit = limit;
    ctx.body = ctx.helper.okJSON({
      info,
      followCount,
      fansCount,
      isFollow,
      isFans,
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
    let res = await service.user.post(userId, body.offset || 0, body.limit || limit);
    res.limit = limit;
    ctx.body = ctx.helper.okJSON(res);
  }
  async follow() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let userId = body.userId;
    if(!userId) {
      return;
    }
    let res = await service.user.follow(userId, uid, true);
    ctx.body = ctx.helper.okJSON(res);
  }
  async unFollow() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let userId = body.userId;
    if(!userId) {
      return;
    }
    let res = await service.user.follow(userId, uid, false);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
