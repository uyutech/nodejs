/**
 * Created by army8735 on 2018/6/8.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async createContent() {
    const { app, ctx } = this;
    let body = ctx.request.body;
    let type = body.type;
    let targetId = body.targetId;
    let subId = body.subId;
    let label = body.label;
    let title = body.title;
    let cover = body.cover;
    let describe = body.describe;
    let tag = body.tag;
    let weight = body.weight;
    let createTime = body.createTime;
    let updateTime = body.updateTime;
    if(!targetId) {
      return ctx.body = ctx.helper.errorJSON('targetId不能为空');
    }
    if(tag) {
      tag = JSON.parse(tag);
    }
    let res = await app.model.content.create({
      type,
      target_id: targetId,
      sub_id: subId,
      label,
      title,
      cover,
      describe,
      tag,
      weight,
      create_time: createTime,
      update_time: updateTime
    }, {
      raw: true,
    });
    ctx.body = ctx.helper.okJSON(res);
  }

  async deleteContent() {
    const { app, ctx } = this;
    let body = ctx.request.body;
    let id = body.id;
    if(!id) {
      return ctx.body = ctx.helper.errorJSON('id不能为空');
    }
    await app.model.content.update({
      is_delete: true,
    }, {
      where: {
        id,
      },
    });
    ctx.body = ctx.helper.okJSON();
  }
}

module.exports = Controller;
