/**
 * Created by army8735 on 2018/4/6.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

const LIMIT = 10;

class Controller extends egg.Controller {
  async index() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let [bannerList, recommendComment, circleList, postList] = await Promise.all([
      app.redis.get('banner'),
      service.circling.recommendComment(0, 100),
      service.circle.all(0, LIMIT),
      service.post.all(uid, 0, LIMIT)
    ]);
    if(bannerList) {
      bannerList = JSON.parse(bannerList);
    }
    else {
      bannerList = await app.model.banner.findAll({
        attributes: [
          'title',
          'url',
          ['target_id', 'targetId'],
          'type'
        ],
        where: {
          position: 1,
          is_delete: false,
        },
        order: [
          ['weight', 'DESC']
        ],
        raw: true,
      });
      app.redis.setex('banner', app.config.redis.time, JSON.stringify(bannerList));
    }
    if(circleList) {
      circleList.limit = LIMIT;
    }
    postList.limit = LIMIT;
    let list = [];
    for(let i = 0; i < 3; i++) {
      if(recommendComment.length) {
        let rand = Math.floor(Math.random() * recommendComment.length);
        list.push(recommendComment.splice(rand, 1)[0]);
      }
    }
    list = await service.comment.plusListFull(list, uid);
    ctx.body = ctx.helper.okJSON({
      bannerList,
      recommendComment: list,
      circleList,
      postList,
    });
  }

  async circleList() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let offset = parseInt(body.offset) || 0;
    let res = await service.circle.all(offset, LIMIT);
    if(!res) {
      return;
    }
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async postList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let circleId = (body.circleId || '').split(',');
    let offset = parseInt(body.offset) || 0;
    let res;
    if(circleId.length && circleId[0]) {
      let query = await Promise.all(
        circleId.map((id) => {
          return service.circle.postList(id, uid, offset, LIMIT);
        })
      );
      res = {
        data: [],
        count: 0,
      };
      query.forEach((item) => {
        res.data = res.data.concat(item.data);
        res.count += item.count;
      });
    }
    else {
      res = await service.post.all(uid, offset, LIMIT);
    }
    if(!res) {
      return;
    }
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async index2() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let [bannerList, recommendWorks, recommendPost, postList] = await Promise.all([
      app.redis.get('banner'),
      service.recommend.works(uid),
      service.recommend.post(uid),
      uid ? service.circle.followPost(uid, 0, LIMIT) : service.post.all(uid, 0, LIMIT)
    ]);
    if(bannerList) {
      bannerList = JSON.parse(bannerList);
    }
    else {
      bannerList = await app.model.banner.findAll({
        attributes: [
          'title',
          'url',
          ['target_id', 'targetId'],
          'type'
        ],
        where: {
          position: 1,
          is_delete: false,
        },
        order: [
          ['weight', 'DESC']
        ],
        raw: true,
      });
      app.redis.setex('banner', app.config.redis.time, JSON.stringify(bannerList));
    }
    bannerList.unshift({
      link: 'https://show.bilibili.com/platform/detail.html?id=12757&from=pc',
      url: '//zhuanquan.xin/img/80ee3e9751dfdf071235a69b82e400cd.jpg',
    });

    postList.limit = LIMIT;

    ctx.body = ctx.helper.okJSON({
      bannerList,
      recommendWorks,
      recommendPost,
      postList,
    });
  }

  async postList2() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let offset = parseInt(body.offset) || 0;
    let res = await (uid ? service.circle.followPost(uid, offset, LIMIT) : service.post.all(uid, offset, LIMIT));
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async read() {
    const { ctx, app } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let idList = body.idList;
    if(!uid || !idList || !Array.isArray(idList) || !idList.length) {
      ctx.body = ctx.helper.okJSON();
    }
    let query = [];
    idList.forEach((id) => {
      query.push(
        app.model.userContentRecord.create({
          user_id: uid,
          content_id: id,
          type: 1,
        }),
        app.model.userContentRelation.upsert({
          user_id: uid,
          content_id: id,
          type: 1,
          create_time: new Date(),
        })
      );
    });
    let res = await Promise.all(query);
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
