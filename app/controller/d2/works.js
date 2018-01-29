/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index(ctx) {
    const model = ctx.model;
    let uid = ctx.session.uid;
    let worksId = ctx.params.worksId;
    let workId = ctx.params.workId;
    if(!worksId) {
      return;
    }
    let [worksInfo, worksWorkList, worksCommentData] = await Promise.all([
      ctx.service.model.worksInfo(worksId),
      ctx.service.model.worksWorkList(worksId),
      ctx.service.model.worksCommentData(worksId)
    ]);
    await ctx.render('dworks2', {
      worksId,
      workId,
      worksInfo,
      worksWorkList,
      worksCommentData,
    });
  }
}

module.exports = Controller;
