/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let worksId = ctx.params.worksId;
    if(!worksId) {
      return;
    }
    let [[info, professionSort], authorList, collection, comment] = await Promise.all([
      service.works.infoAndTypeProfessionSort(worksId),
      service.works.author(worksId),
      service.works.collection(worksId, uid),
      service.works.comment(worksId, 0, LIMIT)
    ]);
    comment.limit = LIMIT;
    authorList = service.works.reorderAuthor(authorList, professionSort);
    await ctx.render('dworks2', {
      worksId,
      info,
      collection,
      authorList,
      comment,
    });
  }
}

module.exports = Controller;
