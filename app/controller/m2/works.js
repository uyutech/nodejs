/**
 * Created by army8735 on 2018/4/23.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let worksId = parseInt(ctx.params.worksId);
    let workId = parseInt(ctx.params.workId);
    if(!worksId) {
      return;
    }
    let [info, collection, commentList] = await Promise.all([
      service.works.infoPlusAllAuthor(worksId),
      service.works.collectionFull(worksId, uid),
      service.works.commentList(worksId, uid, 0, LIMIT)
    ]);
    if(!info || info.state === 3) {
      return;
    }
    commentList.limit = LIMIT;
    await ctx.render('mworks2', {
      worksId,
      workId,
      info,
      collection,
      commentList,
    });
  }
}

module.exports = Controller;
