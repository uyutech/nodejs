/**
 * Created by army8735 on 2018/4/3.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

class Controller extends egg.Controller {
  async index() {
    const { app, ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let [info,
      followPersonCount,
      fansCount,
      isFollow,
      isFans,
      author,
      postList
    ] = await Promise.all([
      service.user.info(id),
      service.user.followPersonCount(id),
      service.user.fansCount(id),
      service.user.isFollow(id, uid),
      service.user.isFans(id, uid),
      service.user.author(id),
      service.user.postList(id, uid, 0, LIMIT, true)
    ]);
    if(!info) {
      return;
    }
    delete info.coins;
    let skillWorks;
    let workKindList;
    let commentList;
    if(author && author.length && author[0].type === 1 && author[0].settle <= 1) {
      let authorId = author[0].id;
      [skillWorks, workKindList, commentList] = await Promise.all([
        service.author.allSkillWorks(authorId, 6),
        service.author.workKindList(authorId),
        service.author.commentList(authorId, uid, 0, LIMIT)
      ]);
      if(workKindList && workKindList.length && workKindList[workKindList.length - 1].kind ===4) {
        workKindList.pop();
      }
      if(commentList) {
        commentList.limit = LIMIT;
      }
      else {
        let transaction = await app.sequelizeCircling.transaction();
        try {
          let comment = await app.model.comment.create({
            content: id,
            user_id: 2018000000008222,
            is_delete: true,
            review: 3,
            root_id: 0,
            parent_id: 0,
          }, {
            transaction,
            raw: true,
          });
          let commentId= comment.id;
          await app.model.authorCommentRelation.create({
            author_id: authorId,
            comment_id: commentId,
          }, {
            transaction,
            raw: true,
          });
          await transaction.commit();
        }
        catch(e) {
          await transaction.rollback();
        }
        commentList = {
          data: [],
          count: 0,
          limit: LIMIT,
        };
      }
    }
    postList.limit = LIMIT;
    ctx.body = ctx.helper.okJSON({
      info,
      followPersonCount,
      fansCount,
      isFollow,
      isFans,
      workKindList,
      postList,
      commentList,
      skillWorks,
      author,
    });
  }

  async postList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let offset = parseInt(body.offset) || 0;
    let res = await service.user.postList(id, uid, offset, LIMIT, true);
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
    if(uid === id) {
      ctx.body = ctx.helper.errorJSON('不能关注自己');
    }
    let res = await service.user.follow(id, uid, true);
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
    if(uid === id) {
      ctx.body = ctx.helper.errorJSON('不能关注自己');
    }
    let res = await service.user.follow(id, uid, false);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res.data);
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async report() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let uid = ctx.session.uid;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    await service.user.report(id, uid);
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
    let res = await service.user.black(id, uid);
    if(res.success) {
      ctx.body = ctx.helper.okJSON();
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }
}

module.exports = Controller;
