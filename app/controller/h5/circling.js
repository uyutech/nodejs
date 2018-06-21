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
    let [bannerList, newest, hottest, recommendWorks, recommendPost, recommendComment, postList] = await Promise.all([
      app.redis.get('banner'),
      service.works.newest(uid, 0, 10),
      service.works.hottest(uid, 0, 50),
      service.recommend.works(uid, 0, 100),
      service.recommend.post(uid, 0, 100),
      service.circling.recommendComment(0, 100),
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

    newest = newest.data;
    newest = newest.filter((item) => {
      if(!item) {
        return false;
      }
      if(!item.collection || !item.collection.length) {
        return false;
      }
      let work = item.collection[0];
      if(work.kind !== 1 && work.kind !== 2) {
        return false;
      }
      return true;
    });

    hottest = hottest.data;
    hottest = hottest.filter((item) => {
      if(!item) {
        return false;
      }
      if(!item.collection || !item.collection.length) {
        return false;
      }
      let work = item.collection[0];
      if(work.type !== 1 && work.type !== 2) {
        return false;
      }
      return true;
    });

    recommendWorks = recommendWorks.data;
    recommendWorks = recommendWorks.filter((item) => {
      if(!item) {
        return false;
      }
      if(!item.collection || !item.collection.length) {
        return false;
      }
      let work = item.collection[0];
      if(work.type !== 1 && work.type !== 2) {
        return false;
      }
      return true;
    });

    let works = [];
    // uid不同a/b
    if(!uid || uid < 2018000000050817) {
      for(let i = 0; i < 3; i++) {
        if(!newest.length) {
          break;
        }
        let rand = Math.floor(Math.random() * newest.length);
        let item = newest.splice(rand, 1)[0];
        works.push(item);
      }
      for(let i = 0; i < 1; i++) {
        if(!hottest.length) {
          break;
        }
        let rand = Math.floor(Math.random() * hottest.length);
        let item = hottest.splice(rand, 1)[0];
        works.push(item);
      }
    }
    else if(uid % 2 === 1) {
      for(let i = 0; i < 1; i++) {
        if(!hottest.length) {
          break;
        }
        let rand = Math.floor(Math.random() * hottest.length);
        let item = hottest.splice(rand, 1)[0];
        works.push(item);
      }
      for(let i = 0; i < 1; i++) {
        if(!newest.length) {
          break;
        }
        let rand = Math.floor(Math.random() * newest.length);
        let item = newest.splice(rand, 1)[0];
        works.push(item);
      }
    }
    else {
      for(let i = 0; i < 5; i++) {
        if(!hottest.length) {
          break;
        }
        let rand = Math.floor(Math.random() * hottest.length);
        let item = hottest.splice(rand, 1)[0];
        works.push(item);
      }
      for(let i = 0; i < 2; i++) {
        if(!newest.length) {
          break;
        }
        let rand = Math.floor(Math.random() * newest.length);
        let item = newest.splice(rand, 1)[0];
        works.push(item);
      }
    }

    // for(let i = 0; i < 2; i++) {
    //   if(!recommendWorks.length) {
    //     break;
    //   }
    //   let rand = Math.floor(Math.random() * recommendWorks.length);
    //   let item = recommendWorks.splice(rand, 1)[0];
    //   works.push(item);
    // }

    let post = [];

    recommendPost = recommendPost.data;
    recommendPost = recommendPost.filter((item) => {
      return item;
    });
    // for(let i = 0; i < 2; i++) {
    //   if(!recommendPost.length) {
    //     break;
    //   }
    //   let rand = Math.floor(Math.random() * recommendPost.length);
    //   let item = recommendPost.splice(rand, 1)[0];
    //   post.push(item);
    // }

    for(let i = 0; i < 3; i++) {
      if(recommendComment.length) {
        let rand = Math.floor(Math.random() * recommendComment.length);
        post.push(recommendComment.splice(rand, 1)[0]);
      }
    }
    post = await service.comment.plusListFull(post, uid);

    postList.limit = LIMIT;

    ctx.body = ctx.helper.okJSON({
      bannerList,
      newest: [],
      hottest: [],
      works: [],
      recommendWorks: works,
      recommendPost: post,
      recommendComment: [],
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
}

module.exports = Controller;
