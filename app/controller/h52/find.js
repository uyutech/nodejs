/**
 * Created by army8735 on 2018/4/4.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

const limit = 10;

class Controller extends egg.Controller {
  async index() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let tag = await app.model.recommendTag.findAll({
      attributes: [
        'id',
        'name'
      ],
      where: {
        is_delete: false,
      },
      order: [
        ['weight', 'DESC']
      ],
      raw: true,
    });
    let banner = [];
    let list = [];
    if(tag.length) {
      [banner, list] = await Promise.all([
        service.find.banner(tag[0].id),
        service.find.list(tag[0].id, 0, limit)
      ]);
    }
    ctx.body = ctx.helper.okJSON({
      tag,
      banner,
      list,
      limit,
    });
  }
  async tag() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    if(!body.tag) {
      return;
    }
    let [banner, list] = await service.find.data(body.tag);
    ctx.body = ctx.helper.okJSON({
      banner,
      list,
    });
  }
}

module.exports = Controller;
