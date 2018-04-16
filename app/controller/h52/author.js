/**
 * Created by army8735 on 2018/3/29.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;
const ALL_LIMIT = 40;

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = parseInt(body.authorId);
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
      dynamicList,
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
      service.author.dynamicList(authorId, uid, 0, LIMIT),
      service.author.commentList(authorId, uid, 0, LIMIT)
    ]);
    mainWorks.limit = LIMIT;
    let kindWorkList;
    if(workKindList.length) {
      kindWorkList = await service.author.kindWorkList(authorId, uid, workKindList[0].kind, 0, LIMIT);
      kindWorkList.limit = LIMIT;
    }
    dynamicList.limit = LIMIT;
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
      kindWorkList,
      dynamicList,
      commentList,
    });
  }

  async dynamicList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = parseInt(body.authorId);
    let offset = parseInt(body.offset) || 0;
    if(!authorId) {
      return;
    }
    let res = await service.author.commentList(authorId, uid, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async commentList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = parseInt(body.authorId);
    let offset = parseInt(body.offset) || 0;
    if(!authorId) {
      return;
    }
    let res = await service.author.dynamicList(authorId, uid, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async kindWorkList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = parseInt(body.authorId);
    let kind = parseInt(body.kind);
    let offset = parseInt(body.offset) || 0;
    if(!authorId || !kind) {
      return;
    }
    let kindWorkList = await service.author.kindWorkList(authorId, uid, kind, offset, LIMIT);
    kindWorkList.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(kindWorkList);
  }

  async follow() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = parseInt(body.authorId);
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
    let authorId = parseInt(body.authorId);
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

  async all() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let res = await service.author.all(0, ALL_LIMIT);
    res.limit = ALL_LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
