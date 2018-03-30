/**
 * Created by army8735 on 2018/3/29.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = body.authorId;
    if(!authorId) {
      return;
    }
    let [info, aliases, outsides, worksList, comment] = await Promise.all([
      service.author.info(authorId),
      service.author.aliases(authorId),
      service.author.outsides(authorId),
      service.author.mainWorksList(authorId, 0, 10),
      service.author.comment(authorId, 0, 10)
    ]);
    worksList.take = 10;
    comment.take = 10;
    ctx.body = ctx.helper.okJSON({
      info,
      aliases,
      outsides,
      worksList,
      comment,
    });
  }
  async comment() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = body.authorId;
    if(!authorId) {
      return;
    }
    let res = await service.comment.comment(authorId, body.skip || 0, body.take || 10);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
