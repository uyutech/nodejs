/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let worksId = ctx.params.worksId;
    let workId = ctx.params.workId;
    if(!worksId) {
      return;
    }
    let [info, collection, comment] = await Promise.all([
      service.works.info(worksId),
      service.works.collection(worksId),
      service.works.comment(worksId, 0, 10)
    ]);
    await ctx.render('dworks2', {
      worksId,
      workId,
      info,
      collection,
      comment,
    });
  }
}

module.exports = Controller;
