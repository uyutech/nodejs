/**
 * Created by army8735 on 2018/7/9.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    await ctx.render('jsgm_home', {
    });
  }

  async detail() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    await ctx.render('jsgm_detail', {
    });
  }

  async works() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let list = await service.jsgm.works(0, 10);
    await ctx.render('jsgm_works', {
      list,
    });
  }

  async worksList() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let offset = parseInt(body.offset) || 0;
    let res = await service.jsgm.works(offset, 10);
    ctx.body = ctx.helper.okJSON(res);
  }

  async single() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let id = parseInt(ctx.params.id);
    if(!id) {
      return;
    }
    let works = await service.jsgm.single(id);
    await ctx.render('jsgm_single', {
      uid,
      works,
    });
  }

  async prize() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    await ctx.render('jsgm_prize', {
    });
  }

  async join() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    await ctx.render('jsgm_join', {
      nickname: ctx.session.nickname,
    });
  }

  async add() {
    const { ctx, service, app } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let name = body.name;
    let title = body.title;
    let inspiration = body.inspiration;
    let content = body.content;
    let relate = body.relate;
    let refer = body.refer;
    let history = body.history;
    if(!name || !title || !inspiration || !content) {
      return;
    }
    let res = await app.model.jsgm.create({
      user_id: uid,
      name,
      title,
      inspiration,
      content,
      relate,
      refer,
      history,
    }, {
      raw: true,
    });
    ctx.body = ctx.helper.okJSON(res);
  }

  async update() {
    const { ctx, service, app } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = body.id;
    let name = body.name;
    let title = body.title;
    let inspiration = body.inspiration;
    let content = body.content;
    let relate = body.relate;
    let refer = body.refer;
    let history = body.history;
    if(!id || !name || !title || !inspiration || !content) {
      return;
    }
    let check = await app.model.jsgm.findOne({
      attributes: [
        ['user_id', 'userId']
      ],
      where: {
        id,
      },
      raw: true,
    });
    if(check.userId !== uid) {
      return;
    }
    let res = await app.model.jsgm.update({
      name,
      title,
      inspiration,
      content,
      relate,
      refer,
      history,
      update_time: new Date(),
    }, {
      where: {
        id,
      },
      raw: true,
    });
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
