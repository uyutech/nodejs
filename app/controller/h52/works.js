/**
 * Created by army8735 on 2018/3/26.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = body.worksId;
    if(!worksId) {
      return;
    }
    let [[info, professionSort], author, [collection, collectionAuthors], comment] = await Promise.all([
      service.works.infoAndTypeProfessionSort(worksId),
      service.works.author(worksId),
      service.works.collectionAndAuthors(worksId, uid),
      service.works.comment(worksId, 0, 10)
    ]);
    comment.take = 10;
    let authors = service.works.reorder(author, collectionAuthors, professionSort);
    ctx.body = ctx.helper.okJSON({
      info,
      collection,
      authors,
      comment,
    });
  }
  async comment() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = body.worksId;
    if(!worksId) {
      return;
    }
    let res = await service.works.comment(worksId, body.skip || 0, body.take || 10);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
