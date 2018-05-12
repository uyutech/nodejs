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
    let id = await service.tag.idByName(tag.trim());
    if(!id) {
      return;
    }
    let postList = await service.tag.postList(id, uid, 0, LIMIT);
    if(!postList) {
      return;
    }
    postList.limit = LIMIT;
    ctx.body = ctx.helper.okJSON({
      id,
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
    let offset = parseInt(body.offset) || 0;
    let tagId = await service.tag.idByName(tag.trim());
    let res = await service.tag.postList(tagId, uid, offset, LIMIT);
    if(!res) {
      return;
    }
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
