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
    let worksId = parseInt(body.worksId);
    if(!worksId) {
      return;
    }
    let [info, collection, commentList] = await Promise.all([
      service.works.infoPlusAllAuthor(worksId),
      service.works.collectionCount(worksId, uid),
      service.works.commentList(worksId, uid, 0, LIMIT)
    ]);
    if(info.state === 3) {
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
    let worksId = parseInt(body.worksId);
    let offset = parseInt(body.offset) || 0;
    if(!worksId) {
      return;
    }
    let res = await service.works.commentList(worksId, uid, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async like() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = parseInt(body.worksId) || 0;
    let workId = parseInt(body.workId);
    if(!workId) {
      return;
    }
    let res = await service.work.like(worksId, workId, uid, true);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unLike() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = parseInt(body.worksId) || 0;
    let workId = parseInt(body.workId);
    if(!workId) {
      return;
    }
    let res = await service.work.like(worksId, workId, uid, false);
    ctx.body = ctx.helper.okJSON(res);
  }

  async favor() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = parseInt(body.worksId) || 0;
    let workId = parseInt(body.workId);
    if(!workId) {
      return;
    }
    let res = await service.work.favor(worksId, workId, uid, true);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unFavor() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = parseInt(body.worksId) || 0;
    let workId = parseInt(body.workId);
    if(!workId) {
      return;
    }
    let res = await service.work.favor(worksId, workId, uid, false);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
