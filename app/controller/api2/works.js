/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Controller extends egg.Controller {
  async comment() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = body.worksId;
    if(!worksId) {
      return;
    }
    let offset = body.offset || 0;
    let limit = body.limit || 10;
    let res = await service.works.comment(worksId, offset, limit);
    ctx.body = ctx.helper.okJSON(res);
  }
  async like() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = body.worksId;
    let workId = body.workId;
    if(!worksId || !workId) {
      return;
    }
    if(!uid) {
      return ctx.body = ctx.helper.loginJSON();
    }
    let res = await service.work.like(worksId, workId, uid, body.is === 'true');
    if(res) {
      ctx.body = ctx.helper.okJSON(res.is);
    }
    else {
      ctx.body = ctx.helper.errorJSON();
    }
  }
  async favor() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksId = body.worksId;
    let workId = body.workId;
    if(!worksId || !workId) {
      return;
    }
    if(!uid) {
      return ctx.body = ctx.helper.loginJSON();
    }
    let res = await service.work.favor(worksId, workId, uid, body.is === 'true');
    if(res) {
      ctx.body = ctx.helper.okJSON(res.is);
    }
    else {
      ctx.body = ctx.helper.errorJSON();
    }
  }
}

module.exports = Controller;
