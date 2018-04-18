/**
 * Created by army8735 on 2018/4/3.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let [info, followPersonCount, fansCount, isFollow, isFans, postList] = await Promise.all([
      service.user.info(id),
      service.user.followPersonCount(id),
      service.user.fansCount(id),
      service.user.isFollow(id, uid),
      service.user.isFans(id, uid),
      service.user.postList(id, uid, 0, LIMIT)
    ]);
    delete info.coins;
    postList.limit = LIMIT;
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
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let offset = parseInt(body.offset) || 0;
    let res = await service.user.postList(id, uid, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async follow() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    if(uid === id) {
      ctx.body = ctx.helper.errorJSON('不能关注自己');
    }
    let res = await service.user.follow(id, uid, true);
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
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    if(uid === id) {
      ctx.body = ctx.helper.errorJSON('不能关注自己');
    }
    let res = await service.user.follow(id, uid, false);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res.data);
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async report() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let uid = ctx.session.uid;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    await service.user.report(id, uid);
    ctx.body = ctx.helper.okJSON();
  }

  async black() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.user.black(id, uid);
    if(res.success) {
      ctx.body = ctx.helper.okJSON();
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }
}

module.exports = Controller;
