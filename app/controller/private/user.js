/**
 * Created by army8735 on 2018/4/29.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

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
    let res = await service.user.listByName(name, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async increaseCoins() {
    const { app, ctx, service } = this;
    let body = ctx.request.body;
    let uid = parseInt(body.userId);
    let coins = parseInt(body.coins);
    if(!uid || uid < 0 || !coins || coins < 0) {
      return ctx.body = ctx.helper.errorJSON('参数不正确');
    }
    let res = await app.model.user.update({
      coins: Sequelize.literal('coins+' + coins),
    }, {
      where: {
        id: uid,
      },
    });
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
