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
    let cacheKey = 'allTag';
    let tag = await app.redis.get(cacheKey);
    if(tag) {
      app.redis.expire(cacheKey, 300);
      tag = JSON.parse(tag);
    }
    else {
      tag = await app.model.findTag.findAll({
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
      app.redis.setex(cacheKey, 300, JSON.stringify(tag));
    }
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
    banner.unshift({
      link: 'https://show.bilibili.com/platform/detail.html?id=12757&from=pc',
      url: '//zhuanquan.xin/img/80ee3e9751dfdf071235a69b82e400cd.jpg',
    });
    ctx.body = ctx.helper.okJSON({
      tag,
      banner,
      list,
      kindList,
    });
  }

  async tag() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let tag = parseInt(body.tag);
    let kind = parseInt(body.kind);
    let offset = parseInt(body.offset) || 0;
    if(!tag) {
      return;
    }
    let banner = [];
    let list = {};
    let kindList = {};
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
    kindList.limit = LIMIT;
    ctx.body = ctx.helper.okJSON({
      banner,
      list,
      kindList,
    });
  }
}

module.exports = Controller;
