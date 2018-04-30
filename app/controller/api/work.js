/**
 * Created by army8735 on 2018/4/29.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async addViews() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    service.work.incrementViews(id);
    ctx.body = ctx.helper.okJSON();
  }

  async report() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let uid = ctx.session.uid;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    await service.work.report(id, uid);
    ctx.body = ctx.helper.okJSON();
  }
}

module.exports = Controller;
