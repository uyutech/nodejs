/**
 * Created by army8735 on 2018/7/27.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let res = await service.worksType.allArticleType();
    ctx.body = ctx.helper.okJSON(res);
  }

  async worksType() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.worksType.includeWorkType(id);
    ctx.body = ctx.helper.okJSON(res);
  }

  async profession() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let idList = body.idList;
    if(!idList || !idList.length) {
      return ctx.body = ctx.helper.okJSON();
    }
    let res = await service.workType.professionList(idList);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
