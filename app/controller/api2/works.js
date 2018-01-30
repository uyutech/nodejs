/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async commentList(ctx) {
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = body.worksId;console.log(111,body);
    if(!worksId) {
      return;
    }
    let index = body.index || 0;
    let length = body.length || 10;
    let res = await ctx.service.model.worksCommentData(worksId, {
      index,
      length,
    });console.log(222, res);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
