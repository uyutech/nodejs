/**
 * Created by army8735 on 2018/3/26.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = body.worksId;
    if(!worksId) {
      return;
    }
    let [[info, professionSort], authorList, collection, comment] = await Promise.all([
      service.works.infoAndTypeProfessionSort(worksId),
      service.works.authorList(worksId),
      service.works.collection(worksId, uid),
      service.works.comment(worksId, 0, 10)
    ]);
    comment.limit = 10;
    authorList = service.works.reorderAuthor(authorList, professionSort);
    ctx.body = ctx.helper.okJSON({
      info,
      collection,
      authorList,
      comment,
    });
  }
  async comment() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = body.worksId;
    if(!worksId) {
      return;
    }
    let res = await service.works.comment(worksId, body.offset || 0, body.limit || 10);
    res.limit = 10;
    ctx.body = ctx.helper.okJSON(res);
  }
  async like() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = body.worksId;
    let workId = body.workId;
    let kind = body.kind;
    let state = body.state === 'true';
    if(!worksId || !workId || !kind) {
      return;
    }
    let res = await service.work.like(uid, worksId, workId, kind, state);
    ctx.body = ctx.helper.okJSON(res);
  }
  async favor() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = body.worksId;
    let workId = body.workId;
    let kind = body.kind;
    let state = body.state === 'true';
    if(!worksId || !workId || !kind) {
      return;
    }
    let res = await service.work.favor(uid, worksId, workId, kind, state);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
