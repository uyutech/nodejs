/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

class Controller extends egg.Controller {
  async commentList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let offset = parseInt(body.offset) || 0;
    if(!id) {
      return;
    }
    let res = await service.works.commentList(id, uid, offset, LIMIT);
    if(!res) {
      return;
    }
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async like() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id) || 0;
    let workId = parseInt(body.workId);
    if(!workId) {
      return;
    }
    let res = await service.work.like(id, workId, uid, true);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unLike() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id) || 0;
    let workId = parseInt(body.workId);
    if(!workId) {
      return;
    }
    let res = await service.work.like(id, workId, uid, false);
    ctx.body = ctx.helper.okJSON(res);
  }

  async favor() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id) || 0;
    let workId = parseInt(body.workId);
    if(!workId) {
      return;
    }
    let res = await service.work.favor(id, workId, uid, true);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unFavor() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id) || 0;
    let workId = parseInt(body.workId);
    if(!workId) {
      return;
    }
    let res = await service.work.favor(id, workId, uid, false);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
