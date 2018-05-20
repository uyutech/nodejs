/**
 * Created by army8735 on 2018/3/29.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Controller extends egg.Controller {
  async index() {
    const { ctx } = this;
    let uid = ctx.session.uid;
    await ctx.render('dcount', {});
  }

  async authorSkillWorks() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    if(uid !== 2018000000000002) {
      return ctx.body = uid;
    }
    let id = parseInt(ctx.params.id);
    if(!id) {
      return ctx.body = 'no author id';
    }
    let worksList = await app.model.worksAuthorRelation.findAll({
      attributes: [
        ['profession_id', 'professionId'],
        ['works_id', 'worksId']
      ],
      where: {
        author_id: id,
      },
      raw: true,
    });
    let professionIdList = [];
    let professionIdHash = {};
    worksList.forEach((item) => {
      if(!professionIdHash[item.professionId]) {
        professionIdHash[item.professionId] = true;
        professionIdList.push(item.professionId);
      }
    });
    let skillList = await service.profession.skillList(professionIdList);
    let skillHash = {};
    let professionHash = {};
    skillList.forEach((list, i) => {
      let professionId = professionIdList[i];
      let temp = professionHash[professionId] = professionHash[professionId] || [];
      list.forEach((item) => {
        skillHash[item.id] = item;
        temp.push(item);
      });
    });
    let query = [];
    worksList.forEach((item) => {
      let skill = professionHash[item.professionId];
      if(skill) {
        skill.forEach((item2) => {
          query.push(app.model.authorSkillWorks.upsert({
            author_id: id,
            skill_id: item2.id,
            works_id: item.worksId,
            profession_id: item.professionId,
          }, {
            where: {
              author_id: id,
              skill_id: item2.id,
              works_id: item.worksId,
              profession_id: item.professionId,
            },
          }));
        });
      }
    });
    let res = await Promise.all(query);
    ctx.body = ctx.helper.okJSON({
      res,
    });
  }

  async authorCooperation() {
    const { ctx, app } = this;
    let uid = ctx.session.uid;
    if(uid !== 2018000000000002) {
      return ctx.body = uid;
    }
    let id = parseInt(ctx.params.id);
    if(!id) {
      return ctx.body = 'no author id';
    }
    let query = [];
    // 作为大作品作者时
    let worksAuthorList = await app.model.worksAuthorRelation.findAll({
      attributes: [
        ['works_id', 'worksId'],
        ['author_id', 'authorId']
      ],
      where: {
        author_id: id,
      },
      raw: true,
    });
    let worksIdList = [];
    let worksIdHash = {};
    let worksAuthorHash = {};
    worksAuthorList.forEach((item) => {
      let temp = worksAuthorHash[item.worksId] = worksAuthorHash[item.worksId] || [];
      if(item.authorId !== id && temp.indexOf(item.authorId) === -1) {
        temp.push(item.authorId);
      }
      if(!worksIdHash[item.worksId]) {
        worksIdHash[item.worksId] = true;
        worksIdList.push(item.worksId);
      }
    });
    let collectionList = await app.model.worksWorkRelation.findAll({
      attributes: [
        ['works_id', 'worksId'],
        ['work_id', 'workId']
      ],
      where: {
        works_id: worksIdList,
        is_delete: false,
        is_works_delete: false,
        is_work_delete: false,
      },
      raw: true,
    });
    let collectionHash = {};
    let workIdList = [];
    let workIdHash = {};
    collectionList.forEach((item) => {
      let temp = collectionHash[item.worksId] = collectionHash[item.worksId] || [];
      temp.push(item.workId);
      if(!workIdHash[item.workId]) {
        workIdHash[item.workId] = true;
        workIdList.push(item.workId);
      }
    });
    let workAuthorList = await app.model.workAuthorRelation.findAll({
      attributes: [
        ['work_id', 'workId'],
        ['author_id', 'authorId']
      ],
      where: {
        work_id: workIdList,
      },
      raw: true,
    });
    let workAuthorHash = {};
    workAuthorList.forEach((item) => {
      let temp = workAuthorHash[item.workId] = workAuthorHash[item.workId] || [];
      if(item.authorId !== id && temp.indexOf(item.authorId) === -1) {
        temp.push(item.authorId);
      }
    });
    Object.keys(worksAuthorHash).forEach((worksId) => {
      // 大作品作者之间
      let worksAuthorList = worksAuthorHash[worksId];
      worksAuthorList.forEach((authorId) => {
        query.push(app.model.authorCooperation.upsert({
          author_id: id,
          target_id: authorId,
          works_id: worksId,
          type: 1,
        }, {
          where: {
            author_id: id,
            target_id: authorId,
            works_id: worksId,
            type: 1,
          },
        }));
        query.push(app.model.authorCooperation.upsert({
          author_id: authorId,
          target_id: id,
          works_id: worksId,
          type: 1,
        }, {
          where: {
            author_id: authorId,
            target_id: id,
            works_id: worksId,
            type: 1,
          },
        }));
      });
      // 大作品和小作品作者之间
      let collection = collectionHash[worksId];
      if(collection) {
        collection.forEach((workId) => {
          let workAuthorList = workAuthorHash[workId];
          if(workAuthorList) {
            workAuthorList.forEach((authorId) => {
              query.push(app.model.authorCooperation.upsert({
                author_id: id,
                target_id: authorId,
                works_id: worksId,
                work_id: workId,
                type: 2,
              }, {
                where: {
                  author_id: id,
                  target_id: authorId,
                  works_id: worksId,
                  work_id: workId,
                  type: 2,
                },
              }));
              query.push(app.model.authorCooperation.upsert({
                author_id: authorId,
                target_id: id,
                works_id: worksId,
                work_id: workId,
                type: 3,
              }, {
                where: {
                  author_id: authorId,
                  target_id: id,
                  works_id: worksId,
                  work_id: workId,
                  type: 3,
                },
              }));
            });
          }
        });
      }
    });
    // 作为小作品作者时
    workAuthorList = await app.model.workAuthorRelation.findAll({
      attributes: [
        ['work_id', 'workId'],
        ['author_id', 'authorId']
      ],
      where: {
        author_id: id,
      },
      raw: true,
    });
    workIdList = [];
    workIdHash = {};
    workAuthorList.forEach((item) => {
      if(!workIdHash[item.workId]) {
        workIdHash[item.workId] = true;
        workIdList.push(item.workId);
      }
    });
    [workAuthorList, collectionList] = await Promise.all([
      app.model.workAuthorRelation.findAll({
        attributes: [
          ['work_id', 'workId'],
          ['author_id', 'authorId']
        ],
        where: {
          work_id: workIdList,
        },
        raw: true,
      }),
      app.model.worksWorkRelation.findAll({
        attributes: [
          ['works_id', 'worksId'],
          ['work_id', 'workId']
        ],
        where: {
          work_id: workIdList,
          is_delete: false,
        },
        raw: true,
      })
    ]);
    workAuthorHash = {};
    workAuthorList.forEach((item) => {
      let temp = workAuthorHash[item.workId] = workAuthorHash[item.workId] || [];
      if(temp.indexOf(item.authorId) === -1) {
        temp.push(item.authorId);
      }
      if(!workIdHash[item.workId]) {
        workIdHash[item.workId] = true;
        workIdList.push(item.workId);
      }
    });
    collectionHash = {};
    worksIdList = [];
    worksIdHash = {};
    collectionList.forEach((item) => {
      let temp = collectionHash[item.worksId] = collectionHash[item.worksId] || [];
      temp.push(item.workId);
      if(!worksIdHash[item.worksId]) {
        worksIdHash[item.worksId] = true;
        worksIdList.push(item.worksId);
      }
    });
    worksAuthorList = await app.model.worksAuthorRelation.findAll({
      attributes: [
        ['works_id', 'worksId'],
        ['author_id', 'authorId']
      ],
      where: {
        works_id: worksIdList,
      },
      raw: true,
    });
    worksAuthorHash = {};
    worksAuthorList.forEach((item) => {
      let temp = worksAuthorHash[item.worksId] = worksAuthorHash[item.worksId] || [];
      if(temp.indexOf(item.authorId) === -1) {
        temp.push(item.authorId);
      }
    });
    Object.keys(worksAuthorHash).forEach((worksId) => {
      let worksAuthorList = worksAuthorHash[worksId];
      let collection = collectionHash[worksId];
      if(collection) {
        collection.forEach((workId) => {
          let workAuthorList = workAuthorHash[workId];
          if(workAuthorList) {
            // 小作品自己的所有作者之间
            for(let i = 0, len = workAuthorList.length; i < len - 1; i++) {
              for(let j = i + 1; j < len; j++) {
                if(workAuthorList[i] !== id && workAuthorList[j] !== id) {
                  continue;
                }
                query.push(app.model.authorCooperation.upsert({
                  author_id: workAuthorList[i],
                  target_id: workAuthorList[j],
                  works_id: worksId,
                  work_id: workId,
                  type: 4,
                }, {
                  where: {
                    author_id: workAuthorList[i],
                    target_id: workAuthorList[j],
                    works_id: worksId,
                    work_id: workId,
                    type: 4,
                  },
                }));
                query.push(app.model.authorCooperation.upsert({
                  author_id: workAuthorList[j],
                  target_id: workAuthorList[i],
                  works_id: worksId,
                  work_id: workId,
                  type: 4,
                }, {
                  where: {
                    author_id: workAuthorList[j],
                    target_id: workAuthorList[i],
                    works_id: worksId,
                    work_id: workId,
                    type: 4,
                  },
                }));
              }
            }
            // 大作品和小作品作者之间
            workAuthorList.forEach((w) => {
              worksAuthorList.forEach((ws) => {
                if(w === ws) {
                  return;
                }
                if(w !== id) {
                  return;
                }
                query.push(app.model.authorCooperation.upsert({
                  author_id: w,
                  target_id: ws,
                  works_id: worksId,
                  work_id: workId,
                  type: 3,
                }, {
                  where: {
                    author_id: w,
                    target_id: ws,
                    works_id: worksId,
                    work_id: workId,
                    type: 3,
                  },
                }));
                query.push(app.model.authorCooperation.upsert({
                  author_id: ws,
                  target_id: w,
                  works_id: worksId,
                  work_id: workId,
                  type: 2,
                }, {
                  where: {
                    author_id: ws,
                    target_id: w,
                    works_id: worksId,
                    work_id: workId,
                    type: 2,
                  },
                }));
              });
            });
          }
        });
      }
    });
    ctx.body = await Promise.all(query);
  }
}

module.exports = Controller;
