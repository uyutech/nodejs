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
    let commentId = parseInt(body.commentId);
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
    let commentId = parseInt(body.commentId);
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
    let commentId = parseInt(body.commentId);
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
    let commentId = parseInt(body.commentId);
    if(!commentId) {
      return;
    }
    let res = await service.comment.operate(commentId, uid, 2, false);
    ctx.body = ctx.helper.okJSON(res);
  }

  async sub() {
    const { ctx, service, app } = this;
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
    let rid = body.id;
    let pid = body.pid;
    // 回复作品
    if(body.type === '2') {
      rid = await service.works.commentId(rid);
      if(!rid) {
        return ctx.body = ctx.helper.errorJSON();
      }
    }
    // 回复作者
    else if(body.type === '1') {
      rid = await service.author.commentId(rid);
      if(!rid) {
        return ctx.body = ctx.helper.errorJSON();
      }
    }
    // 回复画圈
    else if(body.type === '3') {
    }
    else {
      return ctx.body = ctx.helper.errorJSON();
    }
    pid = pid || rid;
    await service.comment.replyCount(rid);
    let res = await service.comment.add(uid, rid, pid, content, body.authorId);
    if(!res) {
      return ctx.body = ctx.helper.errorJSON();
    }
    if(body.type === '2') {
      if(body.pid) {
        let comment = await service.comment.info(body.pid);
        if(comment.uid !== uid) {
          app.model.message.create({
            user_id: uid,
            author_id: body.authorId || 0,
            is_author: !!body.authorId,
            target_id: comment.uid,
            type: 2,
            ref_id: rid,
            comment_id: res.id,
            create_time: new Date(),
            update_time: new Date(),
          });
        }
      }
    }
    else if(body.type === '1') {
      if(body.pid) {
        let comment = await service.comment.info(body.pid);
        if(comment.uid !== uid) {
          app.model.message.create({
            user_id: uid,
            author_id: body.authorId || 0,
            is_author: !!body.authorId,
            target_id: comment.uid,
            type: 1,
            ref_id: rid,
            comment_id: res.id,
            create_time: new Date(),
            update_time: new Date(),
          });
        }
      }
    }
    else if(body.type === '3') {
      if(pid !== rid) {
        let comment = await service.comment.info(pid);
        if(comment.uid !== uid) {
          app.model.message.create({
            user_id: uid,
            author_id: body.authorId || 0,
            is_author: !!body.authorId,
            target_id: comment.uid,
            type: 3,
            ref_id: rid,
            comment_id: res.id,
            create_time: new Date(),
            update_time: new Date(),
          });
        }
      }
      else {
        let post = await service.post.info(rid);
        if(post.uid !== uid) {
          app.model.message.create({
            user_id: uid,
            author_id: body.authorId || 0,
            is_author: !!body.authorId,
            target_id: post.uid,
            type: 4,
            ref_id: rid,
            comment_id: res.id,
            create_time: new Date(),
            update_time: new Date(),
          });
        }
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
}

module.exports = Controller;
