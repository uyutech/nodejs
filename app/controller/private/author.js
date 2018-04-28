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
    let name = (body.name || '').trim();
    let offset = parseInt(body.offset) || 0;
    if(!name) {
      return;
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
    let create = await app.model.author.create({
      id,
      name,
      type,
    }, {
      raw: true,
    });
    ctx.body = ctx.helper.okJSON({
      data: create,
    });
  }
}

module.exports = Controller;
