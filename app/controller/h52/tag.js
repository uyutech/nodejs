/**
 * Created by army8735 on 2018/4/10.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let tag = body.tag;
    if(!tag) {
      return;
    }
    let tagId = await service.tag.getIdByName(tag.trim());
    let postList = await service.tag.postList(tagId, uid, 0, LIMIT);
    postList.limit = LIMIT;
    ctx.body = ctx.helper.okJSON({
      postList,
    });
  }

  async postList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let tag = body.tag;
    if(!tag) {
      return;
    }
    let tagId = await service.tag.getIdByName(tag.trim());
    let postList = await service.tag.postList(tagId, uid, body.offset || 0, LIMIT);
    postList.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(postList);
  }
}

module.exports = Controller;
