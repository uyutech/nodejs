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
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.comment.operate(id, uid, 1, true);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unLike() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.comment.operate(id, uid, 1, false);
    ctx.body = ctx.helper.okJSON(res);
  }

  async favor() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.comment.operate(id, uid, 2, true);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unFavor() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.comment.operate(id, uid, 2, false);
    ctx.body = ctx.helper.okJSON(res);
  }

  async sub() {
    const { ctx, service, app } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let content = body.content;
    let id = parseInt(body.id);
    let type = parseInt(body.type);
    if(!id || !type) {
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
    let rid = id;
    let pid = parseInt(body.pid);
    // 回复作品
    if(type === 2) {
      rid = await service.works.commentId(rid);
      if(!rid) {
        return ctx.body = ctx.helper.errorJSON();
      }
    }
    // 回复作者
    else if(type === 1) {
      rid = await service.author.commentId(rid);
      if(!rid) {
        return ctx.body = ctx.helper.errorJSON();
      }
    }
    // 回复画圈
    else if(type === 3) {
    }
    else {
      return ctx.body = ctx.helper.errorJSON();
    }
    pid = pid || rid;
    await service.comment.replyCount(rid);
    let res = await service.comment.add(uid, rid, pid, content, parseInt(body.authorId));
    if(!res) {
      return ctx.body = ctx.helper.errorJSON();
    }
    if(type === 2) {
      if(body.pid) {
        let comment = await service.comment.info(body.pid);
        if(comment.uid !== uid) {
          app.model.message.create({
            user_id: uid,
            author_id: body.authorId || 0,
            target_id: comment.userId,
            type: 2,
            ref_id: id,
            comment_id: res.id,
            create_time: new Date(),
            update_time: new Date(),
          });
        }
      }
    }
    else if(type === 1) {
      if(body.pid) {
        let comment = await service.comment.info(body.pid);
        if(comment.uid !== uid) {
          app.model.message.create({
            user_id: uid,
            author_id: body.authorId || 0,
            target_id: comment.userId,
            type: 1,
            ref_id: id,
            comment_id: res.id,
            create_time: new Date(),
            update_time: new Date(),
          });
        }
      }
    }
    else if(type === 3) {
      let comment = await service.comment.info(pid);
      if(comment.userId !== uid) {
        app.model.message.create({
          user_id: uid,
          author_id: body.authorId || 0,
          target_id: comment.userId,
          type: pid !== rid ? 3 : 4,
          ref_id: rid,
          comment_id: res.id,
          create_time: new Date(),
          update_time: new Date(),
        });
      }
    }
    app.redis.incr('commentReplyCount_' + rid);
    ctx.body = ctx.helper.okJSON(res);
  }

  async report() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    await service.comment.report(id, uid);
    ctx.body = ctx.helper.okJSON();
  }

  async block() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.comment.block(id, uid);
    if(res.success) {
      ctx.body = ctx.helper.okJSON();
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async del() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.comment.del(id, uid);
    if(res.success) {
      ctx.body = ctx.helper.okJSON();
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }
}

module.exports = Controller;
