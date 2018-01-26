/**
 * Created by army8735 on 2018/1/26.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index(ctx) {
    const model = ctx.model;
    let uid = ctx.session.uid;
    let authorId = ctx.params.authorId;
    if(!authorId) {
      return;
    }
    let [author, authorOutside] = await Promise.all([
      model.author.findOne({
        attributes: {
          exclude: ['state', 'type', 'create_time', 'update_time'],
        },
        where: {
          id: authorId,
          state: 1,
        },
      }),
      model.authorOutside.findAll({
        attributes: {
          exclude: ['id', 'author_id', 'state', 'create_time', 'update_time'],
        },
        where: {
          author_id: authorId,
          state: 1,
        },
      })
    ]);
    ctx.body = {
      author,
      authorOutside,
    };
  }
}

module.exports = Controller;
