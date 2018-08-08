/**
 * Created by army8735 on 2018/6/29.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let [ info, originWorks, fcList, hhList, fcPrize, hhPrize, fcPopular, hhPopular ] = await Promise.all([
      service.activity.ysjxyInfo(),
      service.activity.ysjxyOriginWorks(),
      service.activity.ysjxyUpload(uid, 0, 10, 0),
      service.activity.ysjxyUploadHh(uid, 0, 10, 0),
      service.activity.ysjxyFcPrize(),
      service.activity.ysjxyHhPrize(),
      service.activity.ysjxyFcPopular(),
      service.activity.ysjxyHhPopular()
    ]);
    await ctx.render('ysjxy', {
      info,
      originWorks,
      fcList,
      hhList,
      fcPrize,
      hhPrize,
      fcPopular,
      hhPopular,
    });
  }

  async fcList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let offset = parseInt(body.offset) || 0;
    let sort = parseInt(body.sort) || 0;
    let res = await service.activity.ysjxyUpload(uid, offset, 10, sort);
    ctx.body = ctx.helper.okJSON(res);
  }

  async hhList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let offset = parseInt(body.offset) || 0;
    let sort = parseInt(body.sort) || 0;
    let res = await service.activity.ysjxyUploadHh(uid, offset, 10, sort);
    ctx.body = ctx.helper.okJSON(res);
  }

  async vote() {
    const { ctx, service, app } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let type = parseInt(body.type);
    if(!id || !type) {
      return;
    }
    return ctx.body = ctx.helper.errorJSON('投票已结束');
    let res = await service.activity.vote(id, type, uid);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res.data);
      let count = res.data.count;
      if(type === 1) {
        app.model.activityUpload.update({
          popular: count,
        }, {
          where: {
            id,
          },
        });
      }
      else if(type === 2) {
        app.model.activityUploadHh.update({
          popular: count,
        }, {
          where: {
            id,
          },
        });
      }
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async fc() {
    const { ctx, service } = this;
    let [ info, originWorks ] = await Promise.all([
      service.activity.ysjxyInfo(),
      service.activity.ysjxyOriginWorks()
    ]);
    let disabled = Date.now() >= new Date('2018-08-01').getTime();
    await ctx.render('fc', {
      info,
      originWorks,
      disabled,
    });
  }

  async fcSingle() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let id = parseInt(ctx.params.id);
    if(!id) {
      return;
    }
    let single = await service.activity.ysjxyFcSingle(id, uid);
    await ctx.render('fc_single', {
      single,
    });
  }

  async hh() {
    const { ctx, service } = this;
    let [ info, character ] = await Promise.all([
      service.activity.ysjxyInfo(),
      service.activity.character()
    ]);
    let disabled = Date.now() >= new Date('2018-08-01').getTime();
    await ctx.render('hh', {
      info,
      character,
      disabled,
    });
  }

  async hhSingle() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let id = parseInt(ctx.params.id);
    if(!id) {
      return;
    }
    let single = await service.activity.ysjxyHhSingle(id, uid);
    await ctx.render('hh_single', {
      single,
    });
  }

  async fcUpload() {
    const { ctx, service, app } = this;
    let disabled = Date.now() >= new Date('2018-08-01').getTime();
    if(disabled) {
      return;
    }
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let originId = parseInt(body.originId);
    let audioUrl = body.audioUrl;
    let imgUrl = body.imgUrl;
    let videoUrl = body.videoUrl;
    let describe = body.describe || '';
    if(!originId || !audioUrl) {
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
      app.model.video.findOne({
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
      let audioId = last[2].id;
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
      let imgId = last[3].id;
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
      let videoId = last[1].id;
      videoId += Math.floor(Math.random() * 3) + 1;
      if(videoUrl) {
        query.push(
          app.model.video.create({
            id: videoId,
            work_id: 0,
            title: originWorks.title,
            url: videoUrl,
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
      if(last[5]) {
        authorId = last[5].authorId;
      }
      else {
        createAuthor = true;
        authorId = last[4].id;
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
      if(videoUrl) {
        query.push(
          app.model.workNum.create({
            work_id: videoId,
            type: 1,
          }, {
            transaction,
            raw: true,
          })
        );
        query.push(
          app.model.worksWorkRelation.create({
            works_id: id,
            work_id: videoId,
            kind: 1,
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
      await app.model.authorCommentRelation.create({
        author_id: authorId,
        comment_id: createList[1].id,
      }, {
        transaction,
        raw: true,
      });
      await transaction.commit();
      let fc = await app.model.activityUpload.create({
        activity_id: 1,
        origin_id: originId,
        works_id: id,
        user_id: uid,
      }, {
        raw: true,
      });
      return ctx.body = ctx.helper.okJSON(fc);
    }
    catch(e) {
      await transaction.rollback();
      return ctx.body = ctx.helper.errorJSON(e.toString());
    }
  }

  async hhUpload() {
    const { ctx, service, app } = this;
    let disabled = Date.now() >= new Date('2018-08-01').getTime();
    if(disabled) {
      return;
    }
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let title = body.title;
    let imgUrl = body.imgUrl;
    let describe = body.describe || '';
    if(!title || !imgUrl) {
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
    ]);
    let transaction = await app.sequelizeCircling.transaction();
    let query = [];
    try {
      let id = last[0].id;
      id += Math.floor(Math.random() * 3) + 1;
      query.push(
        app.model.works.create({
          id,
          title,
          describe: describe,
          type: 22,
          is_authorize: true,
          state: 1,
          review: 1,
        }, {
          transaction,
          raw: true,
        })
      );
      query.push(
        app.model.comment.create({
          content: id,
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
      let imgId = last[1].id;
      imgId += Math.floor(Math.random() * 3) + 1;
      query.push(
        app.model.image.create({
          id: imgId,
          work_id: 0,
          title,
          url: imgUrl,
          type: 32,
          review: 1,
        }, {
          transaction,
          raw: true,
        })
      );
      let createList = await Promise.all(query);
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
          work_id: imgId,
          kind: 3,
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
          comment_id: createList[1].id,
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
          work_id: imgId,
          kind: 3,
        }, {
          transaction,
          raw: true,
        })
      );
      query.push(app.model.workNum.create({
        work_id: imgId,
        type: 1,
      }, {
        transaction,
        raw: true,
      }));
      await Promise.all(query);
      await transaction.commit();
      let hh = await app.model.activityUploadHh.create({
        activity_id: 1,
        works_id: id,
        user_id: uid,
      }, {
        raw: true,
      });
      return ctx.body = ctx.helper.okJSON(hh);
    }
    catch(e) {
      await transaction.rollback();
      return ctx.body = ctx.helper.errorJSON(e.toString());
    }
  }
}

module.exports = Controller;
