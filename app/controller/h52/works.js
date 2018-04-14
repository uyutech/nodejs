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
    let [[info, professionSort], author, [collection, collectionAuthor], commentList] = await Promise.all([
      service.works.infoAndProfessionSort(worksId),
      service.works.author(worksId),
      service.works.collectionAndAuthor(worksId, uid),
      service.works.commentList(worksId, uid, 0, LIMIT)
    ]);
    commentList.limit = LIMIT;
    collectionAuthor.forEach((item) => {
      author = author.concat(item);
    });
    author = service.works.reorderAuthor(author, professionSort);
    ctx.body = ctx.helper.okJSON({
      info,
      collection,
      author,
      commentList,
    });
  }

  async commentList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = parseInt(body.worksId);
    let offset = parseInt(body.offset);
    if(!worksId) {
      return;
    }
    let res = await service.works.commentList(worksId, uid, offset || 0, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async like() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = parseInt(body.worksId);
    let workId = parseInt(body.workId);
    if(!worksId || !workId) {
      return;
    }
    let res = await service.work.like(worksId, workId, uid, true);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unLike() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = parseInt(body.worksId);
    let workId = parseInt(body.workId);
    if(!worksId || !workId) {
      return;
    }
    let res = await service.work.like(worksId, workId, uid, false);
    ctx.body = ctx.helper.okJSON(res);
  }

  async favor() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = parseInt(body.worksId);
    let workId = parseInt(body.workId);
    if(!worksId || !workId) {
      return;
    }
    let res = await service.work.favor(worksId, workId, uid, true);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unFavor() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = parseInt(body.worksId);
    let workId = parseInt(body.workId);
    if(!worksId || !workId) {
      return;
    }
    let res = await service.work.favor(worksId, workId, uid, false);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
