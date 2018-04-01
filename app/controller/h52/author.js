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
    let [info, aliases, outsides, mainWorksList, musicAlbumList, workKindList, comment] = await Promise.all([
      service.author.info(authorId),
      service.author.aliases(authorId),
      service.author.outsides(authorId),
      service.author.mainWorksList(authorId, 0, 10),
      service.author.musicAlbumList(authorId, 0, 10),
      service.author.workKindList(authorId),
      service.author.comment(authorId, 0, 10)
    ]);
    mainWorksList.take = 10;
    let kindWorkList;
    if(workKindList.length) {
      kindWorkList = await service.author.kindWork(authorId, workKindList[0].kind, 0, 10);
      kindWorkList.take = 10;
    }
    comment.take = 10;
    ctx.body = ctx.helper.okJSON({
      info,
      aliases,
      outsides,
      mainWorksList,
      musicAlbumList,
      workKindList,
      kindWorkList,
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
  async classWork() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = body.authorId;
    let klass = body.klass;
    let skip = body.skip;
    let take = body.take;
    if(!authorId || klass === null || klass === undefined) {
      return;
    }
    skip = parseInt(skip) || 0;
    take = parseInt(take) || 10;
    if(skip < 0 || take < 1) {
      return;
    }
    let classWorks = await service.author.classWork(authorId, klass, skip, take);
    classWorks.take = 10;
    ctx.body = ctx.helper.okJSON(classWorks);
  }
}

module.exports = Controller;
