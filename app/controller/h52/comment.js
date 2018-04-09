/**
 * Created by army8735 on 2018/4/7.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async like() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let commentId = body.commentId;
    if(!commentId) {
      return;
    }
    let res = await service.comment.operate(commentId, uid, 1, true);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unLike() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let commentId = body.commentId;
    if(!commentId) {
      return;
    }
    let res = await service.comment.operate(commentId, uid, 1, false);
    ctx.body = ctx.helper.okJSON(res);
  }

  async favor() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let commentId = body.commentId;
    if(!commentId) {
      return;
    }
    let res = await service.comment.operate(commentId, uid, 2, true);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unFavor() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let commentId = body.commentId;
    if(!commentId) {
      return;
    }
    let res = await service.comment.operate(commentId, uid, 2, false);
    ctx.body = ctx.helper.okJSON(res);
  }

  async sub() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let content = body.content;
    if(!body.id || !body.type) {
      return;
    }
    if(!content || content.length < 3) {
      return ctx.body = ctx.helper.errorJSON({
        message: '字数不能少于3个字哦~',
      });
    }
    if(content.length > 2048) {
      return ctx.body = ctx.helper.errorJSON({
        message: '字数不能多于2048个字哦~',
      });
    }
    let commentId = body.id;
    if(body.type === '3') {
      commentId = await service.works.commentId(commentId);
    }
    else if(body.type === '2') {
      commentId = await service.author.commentId(commentId);
    }
    let res = await service.comment.add(uid, commentId, {
      content,
      authorId: body.authorId,
      pid: body.pid,
    });
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
