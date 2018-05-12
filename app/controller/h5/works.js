/**
 * Created by army8735 on 2018/3/26.
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
    let [info, collection, commentList] = await Promise.all([
      service.works.infoPlusAllAuthor(id),
      service.works.collectionFull(id, uid),
      service.works.commentList(id, uid, 0, LIMIT)
    ]);
    if(!info || info.isDelete || info.state === 3) {
      return;
    }
    commentList.limit = LIMIT;
    ctx.body = ctx.helper.okJSON({
      info,
      collection,
      commentList,
    });
  }

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
