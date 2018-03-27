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
    let [[info, authorSort], author, [collection, collectionAuthor], comment] = await Promise.all([
      service.works.infoAndAuthorSort(worksId),
      service.works.author(worksId),
      service.works.collectionAndAuthor(worksId),
      service.works.comment(worksId, 0, 10)
    ]);
    comment.take = 10;
    let authors = service.works.reorder(author, collectionAuthor, authorSort);
    await ctx.render('dworks2', {
      worksId,
      workId,
      info,
      collection,
      authors,
      comment,
    });
  }
}

module.exports = Controller;
