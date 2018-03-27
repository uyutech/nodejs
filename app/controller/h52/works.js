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
    let [info, author, [collection, collectionAuthor], comment] = await Promise.all([
      service.works.info(worksId),
      service.works.author(worksId),
      service.works.collectionAndAuthor(worksId),
      service.works.comment(worksId, 0, 10)
    ]);
    comment.take = 10;
    ctx.body = ctx.helper.okJSON({
      info,
      author,
      collection,
      collectionAuthor,
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
