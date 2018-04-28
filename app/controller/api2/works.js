/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Controller extends egg.Controller {
  async comment() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = body.worksId;
    if(!worksId) {
      return;
    }
    let offset = body.offset || 0;
    let limit = body.limit || 10;
    let res = await service.works.commentList(worksId, uid, offset, limit);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
