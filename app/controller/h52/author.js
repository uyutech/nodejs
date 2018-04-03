/**
 * Created by army8735 on 2018/3/29.
 */

'use strict';

const egg = require('egg');

const limit = 10;

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = body.authorId;
    if(!authorId) {
      return;
    }
    let [
      info,
      isFollow,
      fansCount,
      aliases,
      outsides,
      mainWorks,
      musicAlbum,
      workKindList,
      comment
    ] = await Promise.all([
      service.author.info(authorId),
      service.author.isFollow(authorId, uid),
      service.author.fansCount(authorId),
      service.author.aliases(authorId),
      service.author.outsides(authorId),
      service.author.mainWorks(authorId, 0, limit),
      service.author.musicAlbum(authorId, 0, limit),
      service.author.workKindList(authorId),
      service.author.comment(authorId, 0, limit)
    ]);
    mainWorks.limit = limit;
    let kindWork;
    if(workKindList.length) {
      kindWork = await service.author.kindWork(authorId, workKindList[0].kind, 0, limit);
      kindWork.limit = limit;
    }
    comment.limit = limit;
    ctx.body = ctx.helper.okJSON({
      info,
      isFollow,
      fansCount,
      aliases,
      outsides,
      mainWorks,
      musicAlbum,
      workKindList,
      kindWork,
      comment,
    });
  }
  async comment() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = body.authorId;
    if(!authorId) {
      return;
    }
    let res = await service.author.comment(authorId, body.offset || 0, body.limit || limit);
    res.limit = limit;
    ctx.body = ctx.helper.okJSON(res);
  }
  async kindWork() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = body.authorId;
    let kind = body.kind;
    let offset = body.offset;
    let limit = body.limit;
    if(!authorId || kind === undefined) {
      return;
    }
    kind = parseInt(kind);
    if(isNaN(kind)) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || limit;
    if(offset < 0 || limit < 1) {
      return;
    }
    let kindWork = await service.author.kindWork(authorId, kind, offset, limit);
    kindWork.limit = 10;
    ctx.body = ctx.helper.okJSON(kindWork);
  }
  async follow() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = body.authorId;
    if(!authorId) {
      return;
    }
    let res = await service.author.follow(authorId, uid, true);
    ctx.body = ctx.helper.okJSON(res);
  }
  async unFollow() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = body.authorId;
    if(!authorId) {
      return;
    }
    let res = await service.author.follow(authorId, uid, false);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
