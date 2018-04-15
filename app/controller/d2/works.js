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
    let [[info, professionSort], author, [collection, collectionAuthor], commentList] = await Promise.all([
      service.works.infoAndProfessionSort(worksId),
      service.works.author(worksId),
      service.works.collectionAndAuthor(worksId, uid),
      service.works.commentList(worksId, uid, 0, LIMIT)
    ]);
    commentList.limit = LIMIT;
    collectionAuthor.forEach((item) => {
      author = author.concat(item);
    });
    author = service.works.reorderAuthor(author, professionSort);
    await ctx.render('dworks2', {
      worksId,
      info,
      collection,
      author,
      commentList,
    });
  }
}

module.exports = Controller;
