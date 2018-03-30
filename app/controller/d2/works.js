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
    let [[info, professionSort], authors, [collection, collectionAuthors], comment] = await Promise.all([
      service.works.infoAndTypeProfessionSort(worksId),
      service.works.authors(worksId),
      service.works.collectionAndAuthors(worksId, uid),
      service.works.comment(worksId, 0, 10)
    ]);
    comment.take = 10;
    authors = service.works.reorder(authors, collectionAuthors, professionSort);
    await ctx.render('dworks2', {
      worksId,
      info,
      collection,
      authors,
      comment,
    });
  }
}

module.exports = Controller;
