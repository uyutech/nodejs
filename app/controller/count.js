/**
 * Created by army8735 on 2018/3/29.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Controller extends egg.Controller {
  async authorSkill() {
    const { ctx, app } = this;
    let uid = ctx.session.uid;
    if(uid !== 2018000000000002) {
      return ctx.body = uid;
    }
    let id = parseInt(ctx.query.id);
    ctx.body = '';
    let where = {
      is_delete: false,
    };
    if(id) {
      where.author_id = id;
    }
    let [ws, w, m, i] = await Promise.all([
      app.model.worksAuthorRelation.findAll({
        attributes: [
          ['author_id', 'authorId'],
          ['profession_id', 'professionId']
        ],
        where,
        raw: true,
      }),
      app.model.workAuthorRelation.findAll({
        attributes: [
          ['author_id', 'authorId'],
          ['profession_id', 'professionId']
        ],
        where,
        raw: true,
      }),
      app.model.musicAlbumAuthorRelation.findAll({
        attributes: [
          ['author_id', 'authorId'],
          ['profession_id', 'professionId']
        ],
        where,
        raw: true,
      }),
      app.model.imageAlbumAuthorRelation.findAll({
        attributes: [
          ['author_id', 'authorId'],
          ['profession_id', 'professionId']
        ],
        where,
        raw: true,
      })
    ]);
    let authorHash = {};
    let professionIdList = [];
    let professionIdHash = {};
    ws.forEach((item) => {
      let temp = authorHash[item.authorId] = authorHash[item.authorId] || [];
      temp.push(item.professionId);
      if(!professionIdHash[item.professionId]) {
        professionIdHash[item.professionId] = true;
        professionIdList.push(item.professionId);
      }
    });
    w.forEach((item) => {
      let temp = authorHash[item.authorId] = authorHash[item.authorId] || [];
      temp.push(item.professionId);
      if(!professionIdHash[item.professionId]) {
        professionIdHash[item.professionId] = true;
        professionIdList.push(item.professionId);
      }
    });
    m.forEach((item) => {
      let temp = authorHash[item.authorId] = authorHash[item.authorId] || [];
      temp.push(item.professionId);
      if(!professionIdHash[item.professionId]) {
        professionIdHash[item.professionId] = true;
        professionIdList.push(item.professionId);
      }
    });
    i.forEach((item) => {
      let temp = authorHash[item.authorId] = authorHash[item.authorId] || [];
      temp.push(item.professionId);
      if(!professionIdHash[item.professionId]) {
        professionIdHash[item.professionId] = true;
        professionIdList.push(item.professionId);
      }
    });
    let ps = await app.model.professionSkillRelation.findAll({
      attributes: [
        ['profession_id', 'professionId'],
        ['skill_id', 'skillId'],
        'point'
      ],
      where: {
        profession_id: professionIdList,
      },
      raw: true,
    });
    let psHash = {};
    ps.forEach((item) => {
      let temp = psHash[item.professionId] = psHash[item.professionId] || [];
      temp.push({
        skill: item.skillId,
        point: item.point,
      });
    });
    let asHash = {};
    Object.keys(authorHash).forEach((aid) => {
      let author = authorHash[aid];
      author.forEach((pid) => {
        let list = psHash[pid];
        if(list) {
          list.forEach((item) => {
            let temp = asHash[aid] = asHash[aid] || {};
            temp[item.skill] = temp[item.skill] || 0;
            temp[item.skill] += item.point;
          });
        }
      });
    });
    let query = [];
    Object.keys(asHash).forEach((aid) => {
      let obj = asHash[aid];
      Object.keys(obj).forEach((sid) => {
        query.push(app.model.authorSkillRelation.upsert({
          author_id: aid,
          skill_id: sid,
          point: obj[sid],
          update_time: new Date(),
        }, {
          where: {
            author_id: aid,
            skill_id: sid,
          },
        }));
      });
    });
    await Promise.all(query);
    ctx.body = asHash;
  }
}

module.exports = Controller;
