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
    if(!worksId) {
      return;
    }
    let [[info, professionSort], authorList, collection, comment] = await Promise.all([
      service.works.infoAndTypeProfessionSort(worksId),
      service.works.authorList(worksId),
      service.works.collection(worksId, uid),
      service.works.comment(worksId, 0, 10)
    ]);
    comment.take = 10;
    authorList = service.works.reorder(authorList, professionSort);
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
