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
    let [info, followPersonCount, fansCount, isFollow, isFans, postList] = await Promise.all([
      service.user.info(userId),
      service.user.followPersonCount(userId),
      service.user.fansCount(userId),
      service.user.isFollow(userId, uid),
      service.user.isFans(userId, uid),
      service.user.postList(userId, 0, limit)
    ]);
    delete info.coins;
    postList.limit = limit;
    ctx.body = ctx.helper.okJSON({
      info,
      followPersonCount,
      fansCount,
      isFollow,
      isFans,
      postList,
    });
  }

  async postList() {
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
    let userId = parseInt(body.userId);
    if(!userId) {
      return;
    }
    if(uid === userId) {
      ctx.body = ctx.helper.errorJSON('不能关注自己');
    }
    let res = await service.user.follow(userId, uid, true);
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
    let userId = parseInt(body.userId);
    if(!userId) {
      return;
    }
    if(uid === userId) {
      ctx.body = ctx.helper.errorJSON('不能关注自己');
    }
    let res = await service.user.follow(userId, uid, false);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res.data);
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }
}

module.exports = Controller;
