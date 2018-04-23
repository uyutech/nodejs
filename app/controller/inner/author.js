/**
 * Created by army8735 on 2018/4/23.
 */

'use strict';

const egg = require('egg');

const LIMIT = 30;

class Controller extends egg.Controller {
  async find() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let keyword = body.keyword;
    if(!keyword) {
      return;
    }
    let res = await service.author.listByName(keyword, 0, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async create() {
    const { app } = this;
    let body = ctx.request.body;
    let name = (body.name || '').trim();
    let type = parseInt(body.type) || 0;
    if(!name) {
      return ctx.body = ctx.helper.errorJSON('作者名不能为空');
    }
    let transaction = await app.sequelizeCircling.transaction();
    try {
      let last = await app.model.author.findOne({
        transaction,
        attributes: [
          'id'
        ],
        order: [
          ['id', 'DESC']
        ],
        limit: 1,
        raw: true,
      });
      let id = last.id + Math.floor(Math.random() * 5) + 1;
      await app.model.author.create({
        id,
        name,
        type,
      }, {
        transaction,
        raw: true,
      });
      await transaction.commit();
      return ctx.body = ctx.helper.okJSON({
        data: id,
      });
    } catch(e) {
      await transaction.rollback();
      return ctx.body = ctx.helper.errorJSON(e.toString());
    }
  }
}

module.exports = Controller;
