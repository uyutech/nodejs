/**
 * Created by army8735 on 2018/4/23.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async typeAll() {
    const { app, ctx } = this;
    let cacheKey = 'workTypeAll';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return ctx.body = ctx.helper.okJSON(JSON.parse(res));
    }
    res = await app.model.workType.findAll({
      attributes: [
        'id',
        'name'
      ],
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.longTime, JSON.stringify(res));
    ctx.body = ctx.helper.okJSON(JSON.parse(res));
  }

  async update() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let attributes = JSON.parse(body.attributes);
    if(!attributes) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3001,
        message: '缺少attributes',
      });
    }
    let kind = service.work.getKind(id);
    if(!kind) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3001,
        message: 'id不合法',
      });
    }
    return await service.work.update(id, attributes, kind);
  }

  async delete() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let kind = service.work.getKind(id);
    if(!kind) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let res = await service.work.delete(id, kind);
    if(res.success) {
      ctx.body = ctx.helper.okJSON();
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async unDelete() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let kind = service.work.getKind(id);
    if(!kind) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let res = await service.work.unDelete(id, kind);
    if(res.success) {
      ctx.body = ctx.helper.okJSON();
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async addAuthor() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let authorList = JSON.parse(body.authorList);
    if(!authorList) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3002,
        message: '缺少authorList',
      });
    }
    if(!Array.isArray(authorList)) {
      authorList = [authorList];
    }
    for(let i = 0, len = authorList.length; i < len; i++) {
      let item = authorList[i];
      if(!item.id) {
        return ctx.body = ctx.helper.errorJSON({
          code: 2106,
          message: '缺authorList.id',
        });
      }
      if(!item.professionId) {
        return ctx.body = ctx.helper.errorJSON({
          code: 2107,
          message: '缺authorList.professionId',
        });
      }
    }
    return await service.work.addAuthor(id, authorList);
  }

  async removeAuthor() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let authorList = JSON.parse(body.authorList);
    if(!authorList) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3002,
        message: '缺少authorList',
      });
    }
    if(!Array.isArray(authorList)) {
      authorList = [authorList];
    }
    for(let i = 0, len = authorList.length; i < len; i++) {
      let item = authorList[i];
      if(!item.id) {
        return ctx.body = ctx.helper.errorJSON({
          code: 2106,
          message: '缺authorList.id',
        });
      }
      if(!item.professionId) {
        return ctx.body = ctx.helper.errorJSON({
          code: 2107,
          message: '缺authorList.professionId',
        });
      }
    }
    return await service.work.removeAuthor(id, authorList);
  }

  async addViews() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    await service.work.incrementViews(id);
    ctx.body = ctx.helper.okJSON();
  }

  async relation() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let res = await service.work.relation(id);
    ctx.body = ctx.helper.okJSON(res);
  }

  async addRelation() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let targetId = parseInt(body.targetId);
    let type = parseInt(body.type);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    if(!targetId) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3003,
        message: 'targetId不合法',
      });
    }
    if(!type) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3004,
        message: 'type不合法',
      });
    }
    let res = await service.work.addRelation(id, targetId, type);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res.data);
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async removeRelation() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let targetId = parseInt(body.targetId);
    let type = parseInt(body.type);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    if(!targetId) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3003,
        message: 'targetId不合法',
      });
    }
    if(!type) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3004,
        message: 'type不合法',
      });
    }
    let res = await service.work.removeRelation(id, targetId, type);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res.data);
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }
}

module.exports = Controller;
