/**
 * Created by army8735 on 2018/4/17.
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
}

module.exports = Controller;
