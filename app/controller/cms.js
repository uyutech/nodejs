/**
 * Created by army8735 on 2018/5/20.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Controller extends egg.Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('cindex');
  }

  async authorSkillWorks() {
    const { ctx, app, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
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

  async allAuthor() {
    const { ctx, app } = this;
    let res = await app.model.author.findAll({
      attributes: [
        'id'
      ],
      where: {
        is_delete: false,
      },
      raw: true,
    });
    ctx.body = ctx.helper.okJSON(res.map((item) => {
      return item.id;
    }));
  }
}

module.exports = Controller;
