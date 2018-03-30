/**
 * Created by army8735 on 2018/1/26.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let authorId = ctx.params.authorId;
    if(!authorId) {
      return;
    }
    let [info, aliases, outsides, comment] = await Promise.all([
      service.author.info(authorId),
      service.author.aliases(authorId),
      service.author.outsides(authorId),
      service.author.comment(authorId, 0, 10)
    ]);
    comment.take = 10;
    await ctx.render('dauthor2', {
      authorId,
      info,
      aliases,
      outsides,
      comment,
    });
  }
}

module.exports = Controller;
