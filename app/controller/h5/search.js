/**
 * Created by army8735 on 2018/4/10.
 */

'use strict';

const egg = require('egg');

const LIMIT = 30;

const LIMIT_TAG = 60;

class Controller extends egg.Controller {
  async author() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let keyword = body.keyword;
    let offset = parseInt(body.offset) || 0;
    if(keyword) {
      let res = await service.author.listByName(keyword, offset, LIMIT);
      res.limit = LIMIT;
      ctx.body = ctx.helper.okJSON(res);
    }
    else {
      let res = await service.author.allSettle(offset, LIMIT);
      res.limit = LIMIT;
      ctx.body = ctx.helper.okJSON(res);
    }
  }

  async user() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let keyword = body.keyword;
    let offset = parseInt(body.offset) || 0;
    if(!keyword) {
      return;
    }
    let res = await service.user.listByName(keyword, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async works() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let keyword = body.keyword;
    let offset = parseInt(body.offset) || 0;
    if(keyword) {
      let res = await service.works.listByName(keyword, offset, LIMIT);
      res.limit = LIMIT;
      ctx.body = ctx.helper.okJSON(res);
    }
    else {
      let res = await service.works.newest(keyword, offset, LIMIT);
      res.limit = LIMIT;
      ctx.body = ctx.helper.okJSON(res);
    }
  }

  async tag() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let keyword = body.keyword;
    let offset = parseInt(body.offset) || 0;
    if(keyword) {
      let res = await service.tag.listByName(keyword, offset, LIMIT_TAG);
      res.limit = LIMIT_TAG;
      ctx.body = ctx.helper.okJSON(res);
    }
    else {
      let res = await service.tag.all(offset, LIMIT_TAG);
      res.limit = LIMIT_TAG;
      ctx.body = ctx.helper.okJSON(res);
    }
  }

  async circle() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let keyword = body.keyword;
    let offset = parseInt(body.offset) || 0;
    if(keyword) {
      let res = await service.circle.listByName(keyword, offset, LIMIT_TAG);
      res.limit = LIMIT_TAG;
      ctx.body = ctx.helper.okJSON(res);
    }
    else {
      let res = await service.circle.all(offset, LIMIT_TAG);
      res.limit = LIMIT_TAG;
      ctx.body = ctx.helper.okJSON(res);
    }
  }
}

module.exports = Controller;
