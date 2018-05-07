/**
 * Created by army8735 on 2018/5/7.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async like() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let userId = parseInt(body.userId);
    let id = parseInt(body.id);
    if(!id || !userId) {
      return;
    }
    let res = await service.comment.operate(id, userId, 1, true);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unLike() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let userId = parseInt(body.userId);
    let id = parseInt(body.id);
    if(!id || !userId) {
      return;
    }
    let res = await service.comment.operate(id, userId, 1, false);
    ctx.body = ctx.helper.okJSON(res);
  }

  async favor() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let userId = parseInt(body.userId);
    let id = parseInt(body.id);
    if(!id || !userId) {
      return;
    }
    let res = await service.comment.operate(id, userId, 2, true);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unFavor() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let userId = parseInt(body.userId);
    let id = parseInt(body.id);
    if(!id || !userId) {
      return;
    }
    let res = await service.comment.operate(id, userId, 2, false);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
