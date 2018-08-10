/**
 * Created by army8735 on 2018/6/10.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async tag() {
    const { app, ctx, service } = this;
    let res = await app.model.guideTag.findAll({
      attributes: [
        ['tag_id', 'tagId']
      ],
      where: {
        is_delete: false,
      },
      order: [
        ['weight', 'DESC']
      ],
      raw: true,
    });
    let idList = res.map((item) => {
      return item.tagId;
    });
    let tagList = await service.tag.infoList(idList);
    ctx.body = ctx.helper.okJSON(tagList);
  }

  async followTag() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let idList = body.idList;
    if(idList) {
      let circleIdList = await app.model.circleTagRelation.findAll({
        attributes: [
          ['circle_id', 'circleId']
        ],
        where: {
          tag_id: idList,
          type: 1,
        },
        raw: true,
      });
      let query = circleIdList.map((item) => {
        let id = item.circleId;
        return app.model.userCircleRelation.upsert({
          user_id: uid,
          circle_id: id,
          type: 1,
        }, {
          where: {
            user_id: uid,
            circle_id: id,
          },
          raw: true,
        });
      });
      idList.forEach((id) => {
        query.push(
          app.model.userTagRelation.upsert({
            user_id: uid,
            tag_id: id,
            ref: 1,
            type: 1,
          }, {
            where: {
              user_id: uid,
              tag_id: id,
            },
            raw: true,
          })
        );
      });
      await query;
    }
    app.model.user.update({
      reg_state: 12,
    }, {
      where: {
        id: uid,
      },
    });
    service.user.clearInfoCache(uid);
    ctx.body = ctx.helper.okJSON();
  }

  async settle() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let [allSkills, author, user] = await Promise.all([
      service.skill.allSkills(),
      service.user.author(uid, 1),
      service.user.info(uid)
    ]);
    ctx.body = ctx.helper.okJSON({
      allSkills,
      author,
      user,
    });
  }

  async setSettle() {
    const { app, ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let skill = body.skill;
    let name = body.name;
    if(!Array.isArray(skill) || !name) {
      return;
    }
    let author = await service.user.author(uid);
    let authorId ;
    if(!author || !author.length) {
      let [check, last] = await Promise.all([
        app.model.author.findOne({
          attributes: [
            'id'
          ],
          where: {
            name,
          },
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
      ]);
      if(check) {
        return ctx.body = ctx.helper.errorJSON('不能重名哦~');
      }
      authorId = last.id + Math.floor(Math.random() * 2) + 1;
      let transaction = await app.sequelizeCircling.transaction();
      try {
        [author] = await Promise.all([
          await app.model.author.create({
            id: authorId,
            name,
            is_settle: true,
          }, {
            raw: true,
            transaction,
          }),
          app.model.userAuthorRelation.upsert({
            user_id: uid,
            author_id: authorId,
            type: 1,
            settle: 1,
          }, {
            where: {
              user_id: uid,
              author_id: authorId,
            },
            transaction,
          })
        ]);
        await transaction.commit();
      }
      catch(e) {
        await transaction.rollback();
        return ctx.body = ctx.helper.errorJSON(e.toString());
      }
    }
    else {
      author = author[0];
      let check = await app.model.author.findOne({
        attributes: [
          'id'
        ],
        where: {
          name,
          id: {
            $ne: authorId,
          },
        },
        raw: true,
      });
      if(check) {
        return ctx.body = ctx.helper.errorJSON('不能重名哦~');
      }
      authorId = author.id;
    }
    let query = skill.map((id) => {
      return app.model.authorSkillRelation.upsert({
        author_id: authorId,
        skill_id: id,
      }, {
        where: {
          author_id: authorId,
          skill_id: id,
          point: {
            $gt: 0,
          },
          level: {
            $gt: 0,
          },
        },
      });
    });
    query.push(
      app.model.user.update({
        reg_state: 100,
      }, {
        where: {
          id: uid,
        },
      }),
      service.user.clearInfoCache(uid)
    );
    if(author.name !== name) {
      query.push(
        app.model.author.update({
          name,
        }, {
          where: {
            id: authorId,
          },
        })
      )
    }
    await Promise.all(query);
    let [user, author2] = await Promise.all([
      service.user.info(uid),
      service.user.author(uid)
    ]);
    ctx.body = ctx.helper.okJSON({
      user,
      author: author2,
    });
  }
}

module.exports = Controller;
