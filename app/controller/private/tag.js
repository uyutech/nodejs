/**
 * Created by army8735 on 2018/6/8.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async create() {
    const { app, ctx } = this;
    let body = ctx.request.body;
    let name = body.name;
    if(!name) {
      return ctx.body = ctx.helper.errorJSON('name不能为空');
    }
    let exist = await app.model.tag.findOne({
      attributes: [
        'id'
      ],
      where: {
        name,
      },
      raw: true,
    });
    if(exist) {
      return ctx.body = ctx.helper.errorJSON('标签已存在');
    }
    let res = await app.model.tag.create({
      name,
    }, {
      raw: true,
    });
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
