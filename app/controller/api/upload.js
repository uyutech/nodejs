/**
 * Created by army8735 on 2018/8/17.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { app, ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksType = body.worksType;
    let worksName = body.worksName;
    let worksDesc = body.worksDesc;
    let poster = body.poster;
    let professionList = body.professionList;
    let workList = body.workList;
    if(!worksType || !worksName || !professionList || !workList) {
      return;
    }
    if(!Array.isArray(professionList) || !professionList.length
      || !Array.isArray(workList) || !workList.length) {
      return;
    }
    let createAuthor = [];
    let hash = {};
    for(let i = 0; i < professionList.length; i++) {
      let item = professionList[i];
      item.value = (item.value || '').trim();
      if(!item.author && !item.value) {
        return;
      }
      if(!item.author && !hash[item.value]) {
        hash[item.value] = true;
        createAuthor.push(item.value);
      }
    }
    for(let i = 0; i < workList.length; i++) {
      let work = workList[i];
      work.professionList = work.professionList || [];
      for(let i = 0; i < work.professionList.length; i++) {
        let item = work.professionList[i];
        item.value = (item.value || '').trim();
        if(!item.author && !item.value) {
          return;
        }
        if(!item.author && !hash[item.value]) {
          hash[item.value] = true;
          createAuthor.push(item.value);
        }
      }
    }
    if(createAuthor.length) {
      let last = await app.model.author.findOne({
        attributes: [
          'id'
        ],
        order: [
          ['id', 'DESC']
        ],
        raw: true,
      });
      let id = last.id;
      let transaction = await app.sequelizeCircling.transaction();
      let query = createAuthor.map((item) => {
        id += Math.floor(Math.random() * 3) + 1;
        return app.model.author.create({
          id,
          name: item,
        }, {
          transaction,
          raw: true,
        });
      });
      try {
        let create = await Promise.all(query);
        await transaction.commit();
        hash = {};
        create.forEach((item) => {
          hash[item.name] = item.id;
        });
        for(let i = 0; i < professionList.length; i++) {
          let item = professionList[i];
          if(!item.author) {
            item.author = hash[item.value];
          }
        }
        for(let i = 0; i < workList.length; i++) {
          let work = workList[i];
          for(let i = 0; i < work.professionList.length; i++) {
            let item = work.professionList[i];
            if(!item.author) {
              item.author = hash[item.value];
            }
          }
        }
      }
      catch(e) {
        await transaction.rollback();
        return ctx.body = ctx.helper.errorJSON(e.toString());
      }
    }
    let last = await Promise.all([
      app.model.works.findOne({
        attributes: [
          'id'
        ],
        order: [
          ['id', 'DESC']
        ],
        raw: true,
      }),
      app.model.video.findOne({
        attributes: [
          'id'
        ],
        order: [
          ['id', 'DESC']
        ],
        raw: true,
      }),
      app.model.audio.findOne({
        attributes: [
          'id'
        ],
        order: [
          ['id', 'DESC']
        ],
        raw: true,
      }),
      app.model.image.findOne({
        attributes: [
          'id'
        ],
        order: [
          ['id', 'DESC']
        ],
        raw: true,
      }),
      app.model.text.findOne({
        attributes: [
          'id'
        ],
        order: [
          ['id', 'DESC']
        ],
        raw: true,
      })
    ]);
    let query = [];
    let now = new Date();
    let transaction = await app.sequelizeCircling.transaction();
    let worksId = last[0].id;
    let videoId = last[1].id;
    let audioId = last[2].id;
    let imageId = last[3].id;
    let textId = last[4].id;
    worksId += Math.floor(Math.random() * 3) + 1;
    query.push(
      app.model.works.create({
        id: worksId,
        title: worksName,
        describe: worksDesc,
        type: worksType,
        cover: poster,
        is_authorize: true,
        state: 1,
        review: 1,
        create_time: now,
        update_time: now,
      }, {
        transaction,
        raw: true,
      })
    );
    query.push(
      app.model.worksNum.create({
        works_id: worksId,
        type: 1,
      }, {
        transaction,
        raw: true,
      })
    );
    query.push(
      app.model.userCreateWorks.create({
        works_id: worksId,
        user_id: uid,
      }, {
        transaction,
        raw: true,
      })
    );
    professionList.forEach((item) => {
      query.push(
        app.model.worksAuthorRelation.create({
          works_id: worksId,
          author_id: item.author,
          profession_id: item.id,
          type: 1,
        }, {
          transaction,
          raw: true,
        })
      )
    });
    workList.forEach((work) => {
      let workId;
      if(work.kind === '1') {
        workId = videoId += Math.floor(Math.random() * 3) + 1;
        query.push(
          app.model.video.create({
            id: videoId,
            title: worksName,
            cover: poster,
            url: work.value,
            type: work.type,
            review: 1,
          }, {
            transaction,
            raw: true,
          })
        );
      }
      else if(work.kind === '2') {
        workId = audioId += Math.floor(Math.random() * 3) + 1;
        query.push(
          app.model.audio.create({
            id: audioId,
            title: worksName,
            cover: poster,
            url: work.value,
            type: work.type,
            review: 1,
          }, {
            transaction,
            raw: true,
          })
        );
      }
      else if(work.kind === '3') {
        workId = imageId += Math.floor(Math.random() * 3) + 1;
        query.push(
          app.model.image.create({
            id: imageId,
            title: worksName,
            cover: poster,
            url: work.value,
            type: work.type,
            review: 1,
          }, {
            transaction,
            raw: true,
          })
        );
      }
      else if(work.kind === '4') {
        workId = textId += Math.floor(Math.random() * 3) + 1;
        query.push(
          app.model.text.create({
            id: textId,
            title: worksName,
            content: work.value,
            type: work.type,
            review: 1,
          }, {
            transaction,
            raw: true,
          })
        );
      }console.log(work.kind, workId);
      query.push(
        app.model.workNum.create({
          work_id: workId,
          type: 1,
        }, {
          transaction,
          raw: true,
        })
      );
      query.push(
        app.model.worksWorkRelation.create({
          works_id: worksId,
          work_id: workId,
          kind: work.kind,
          works_review: 1,
          work_review: 1,
        }, {
          transaction,
          raw: true,
        })
      );
      query.push(
        app.model.userUploadWork.create({
          work_id: workId,
          user_id: uid,
          kind: work.kind,
        }, {
          transaction,
          raw: true,
        })
      );
      (work.professionList || []).forEach((item) => {
        query.push(
          app.model.workAuthorRelation.create({
            work_id: workId,
            kind: work.kind,
            author_id: item.author,
            profession_id: item.id,
            type: 1,
          }, {
            transaction,
            raw: true,
          })
        );
        query.push(
          app.model.worksAuthorRelation.create({
            works_id: worksId,
            author_id: item.author,
            profession_id: item.id,
            type: 2,
          }, {
            transaction,
            raw: true,
          })
        )
      });
    });
    try {
      await Promise.all(query);
      await transaction.commit();
      ctx.body = ctx.helper.okJSON({
        id: worksId,
      });
    }
    catch(e) {
      await transaction.rollback();
      return ctx.body = ctx.helper.errorJSON(e.toString());
    }
    let comment = await app.model.comment.create({
      content: worksId,
      user_id: 2018000000008222,
      is_delete: true,
      review: 3,
      root_id: 0,
      parent_id: 0,
    });
    let commentId= comment.id;
    app.model.worksCommentRelation.create({
      works_id: worksId,
      comment_id: commentId,
    });
  }
}

module.exports = Controller;
