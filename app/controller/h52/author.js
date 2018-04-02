/**
 * Created by army8735 on 2018/3/29.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = body.authorId;
    if(!authorId) {
      return;
    }
    let [info, aliases, outsides, mainWorks, musicAlbum, workKindList, comment] = await Promise.all([
      service.author.info(authorId),
      service.author.aliases(authorId),
      service.author.outsides(authorId),
      service.author.mainWorks(authorId, 0, 10),
      service.author.musicAlbum(authorId, 0, 10),
      service.author.workKindList(authorId),
      service.author.comment(authorId, 0, 10)
    ]);
    mainWorks.take = 10;
    let kindWork;
    if(workKindList.length) {
      kindWork = await service.author.kindWork(authorId, workKindList[0].kind, 0, 10);
      kindWork.take = 10;
    }
    comment.take = 10;
    ctx.body = ctx.helper.okJSON({
      info,
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
    let res = await service.comment.comment(authorId, body.skip || 0, body.take || 10);
    ctx.body = ctx.helper.okJSON(res);
  }
  async kindWork() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = body.authorId;
    let kind = body.kind;
    let skip = body.skip;
    let take = body.take;
    if(!authorId || kind === undefined) {
      return;
    }
    kind = parseInt(kind);
    if(isNaN(kind)) {
      return;
    }
    skip = parseInt(skip) || 0;
    take = parseInt(take) || 10;
    if(skip < 0 || take < 1) {
      return;
    }
    let kindWork = await service.author.kindWork(authorId, kind, skip, take);
    kindWork.take = 10;
    ctx.body = ctx.helper.okJSON(kindWork);
  }
}

module.exports = Controller;
