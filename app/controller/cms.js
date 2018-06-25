/**
 * Created by army8735 on 2018/5/20.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Controller extends egg.Controller {
  async index() {
    const { ctx, app } = this;
    let [worksNum, worksLimit, postNum, postLimit, circlingTypeIsAllPost] = await Promise.all([
      app.redis.get('recommendWorksNum'),
      app.redis.get('recommendWorksLimit'),
      app.redis.get('recommendPostNum'),
      app.redis.get('recommendPostLimit'),
      app.redis.get('circlingTypeIsAllPost')
    ]);
    if(worksNum) {
      worksNum = JSON.parse(worksNum);
    }
    worksNum = worksNum || 2;
    if(worksLimit) {
      worksLimit = JSON.parse(worksLimit);
    }
    worksLimit = worksLimit || 100;
    if(postNum) {
      postNum = JSON.parse(postNum);
    }
    postNum = postNum || 2;
    if(postLimit) {
      postLimit = JSON.parse(postLimit);
    }
    postLimit = postLimit || 100;
    if(circlingTypeIsAllPost) {
      circlingTypeIsAllPost = JSON.parse(circlingTypeIsAllPost);
    }
    circlingTypeIsAllPost = !!circlingTypeIsAllPost;
    await ctx.render('cindex', {
      worksNum,
      worksLimit,
      postNum,
      postLimit,
      circlingTypeIsAllPost,
    });
  }

  async authorSkillWorks() {
    const { ctx, app, service } = this;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return ctx.body = ctx.helper.errorJSON('no author id');
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

  async allUser() {
    const { ctx, app } = this;
    let res = await app.model.user.findAll({
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

  async sendLetter() {
    const { ctx, app } = this;
    let body = ctx.request.body;
    let senderId = body.senderId;
    let idList = body.idList;
    let content = body.content || '';
    if(!/^2018\d{12}$/.test(senderId)) {
      return ctx.body = ctx.helper.errorJSON('发送者id不合法：' + senderId);
    }
    for(let i = 0; i < idList.length; i++) {
      if(!/^2018\d{12}$/.test(idList[i])) {
        return ctx.body = ctx.helper.errorJSON('用户id不合法：' + idList[i]);
      }
    }
    if(!content) {
      return ctx.body = ctx.helper.errorJSON('内容为空');
    }
    let query = [];
    for(let i = 0; i < idList.length; i++) {
      let uid = parseInt(idList[i]);
      if(uid === senderId) {
        continue;
      }
      query.push(app.model.letter.create({
        user_id: senderId,
        target_id: uid,
        key: senderId < uid ? (senderId + '' + uid) : (uid + '' + senderId),
        content,
      }, {
        raw: true,
      }));
    }
    let res = await Promise.all(query);
    query = [];
    let now = new Date();
    for(let i = 0; i < res.length; i++) {
      let item = res[i];
      query.push(app.model.letterRecent.upsert({
        user_id: item.user_id,
        target_id: item.target_id,
        letter_id: item.id,
        update_time: now,
      }, {
        where: {
          user_id: item.user_id,
          target_id: item.target_id,
        },
      }));
      query.push(app.model.letterRecent.upsert({
        user_id: item.target_id,
        target_id: item.user_id,
        letter_id: item.id,
        update_time: now,
      }, {
        where: {
          user_id: item.target_id,
          target_id: item.user_id,
        },
      }));
    }
    res = await Promise.all(query);
    ctx.body = ctx.helper.okJSON(res);
  }

  async setRecommend() {
    const { ctx, app } = this;
    let body = ctx.request.body;
    let worksNum = parseInt(body.worksNum);
    let worksLimit = parseInt(body.worksLimit);
    let postNum = parseInt(body.postNum);
    let postLimit = parseInt(body.postLimit);
    if(!worksNum || !worksLimit || !postNum || !postLimit) {
      return;
    }
    let res = await Promise.all([
      app.redis.set('recommendWorksNum', worksNum),
      app.redis.set('recommendWorksLimit', worksLimit),
      app.redis.set('recommendPostNum', postNum),
      app.redis.set('recommendPostLimit', postLimit)
    ]);
    ctx.body = ctx.helper.okJSON(res);
  }

  async setCirclingType() {
    const { ctx, app } = this;
    let body = ctx.request.body;
    let circlingTypeIsAllPost = body.circlingTypeIsAllPost === 'true';
    let res = await app.redis.set('circlingTypeIsAllPost', circlingTypeIsAllPost);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
