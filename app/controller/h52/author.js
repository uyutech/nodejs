/**
 * Created by army8735 on 2018/3/29.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

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
      commentList
    ] = await Promise.all([
      service.author.info(authorId),
      service.author.isFollow(authorId, uid),
      service.author.fansCount(authorId),
      service.author.aliases(authorId),
      service.author.outsides(authorId),
      service.author.mainWorks(authorId, 0, LIMIT),
      service.author.musicAlbum(authorId, 0, LIMIT),
      service.author.workKindList(authorId),
      service.author.commentList(authorId, uid, 0, LIMIT)
    ]);
    mainWorks.limit = LIMIT;
    let kindWork;
    if(workKindList.length) {
      kindWork = await service.author.kindWork(authorId, workKindList[0].kind, 0, LIMIT);
      kindWork.limit = LIMIT;
    }
    commentList.limit = LIMIT;
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
      commentList,
    });
  }

  async commentList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = body.authorId;
    if(!authorId) {
      return;
    }
    let res = await service.author.commentList(authorId, uid, body.offset || 0, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async kindWork() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = body.authorId;
    let kind = body.kind;
    let offset = body.offset;
    if(!authorId || kind === undefined) {
      return;
    }
    kind = parseInt(kind);
    if(isNaN(kind)) {
      return;
    }
    offset = parseInt(offset) || 0;
    if(offset < 0) {
      return;
    }
    let kindWork = await service.author.kindWork(authorId, kind, offset, LIMIT);
    kindWork.limit = LIMIT;
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
    let authorId = body.authorId;
    if(!authorId) {
      return;
    }
    let res = await service.author.follow(authorId, uid, false);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res.data);
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }
}

module.exports = Controller;
