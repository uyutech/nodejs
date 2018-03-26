/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async comment() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = body.worksId;
    if(!worksId) {
      return;
    }
    let index = body.index || 0;
    let length = body.length || 10;
    let res = await service.works.comment(worksId, index, length);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
