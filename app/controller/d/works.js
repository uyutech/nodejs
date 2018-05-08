/**
 * Created by army8735 on 2017/10/6.
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
    if(!info || info.isDelete || info.state === 3) {
      return;
    }
    commentList.limit = LIMIT;
    await ctx.render('dworks', {
      worksId,
      workId,
      info,
      collection,
      commentList,
    });
  }
}

module.exports = Controller;
