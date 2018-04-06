/**
 * Created by army8735 on 2018/4/4.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

const LIMIT = 10;

class Controller extends egg.Controller {
  async index() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let tag = await app.model.recommendTag.findAll({
      attributes: [
        'id',
        'name',
        'kind'
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
    let list = {};
    let kind;
    if(tag.length) {
      [banner, list, kind] = await Promise.all([
        service.find.banner(tag[0].id),
        service.find.list(tag[0].id, 0, LIMIT),
        service.find.kind(tag[0].kind, 0, LIMIT)
      ]);
      list.limit = LIMIT;
    }
    ctx.body = ctx.helper.okJSON({
      tag,
      banner,
      list,
      kind,
    });
  }
  async tag() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    if(!body.tag || !body.kind) {
      return;
    }
    let offset = body.offset || 0;
    offset = parseInt(offset) || 0;
    let banner;
    let list;
    let kind;
    if(body.kind && body.kind !== '0') {
      if(offset) {
        kind = await service.find.kind(kind, offset, LIMIT);
      }
      else {
        [banner, list, kind] = await Promise.all([
          service.find.banner(body.tag),
          service.find.list(body.tag, offset, LIMIT),
          service.find.kind(body.kind, offset, LIMIT)
        ]);
        list.limit = LIMIT;
        kind.limit = LIMIT;
      }
    }
    else {
      list = await service.find.list(body.tag, offset, LIMIT);
      list.limit = LIMIT;
    }
    ctx.body = ctx.helper.okJSON({
      banner,
      list,
      kind,
    });
  }
}

module.exports = Controller;
