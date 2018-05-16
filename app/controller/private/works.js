/**
 * Created by army8735 on 2018/4/23.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async typeAll() {
    const { app, ctx } = this;
    let cacheKey = 'worksTypeAll';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(JSON.parse(res));
    }
    res = await app.model.worksType.findAll({
      attributes: [
        'id',
        'name'
      ],
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.longTime, JSON.stringify(res));
    ctx.body = ctx.helper.okJSON(res);
  }

  async stateAll() {
    const { ctx } = this;
    ctx.body = ctx.helper.okJSON([
      {
        id: 0,
        name: '未知',
      },
      {
        id: 1,
        name: '已完成',
      },
      {
        id: 2,
        name: '未完成公开',
      },
      {
        id: 3,
        name: '未完成保密',
      }
    ]);
  }

  async create() {
    const { app, ctx } = this;
    let body = ctx.request.body;
    let userId = parseInt(body.userId);
    let works;
    let videoList;
    let audioList;
    let imageList;
    let textList;
    let workRelationList;
    try {
      works = JSON.parse(body.works);
      videoList = JSON.parse(body.videoList);
      audioList = JSON.parse(body.audioList);
      imageList = JSON.parse(body.imageList);
      textList = JSON.parse(body.textList);
      workRelationList = JSON.parse(body.workRelationList);
    }
    catch(e) {
      return ctx.body = ctx.helper.errorJSON(e.toString());
    }
    let idHash = {};
    let videoIdList = [];
    let audioIdList = [];
    let imageIdList = [];
    let textIdList = [];
    if(!userId) {
      return ctx.body = ctx.helper.errorJSON({
        code: 2000,
        message: '缺userId',
      });
    }
    if(!works) {
      return ctx.body = ctx.helper.errorJSON({
        code: 2100,
        message: '缺works',
      });
    }
    if(!works.title) {
      return ctx.body = ctx.helper.errorJSON({
        code: 2101,
        message: '缺works.title',
      });
    }
    if(!works.type) {
      return ctx.body = ctx.helper.errorJSON({
        code: 2102,
        message: '缺works.type',
      });
    }
    if(!works.state) {
      return ctx.body = ctx.helper.errorJSON({
        code: 2103,
        message: '缺works.state',
      });
    }
    if(Array.isArray(works.authorList)) {
      for(let i = 0, len = works.authorList.length; i < len; i++) {
        let item = works.authorList[i];
        if(!item.id) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2106,
            message: '缺works.authorList.id',
          });
        }
        if(!item.professionId) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2107,
            message: '缺works.authorList.professionId',
          });
        }
      }
    }
    if(Array.isArray(videoList)) {
      for(let i = 0, len = videoList.length; i < len; i++) {
        let video = videoList[i];
        if(!video.id) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2210,
            message: '缺video.id',
          });
        }
        if(!video.title) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2211,
            message: '缺video.title',
          });
        }
        if(!video.url) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2212,
            message: '缺video.url',
          });
        }
        if(!video.type) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2213,
            message: '缺video.type',
          });
        }
        if(idHash[video.id]) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2200,
            message: 'video.id重复',
          });
        }
        idHash[video.id] = true;
        if(Array.isArray(video.authorList)) {
          for(let j = 0, len = video.authorList.length; j < len; j++) {
            let item = video.authorList[j];
            if(!item.id) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2214,
                message: '缺video.authorList.id',
              });
            }
            if(!item.professionId) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2215,
                message: '缺video.authorList.professionId',
              });
            }
          }
        }
      }
    }
    if(Array.isArray(audioList)) {
      for(let i = 0, len = audioList.length; i < len; i++) {
        let audio = audioList[i];
        if(!audio.id) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2220,
            message: '缺audio.id',
          });
        }
        if(!audio.title) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2221,
            message: '缺audio.title',
          });
        }
        if(!audio.url) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2222,
            message: '缺audio.url',
          });
        }
        if(!audio.type) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2223,
            message: '缺audio.type',
          });
        }
        if(idHash[audio.id]) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2200,
            message: 'audio.id重复',
          });
        }
        idHash[audio.id] = true;
        if(Array.isArray(audio.authorList)) {
          for(let j = 0, len = audio.authorList.length; j < len; j++) {
            let item = audio.authorList[j];
            if(!item.id) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2224,
                message: '缺audio.authorList.id',
              });
            }
            if(!item.professionId) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2225,
                message: '缺audio.authorList.professionId',
              });
            }
          }
        }
      }
    }
    if(Array.isArray(imageList)) {
      for(let i = 0, len = imageList.length; i < len; i++) {
        let image = imageList[i];
        if(!image.id) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2230,
            message: '缺image.id',
          });
        }
        if(!image.title) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2231,
            message: '缺image.title',
          });
        }
        if(!image.url) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2232,
            message: '缺image.url',
          });
        }
        if(!image.type) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2233,
            message: '缺image.type',
          });
        }
        if(idHash[image.id]) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2200,
            message: 'image.id重复',
          });
        }
        idHash[image.id] = true;
        if(Array.isArray(image.authorList)) {
          for(let j = 0, len = image.authorList.length; j < len; j++) {
            let item = image.authorList[j];
            if(!item.id) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2234,
                message: '缺image.authorList.id',
              });
            }
            if(!item.professionId) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2235,
                message: '缺image.authorList.professionId',
              });
            }
          }
        }
      }
    }
    if(Array.isArray(textList)) {
      for(let i = 0, len = textList.length; i < len; i++) {
        let text = textList[i];
        if(!text.id) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2240,
            message: '缺text.id',
          });
        }
        if(!text.title) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2241,
            message: '缺text.title',
          });
        }
        if(!text.content) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2242,
            message: '缺text.content',
          });
        }
        if(!text.type) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2243,
            message: '缺text.type',
          });
        }
        if(idHash[text.id]) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2200,
            message: 'text.id重复',
          });
        }
        idHash[text.id] = true;
        if(Array.isArray(text.authorList)) {
          for(let j = 0, len = text.authorList.length; j < len; j++) {
            let item = text.authorList[j];
            if(!item.id) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2244,
                message: '缺text.authorList.id',
              });
            }
            if(!item.professionId) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2245,
                message: '缺text.authorList.professionId',
              });
            }
          }
        }
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
      app.model.text.findOne({
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
    let query = [];
    let workList = [];
    let kindList = [];
    let now = new Date();
    let transaction = await app.sequelizeCircling.transaction();
    try {
      if(Array.isArray(videoList)) {
        let id = last[1].id;
        for(let i = 0, len = videoList.length; i < len; i++) {
          let item = videoList[i];
          workList.push(item);
          kindList.push(1);
          id += Math.floor(Math.random() * 3) + 1;
          videoIdList.push(id);
          query.push(app.model.video.create({
            id,
            work_id: 0,
            title: item.title,
            width: item.width,
            height: item.height,
            duration: item.duration,
            cover: item.cover,
            url: item.url,
            type: item.type,
            review: item.review,
            create_time: now,
            update_time: now,
          }, {
            transaction,
            raw: true,
          }));
        }
      }
      if(Array.isArray(audioList)) {
        let id = last[2].id;
        for(let i = 0, len = audioList.length; i < len; i++) {
          let item = audioList[i];
          workList.push(item);
          kindList.push(2);
          id += Math.floor(Math.random() * 3) + 1;
          audioIdList.push(id);
          query.push(app.model.audio.create({
            id,
            work_id: 0,
            title: item.title,
            duration: item.duration,
            cover: item.cover,
            url: item.url,
            lrc: item.lrc,
            type: item.type,
            review: item.review,
            create_time: now,
            update_time: now,
          }, {
            transaction,
            raw: true,
          }));
        }
      }
      if(Array.isArray(imageList)) {
        let id = last[3].id;
        for(let i = 0, len = imageList.length; i < len; i++) {
          let item = imageList[i];
          workList.push(item);
          kindList.push(3);
          id += Math.floor(Math.random() * 3) + 1;
          imageIdList.push(id);
          query.push(app.model.image.create({
            id,
            work_id: 0,
            title: item.title,
            width: item.width,
            height: item.height,
            url: item.url,
            type: item.type,
            review: item.review,
            create_time: now,
            update_time: now,
          }, {
            transaction,
            raw: true,
          }));
        }
      }
      if(Array.isArray(textList)) {
        let id = last[4].id;
        for(let i = 0, len = textList.length; i < len; i++) {
          let item = textList[i];
          workList.push(item);
          kindList.push(4);
          id += Math.floor(Math.random() * 3) + 1;
          textIdList.push(id);
          query.push(app.model.text.create({
            id,
            work_id: 0,
            title: item.title,
            content: item.content,
            type: item.type,
            review: item.review,
            create_time: now,
            update_time: now,
          }, {
            transaction,
            raw: true,
          }));
        }
      }
      let id = last[0].id;
      id += Math.floor(Math.random() * 3) + 1;
      query.push(app.model.works.create({
        id,
        title: works.title,
        sub_title: works.subTitle,
        describe: works.describe,
        type: works.type,
        cover: works.cover,
        is_authorize: works.isAuthorize,
        state: works.state,
        review: works.review,
        create_time: now,
        update_time: now,
      }, {
        transaction,
        raw: true,
      }));
      query.push(app.model.worksNum.create({
        works_id: id,
        type: 1,
      }, {
        transaction,
        raw: true,
      }));
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
      let createList = await Promise.all(query);
      query = [];
      workList.forEach((item, i) => {
        let create = createList[i];
        if(Array.isArray(item.authorList)) {
          item.authorList.forEach((author) => {
            query.push(app.model.workAuthorRelation.create({
              work_id: create.id,
              kind: kindList[i],
              author_id: author.id,
              profession_id: author.professionId,
              tag: author.tag,
              create_time: now,
            }, {
              transaction,
              raw: true,
            }));
          });
        }
        query.push(app.model.worksWorkRelation.create({
          works_id: id,
          work_id: create.id,
          weight: item.weight,
          kind: kindList[i],
          tag: item.tag,
        }, {
          transaction,
          raw: true,
        }));
        query.push(app.model.workNum.create({
          work_id: create.id,
          type: 1,
        }, {
          transaction,
          raw: true,
        }));
        query.push(app.model.userUploadWork.create({
          user_id: userId,
          work_id: create.id,
          kind: kindList[i],
          create_time: now,
          update_time: now,
        }, {
          transaction,
          raw: true,
        }));
        idHash[item.id] = create.id;
      });
      if(Array.isArray(works.authorList)) {
        works.authorList.forEach((author) => {
          query.push(app.model.worksAuthorRelation.create({
            works_id: id,
            author_id: author.id,
            profession_id: author.professionId,
            type: author.type,
            tag: author.tag,
            create_time: now,
          }, {
            transaction,
            raw: true,
          }));
        });
      }
      query.push(app.model.worksCommentRelation.create({
        works_id: id,
        comment_id: createList[createList.length - 1].id,
      }, {
        transaction,
        raw: true,
      }));
      query.push(app.model.userCreateWorks.create({
        user_id: userId,
        works_id: id,
        create_time: now,
        update_time: now,
      }, {
        transaction,
        raw: true,
      }));
      if(Array.isArray(workRelationList)) {
        workRelationList.forEach((item) => {
          query.push(app.model.workWorkRelation.create({
            work_id: idHash[item.id],
            target_id: idHash[item.targetId],
            type: item.type,
            create_time: now,
            update_time: now,
          }, {
            transaction,
            raw: true,
          }));
        });
      }
      await Promise.all(query);
      await transaction.commit();
      return ctx.body = ctx.helper.okJSON(id);
    }
    catch(e) {
      await transaction.rollback();
      return ctx.body = ctx.helper.errorJSON(e.toString());
    }
  }

  async addWork() {
    const { app, ctx } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let userId = parseInt(body.userId);
    let videoList;
    let audioList;
    let imageList;
    let textList;
    let workRelationList;
    try {
      videoList = JSON.parse(body.videoList);
      audioList = JSON.parse(body.audioList);
      imageList = JSON.parse(body.imageList);
      textList = JSON.parse(body.textList);
      workRelationList = JSON.parse(body.workRelationList);
    }
    catch(e) {
      return ctx.body = ctx.helper.errorJSON(e.toString());
    }
    let idHash = {};
    let videoIdList = [];
    let audioIdList = [];
    let imageIdList = [];
    let textIdList = [];
    if(!userId) {
      return ctx.body = ctx.helper.errorJSON({
        code: 2000,
        message: '缺userId',
      });
    }
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    if(Array.isArray(videoList)) {
      for(let i = 0, len = videoList.length; i < len; i++) {
        let video = videoList[i];
        if(!video.id) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2210,
            message: '缺video.id',
          });
        }
        if(!video.title) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2211,
            message: '缺video.title',
          });
        }
        if(!video.url) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2212,
            message: '缺video.url',
          });
        }
        if(!video.type) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2213,
            message: '缺video.type',
          });
        }
        if(idHash[video.id]) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2200,
            message: 'video.id重复',
          });
        }
        idHash[video.id] = true;
        if(Array.isArray(video.authorList)) {
          for(let j = 0, len = video.authorList.length; j < len; j++) {
            let item = video.authorList[j];
            if(!item.id) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2214,
                message: '缺video.authorList.id',
              });
            }
            if(!item.professionId) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2215,
                message: '缺video.authorList.professionId',
              });
            }
          }
        }
      }
    }
    if(Array.isArray(audioList)) {
      for(let i = 0, len = audioList.length; i < len; i++) {
        let audio = audioList[i];
        if(!audio.id) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2220,
            message: '缺audio.id',
          });
        }
        if(!audio.title) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2221,
            message: '缺audio.title',
          });
        }
        if(!audio.url) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2222,
            message: '缺audio.url',
          });
        }
        if(!audio.type) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2223,
            message: '缺audio.type',
          });
        }
        if(idHash[audio.id]) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2200,
            message: 'audio.id重复',
          });
        }
        idHash[audio.id] = true;
        if(Array.isArray(audio.authorList)) {
          for(let j = 0, len = audio.authorList.length; j < len; j++) {
            let item = audio.authorList[j];
            if(!item.id) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2224,
                message: '缺audio.authorList.id',
              });
            }
            if(!item.professionId) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2225,
                message: '缺audio.authorList.professionId',
              });
            }
          }
        }
      }
    }
    if(Array.isArray(imageList)) {
      for(let i = 0, len = imageList.length; i < len; i++) {
        let image = imageList[i];
        if(!image.id) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2230,
            message: '缺image.id',
          });
        }
        if(!image.title) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2231,
            message: '缺image.title',
          });
        }
        if(!image.url) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2232,
            message: '缺image.url',
          });
        }
        if(!image.type) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2233,
            message: '缺image.type',
          });
        }
        if(idHash[image.id]) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2200,
            message: 'image.id重复',
          });
        }
        idHash[image.id] = true;
        if(Array.isArray(image.authorList)) {
          for(let j = 0, len = image.authorList.length; j < len; j++) {
            let item = image.authorList[j];
            if(!item.id) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2234,
                message: '缺image.authorList.id',
              });
            }
            if(!item.professionId) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2235,
                message: '缺image.authorList.professionId',
              });
            }
          }
        }
      }
    }
    if(Array.isArray(textList)) {
      for(let i = 0, len = textList.length; i < len; i++) {
        let text = textList[i];
        if(!text.id) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2240,
            message: '缺text.id',
          });
        }
        if(!text.title) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2241,
            message: '缺text.title',
          });
        }
        if(!text.content) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2242,
            message: '缺text.content',
          });
        }
        if(!text.type) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2243,
            message: '缺text.type',
          });
        }
        if(idHash[text.id]) {
          return ctx.body = ctx.helper.errorJSON({
            code: 2200,
            message: 'text.id重复',
          });
        }
        idHash[text.id] = true;
        if(Array.isArray(text.authorList)) {
          for(let j = 0, len = text.authorList.length; j < len; j++) {
            let item = text.authorList[j];
            if(!item.id) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2244,
                message: '缺text.authorList.id',
              });
            }
            if(!item.professionId) {
              return ctx.body = ctx.helper.errorJSON({
                code: 2245,
                message: '缺text.authorList.professionId',
              });
            }
          }
        }
      }
    }
    let last = await Promise.all([
      app.model.works.findOne({
        attributes: [
          'id'
        ],
        where: {
          id,
        },
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
      app.model.text.findOne({
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
    if(!last[0].id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let query = [];
    let workList = [];
    let kindList = [];
    let now = new Date();
    let transaction = await app.sequelizeCircling.transaction();
    try {
      if(Array.isArray(videoList)) {
        let id = last[1].id;
        for(let i = 0, len = videoList.length; i < len; i++) {
          let item = videoList[i];
          workList.push(item);
          kindList.push(1);
          id += Math.floor(Math.random() * 3) + 1;
          videoIdList.push(id);
          query.push(app.model.video.create({
            id,
            work_id: 0,
            title: item.title,
            width: item.width,
            height: item.height,
            duration: item.duration,
            cover: item.cover,
            url: item.url,
            type: item.type,
            review: item.review,
            create_time: now,
            update_time: now,
          }, {
            transaction,
            raw: true,
          }));
        }
      }
      if(Array.isArray(audioList)) {
        let id = last[2].id;
        for(let i = 0, len = audioList.length; i < len; i++) {
          let item = audioList[i];
          workList.push(item);
          kindList.push(2);
          id += Math.floor(Math.random() * 3) + 1;
          audioIdList.push(id);
          query.push(app.model.audio.create({
            id,
            work_id: 0,
            title: item.title,
            duration: item.duration,
            cover: item.cover,
            url: item.url,
            lrc: item.lrc,
            type: item.type,
            review: item.review,
            create_time: now,
            update_time: now,
          }, {
            transaction,
            raw: true,
          }));
        }
      }
      if(Array.isArray(imageList)) {
        let id = last[3].id;
        for(let i = 0, len = imageList.length; i < len; i++) {
          let item = imageList[i];
          workList.push(item);
          kindList.push(3);
          id += Math.floor(Math.random() * 3) + 1;
          imageIdList.push(id);
          query.push(app.model.image.create({
            id,
            work_id: 0,
            title: item.title,
            width: item.width,
            height: item.height,
            url: item.url,
            type: item.type,
            review: item.review,
            create_time: now,
            update_time: now,
          }, {
            transaction,
            raw: true,
          }));
        }
      }
      if(Array.isArray(textList)) {
        let id = last[4].id;
        for(let i = 0, len = textList.length; i < len; i++) {
          let item = textList[i];
          workList.push(item);
          kindList.push(4);
          id += Math.floor(Math.random() * 3) + 1;
          textIdList.push(id);
          query.push(app.model.text.create({
            id,
            work_id: 0,
            title: item.title,
            content: item.content,
            type: item.type,
            review: item.review,
            create_time: now,
            update_time: now,
          }, {
            transaction,
            raw: true,
          }));
        }
      }
      let createList = await Promise.all(query);
      query = [];
      workList.forEach((item, i) => {
        let create = createList[i];
        if(Array.isArray(item.authorList)) {
          item.authorList.forEach((author) => {
            query.push(app.model.workAuthorRelation.create({
              work_id: create.id,
              kind: kindList[i],
              author_id: author.id,
              profession_id: author.professionId,
              tag: author.tag,
              create_time: now,
            }, {
              transaction,
              raw: true,
            }));
          });
        }
        query.push(app.model.worksWorkRelation.create({
          works_id: id,
          work_id: create.id,
          weight: item.weight,
          kind: kindList[i],
          tag: item.tag,
        }, {
          transaction,
          raw: true,
        }));
        query.push(app.model.workNum.create({
          work_id: create.id,
          type: 1,
        }, {
          transaction,
          raw: true,
        }));
        query.push(app.model.userUploadWork.create({
          user_id: userId,
          work_id: create.id,
          kind: kindList[i],
          create_time: now,
          update_time: now,
        }, {
          transaction,
          raw: true,
        }));
        idHash[item.id] = create.id;
      });
      if(Array.isArray(workRelationList)) {
        workRelationList.forEach((item) => {
          query.push(app.model.workWorkRelation.create({
            work_id: idHash[item.id],
            target_id: idHash[item.targetId],
            type: item.type,
            create_time: now,
            update_time: now,
          }, {
            transaction,
            raw: true,
          }));
        });
      }
      await Promise.all(query);
      await transaction.commit();
      return ctx.body = ctx.helper.okJSON(id);
    }
    catch(e) {
      await transaction.rollback();
      return ctx.body = ctx.helper.errorJSON(e.toString());
    }
  }

  async removeWork() {
    const { app, ctx } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let workIdList = JSON.parse(body.workIdList);
    if(!workIdList || !Array.isArray(workIdList)) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3003,
        message: '缺workIdList',
      });
    }
    let query = workIdList.map((workId) => {
      app.model.worksWorkRelation.destroy({
        where: {
          works_id: id,
          work_id: workId,
        },
      });
    });
    await Promise.all(query);
    ctx.body = ctx.helper.okJSON();
  }

  async like() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let userId = parseInt(body.userId);
    let id = parseInt(body.id) || 0;
    let workId = parseInt(body.workId);
    if(!workId || !userId) {
      return;
    }
    let res = await service.work.like(id, workId, userId, true);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unLike() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let userId = parseInt(body.userId);
    let id = parseInt(body.id) || 0;
    let workId = parseInt(body.workId);
    if(!workId || !userId) {
      return;
    }
    let res = await service.work.like(id, workId, userId, false);
    ctx.body = ctx.helper.okJSON(res);
  }

  async favor() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let userId = parseInt(body.userId);
    let id = parseInt(body.id) || 0;
    let workId = parseInt(body.workId);
    if(!workId || !userId) {
      return;
    }
    let res = await service.work.favor(id, workId, userId, true);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unFavor() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let userId = parseInt(body.userId);
    let id = parseInt(body.id) || 0;
    let workId = parseInt(body.workId);
    if(!workId || !userId) {
      return;
    }
    let res = await service.work.favor(id, workId, userId, false);
    ctx.body = ctx.helper.okJSON(res);
  }

  async update() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let attributes = JSON.parse(body.attributes);
    if(!attributes) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3001,
        message: '缺少attributes',
      });
    }
    return await service.works.update(id, attributes);
  }

  async delete() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let res = await service.works.delete(id);
    if(res.success) {
      ctx.body = ctx.helper.okJSON();
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async unDelete() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let res = await service.works.unDelete(id);
    if(res.success) {
      ctx.body = ctx.helper.okJSON();
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async addAuthor() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let authorList = JSON.parse(body.authorList);
    if(!authorList) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3002,
        message: '缺少authorList',
      });
    }
    if(!Array.isArray(authorList)) {
      authorList = [authorList];
    }
    for(let i = 0, len = authorList.length; i < len; i++) {
      let item = authorList[i];
      if(!item.id) {
        return ctx.body = ctx.helper.errorJSON({
          code: 2106,
          message: '缺authorList.id',
        });
      }
      if(!item.professionId) {
        return ctx.body = ctx.helper.errorJSON({
          code: 2107,
          message: '缺authorList.professionId',
        });
      }
    }
    return await service.works.addAuthor(id, authorList);
  }

  async removeAuthor() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let authorList = JSON.parse(body.authorList);
    if(!authorList) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3002,
        message: '缺少authorList',
      });
    }
    if(!Array.isArray(authorList)) {
      authorList = [authorList];
    }
    for(let i = 0, len = authorList.length; i < len; i++) {
      let item = authorList[i];
      if(!item.id) {
        return ctx.body = ctx.helper.errorJSON({
          code: 2106,
          message: '缺authorList.id',
        });
      }
      if(!item.professionId) {
        return ctx.body = ctx.helper.errorJSON({
          code: 2107,
          message: '缺authorList.professionId',
        });
      }
    }
    return await service.works.removeAuthor(id, authorList);
  }

  async info() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON({
        code: 3000,
        message: 'id不合法',
      });
    }
    let [info, collection] = await Promise.all([
      service.works.infoPlusAllAuthor(id),
      service.works.collectionFull(id),
    ]);
    ctx.body = ctx.helper.okJSON({
      info,
      collection,
    });
  }
}

module.exports = Controller;
