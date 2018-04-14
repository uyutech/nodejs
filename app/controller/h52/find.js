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
    let kindList;
    if(tag.length) {
      [banner, list, kindList] = await Promise.all([
        service.find.banner(tag[0].id),
        service.find.list(tag[0].id, 0, LIMIT),
        service.find.kindList(tag[0].kind, uid, 0, LIMIT)
      ]);
      list.limit = LIMIT;
    }
    ctx.body = ctx.helper.okJSON({
      tag,
      banner,
      list,
      kindList,
    });
  }
  async tag() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let tag = parseInt(body.tag);
    let kind = parseInt(body.kind);
    let offset = parseInt(body.offset);
    if(!tag) {
      return;
    }
    let banner = [];
    let list = {};
    let kindList;
    if(kind) {
      if(offset) {
        kindList = await service.find.kindList(kind, uid, offset, LIMIT);
      }
      else {
        [banner, list, kindList] = await Promise.all([
          service.find.banner(tag),
          service.find.list(tag, 0, LIMIT),
          service.find.kindList(kind, uid, 0, LIMIT)
        ]);
      }
    }
    else {
      [banner, list] = await Promise.all([
        service.find.banner(tag),
        service.find.list(tag, offset, LIMIT)
      ]);
    }
    list.limit = LIMIT;
    ctx.body = ctx.helper.okJSON({
      banner,
      list,
      kindList,
    });
  }
}

module.exports = Controller;
