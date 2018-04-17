/**
 * Created by army8735 on 2018/4/16.
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
    let res = await service.mall.allProduct();
    ctx.body = ctx.helper.okJSON(res);
  }

  async prize() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let res = await service.mall.prize(uid);
    ctx.body = ctx.helper.okJSON(res);
  }

  async applyExpress() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.mall.applyExpress(id, uid);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res);
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async express() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let res = await service.mall.express(uid);
    ctx.body = ctx.helper.okJSON(res);
  }

  async cancelExpress() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.mall.cancelExpress(id, uid);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res);
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }
}

module.exports = Controller;
