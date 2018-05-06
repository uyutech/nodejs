/**
 * Created by army8735 on 2018/4/23.
 */

'use strict';

const egg = require('egg');

const LIMIT = 30;

class Controller extends egg.Controller {
  async find() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let name = (body.name || '').trim();
    let offset = parseInt(body.offset) || 0;
    if(!name) {
      return ctx.body = ctx.helper.errorJSON('作者名不能为空');
    }
    let res = await service.author.listByName(name, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async create() {
    const { app, ctx } = this;
    let body = ctx.request.body;
    let name = (body.name || '').trim();
    let type = parseInt(body.type) || 0;
    if(!name) {
      return ctx.body = ctx.helper.errorJSON('作者名不能为空');
    }
    let last = await app.model.author.findOne({
      attributes: [
        'id'
      ],
      order: [
        ['id', 'DESC']
      ],
      limit: 1,
      raw: true,
    });
    let id = last.id + Math.floor(Math.random() * 3) + 1;
    let transaction = await app.sequelizeCircling.transaction();
    try {
      let query = [
        app.model.author.create({
          id,
          name,
          type,
        }, {
          transaction,
          raw: true,
        }),
        app.model.comment.create({
          content: id,
          user_id: 2018000000008222,
          is_delete: true,
          review: 3,
          root_id: 0,
          parent_id: 0,
        }, {
          transaction,
          raw: true,
        })
      ];
      let createList = await Promise.all(query);
      await app.model.authorCommentRelation.create({
        author_id: id,
        comment_id: createList[1].id,
      }, {
        transaction,
        raw: true,
      });
      await transaction.commit();
      ctx.body = ctx.helper.okJSON({
        data: createList[0],
      });
    }
    catch(e) {
      await transaction.rollback();
      return ctx.body = ctx.helper.errorJSON(e.toString());
    }
  }
}

module.exports = Controller;
