/**
 * Created by army8735 on 2018/3/29.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;
const ALL_LIMIT = 40;
const SKILL_LIMIT = 6;

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let [
      info,
      isFollow,
      aliases,
      outside,
      skillWorks,
      cooperationList,
      workKindList,
      dynamicList,
      commentList
    ] = await Promise.all([
      service.author.infoPlusFans(id),
      service.author.isFollow(id, uid),
      service.author.aliases(id),
      service.author.outside(id),
      service.author.allSkillWorks(id, 6),
      service.author.cooperationList(id, 0, LIMIT),
      service.author.workKindList(id),
      service.author.dynamicList(id, uid, 0, LIMIT),
      service.author.commentList(id, uid, 0, LIMIT)
    ]);
    if(!info) {
      return;
    }
    skillWorks.forEach((item) => {
      if(item) {
        item.limit = SKILL_LIMIT;
      }
    });
    let kindWorkList;
    if(workKindList.length) {
      kindWorkList = await service.author.kindWorkList(id, uid, workKindList[0].kind, 0, LIMIT);
      kindWorkList.limit = LIMIT;
    }
    dynamicList.limit = LIMIT;
    commentList.limit = LIMIT;
    ctx.body = ctx.helper.okJSON({
      info,
      isFollow,
      aliases,
      outside,
      skillWorks,
      cooperationList,
      workKindList,
      kindWorkList,
      dynamicList,
      commentList,
    });
  }

  async skillWorks() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let skillId = parseInt(body.skillId);
    let offset = parseInt(body.offset) || 0;
    if(!id || !skillId) {
      return;
    }
    let worksList = await service.author.skillWorks(id, skillId, offset, SKILL_LIMIT);
    worksList.limit = SKILL_LIMIT;
    ctx.body = ctx.helper.okJSON(worksList);
  }

  async dynamicList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let offset = parseInt(body.offset) || 0;
    if(!id) {
      return;
    }
    let res = await service.author.dynamicList(id, uid, offset, LIMIT);
    if(!res) {
      return;
    }
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async commentList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let offset = parseInt(body.offset) || 0;
    if(!id) {
      return;
    }
    let res = await service.author.commentList(id, uid, offset, LIMIT);
    if(!res) {
      return;
    }
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async kindWorkList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let kind = parseInt(body.kind);
    let offset = parseInt(body.offset) || 0;
    if(!id || !kind) {
      return;
    }
    let res = await service.author.kindWorkList(id, uid, kind, offset, LIMIT);
    if(!res) {
      return;
    }
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async follow() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.author.follow(id, uid, true);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res.data);
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async unFollow() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.author.follow(id, uid, false);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res.data);
  }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async all() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let res = await service.author.all(0, ALL_LIMIT);
    if(!res) {
      return;
    }
    res.limit = ALL_LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async report() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let uid = ctx.session.uid;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    await service.author.report(id, uid);
    ctx.body = ctx.helper.okJSON();
  }

  async black() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.author.black(id, uid);
    if(res.success) {
      ctx.body = ctx.helper.okJSON();
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }
}

module.exports = Controller;
