/**
 * Created by army8735 on 2018/3/29.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Controller extends egg.Controller {
  async comment() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = body.authorId;
    if(!authorId) {
      return;
    }
    let offset = body.offset || 0;
    let limit = body.limit || 10;
    let res = await service.author.comment(authorId, offset, limit);
    ctx.body = ctx.helper.okJSON(res);
  }
  async like() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let authorId = body.authorId;
    if(!authorId) {
      return;
    }
    if(!uid) {
      return ctx.body = ctx.helper.loginJSON();
    }
    let res = await service.author.like(authorId, uid, body.is === 'true');
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
    let authorId = body.authorId;
    if(!authorId) {
      return;
    }
    if(!uid) {
      return ctx.body = ctx.helper.loginJSON();
    }
    let res = await service.author.favor(authorId, uid, body.is === 'true');
    if(res) {
      ctx.body = ctx.helper.okJSON(res.is);
    }
    else {
      ctx.body = ctx.helper.errorJSON();
    }
  }
}

module.exports = Controller;
