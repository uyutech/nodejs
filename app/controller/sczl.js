/**
 * Created by army8735 on 2018/8/15.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let [originWorks, worksList] = await Promise.all([
      service.activity.sczlOriginWorks(),
      service.activity.sczlUpload(uid, 0, 10, 0)
    ]);
    await ctx.render('sczl_home', {
      originWorks,
      worksList,
    });
  }

  async upload() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let [originWorks] = await Promise.all([
      service.activity.sczlOriginWorks()
    ]);
    await ctx.render('sczl_upload', {
      originWorks,
    });
  }

  async single() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let id = ctx.params.id;
    let [item] = await Promise.all([
      service.activity.sczlItem(id, uid)
    ]);
    await ctx.render('sczl_single', {
      item,
    });
  }

  async vote() {
    const { ctx, service, app } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.activity.vote(id, 1, uid);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res.data);
      let count = res.data.count;
      app.model.activityUpload.update({
        popular: count,
      }, {
        where: {
          id,
        },
      });
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async join() {
    const { app, ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let originId = parseInt(body.originId);
    let audioUrl = body.audioUrl;
    let dry = body.dry;
    let imgUrl = body.imgUrl;
    let describe = body.describe || '';
    if(!originId || !audioUrl || !dry) {
      return;
    }
    let originWorks = await service.works.info(originId);
    if(!originWorks) {
      return;
    }
    let last = await Promise.all([
      app.model.works.findOne({
        attributes: [
          'id'
        ],
        order: [
          ['id', 'DESC']
        ],
        limit: 1,
        raw: true,
      }),
      app.model.audio.findOne({
        attributes: [
          'id'
        ],
        order: [
          ['id', 'DESC']
        ],
        limit: 1,
        raw: true,
      }),
      app.model.image.findOne({
        attributes: [
          'id'
        ],
        order: [
          ['id', 'DESC']
        ],
        limit: 1,
        raw: true,
      }),
      app.model.author.findOne({
        attributes: [
          'id'
        ],
        order: [
          ['id', 'DESC']
        ],
        limit: 1,
        raw: true,
      }),
      app.model.userAuthorRelation.findOne({
        attributes: [
          ['author_id', 'authorId']
        ],
        where: {
          user_id: uid,
          type: 1,
        },
        raw: true,
      })
    ]);
    let transaction = await app.sequelizeCircling.transaction();
    let query = [];
    try {
      let id = last[0].id;
      id += Math.floor(Math.random() * 3) + 1;
      query.push(
        app.model.works.create({
          id,
          title: originWorks.title,
          describe: describe,
          cover: originWorks.cover,
          type: 2,
          is_authorize: true,
          state: 1,
          review: 1,
        }, {
          transaction,
          raw: true,
        })
      );
      query.push(app.model.comment.create({
        content: id,
        user_id: 2018000000008222,
        is_delete: true,
        review: 3,
        root_id: 0,
        parent_id: 0,
      }, {
        transaction,
        raw: true,
      }));
      let audioId = last[1].id;
      audioId += Math.floor(Math.random() * 3) + 1;
      query.push(
        app.model.audio.create({
          id: audioId,
          title: originWorks.title,
          url: audioUrl,
          type: 11,
          review: 1,
        }, {
          transaction,
          raw: true,
        })
      );
      let imgId = last[2].id;
      imgId += Math.floor(Math.random() * 3) + 1;
      if(imgUrl) {
        query.push(
          app.model.image.create({
            id: imgId,
            work_id: 0,
            title: originWorks.title,
            url: imgUrl,
            type: 4,
            review: 1,
          }, {
            transaction,
            raw: true,
          })
        );
      }
      let authorId;
      let createAuthor;
      if(last[4]) {
        authorId = last[4].authorId;
      }
      else {
        createAuthor = true;
        authorId = last[3].id;
        authorId += Math.floor(Math.random() * 3) + 1;
        query.push(
          app.model.author.create({
            id: authorId,
            name: ctx.session.nickname,
            is_settle: true,
          }, {
            transaction,
            raw: true,
          })
        );
      }
      let createList = await Promise.all(query);
      let commentId = createList[1].id;
      query = [];
      query.push(
        app.model.worksNum.create({
          works_id: id,
          type: 1,
        }, {
          transaction,
          raw: true,
        })
      );
      query.push(
        app.model.worksWorkRelation.create({
          works_id: id,
          work_id: audioId,
          kind: 2,
          works_review: 1,
          work_review: 1,
        }, {
          transaction,
          raw: true,
        })
      );
      query.push(
        app.model.worksCommentRelation.create({
          works_id: id,
          comment_id: commentId,
        }, {
          transaction,
          raw: true,
        })
      );
      query.push(
        app.model.userCreateWorks.create({
          user_id: uid,
          works_id: id,
        }, {
          transaction,
          raw: true,
        })
      );
      query.push(
        app.model.userUploadWork.create({
          user_id: uid,
          work_id: audioId,
          kind: 2,
        }, {
          transaction,
          raw: true,
        })
      );
      query.push(
        app.model.workNum.create({
          work_id: audioId,
          type: 1,
        }, {
          transaction,
          raw: true,
        })
      );
      if(imgUrl) {
        query.push(
          app.model.workNum.create({
            work_id: imgId,
            type: 1,
          }, {
            transaction,
            raw: true,
          })
        );
        query.push(
          app.model.worksWorkRelation.create({
            works_id: id,
            work_id: imgId,
            kind: 3,
            works_review: 1,
            work_review: 1,
          }, {
            transaction,
            raw: true,
          })
        );
      }
      query.push(
        app.model.worksWorksRelation.create({
          works_id: id,
          target_id: originWorks.id,
          type: 1,
        }, {
          transaction,
          raw: true,
        })
      );
      query.push(
        app.model.worksAuthorRelation.create({
          works_id: id,
          author_id: authorId,
          profession_id: 1,
          type: 2,
        }, {
          transaction,
          raw: true,
        })
      );
      query.push(
        app.model.workAuthorRelation.create({
          work_id: audioId,
          author_id: authorId,
          kind: 2,
          profession_id: 1,
        }, {
          transaction,
          raw: true,
        })
      );
      if(createAuthor) {
        query.push(
          app.model.userAuthorRelation.create({
            user_id: uid,
            author_id: authorId,
            type: 1,
            settle: 1,
          }, {
            transaction,
            raw: true,
          })
        );
        query.push(
          app.model.comment.create({
            content: authorId,
            user_id: 2018000000008222,
            is_delete: true,
            review: 3,
            root_id: 0,
            parent_id: 0,
          }, {
            transaction,
            raw: true,
          })
        );
      }
      createList = await Promise.all(query);
      await transaction.commit();
      let res = await app.model.activityUpload.create({
        activity_id: 2,
        origin_id: originId,
        works_id: id,
        user_id: uid,
        dry,
      }, {
        raw: true,
      });
      return ctx.body = ctx.helper.okJSON(res);
    }
    catch(e) {
      await transaction.rollback();
      return ctx.body = ctx.helper.errorJSON(e.toString());
    }
  }
}

module.exports = Controller;
