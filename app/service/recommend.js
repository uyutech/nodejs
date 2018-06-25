/**
 * Created by army8735 on 2018/6/1.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Service extends egg.Service {
  /**
   * 获取推荐的作品
   * @param uid:int 用户id
   * @returns Array<Object>
   */
  async works(uid) {
    const { app, service } = this;
    let cacheKey = 'recommendWorks';
    let [res, num, limit] = await Promise.all([
      app.redis.get(cacheKey),
      app.redis.get('recommendWorksNum'),
      app.redis.get('recommendWorksLimit')
    ]);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.content.findAll({
        attributes: [
          'id',
          ['target_id', 'targetId']
        ],
        where: {
          type: 2,
          is_delete: false,
        },
        order: [
          ['weight', 'DESC'],
          ['create_time', 'DESC']
        ],
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    if(num) {
      num = JSON.parse(num);
    }
    num = num || 2;
    if(limit) {
      limit = JSON.parse(limit);
    }
    limit = limit || 100;
    let contentIdList = res.map((item) => {
      return item.id;
    });
    let relation = await app.model.userContentRelation.findAll({
      attributes: [
        ['content_id', 'contentId']
      ],
      where: {
        user_id: uid,
        type: 1,
        content_id: contentIdList,
      },
      raw: true,
    });
    let hash = {};
    relation.forEach((item) => {
      hash[item.contentId] = true;
    });
    // 去除已读
    let allNew = [];
    res.forEach((item) => {
      if(!hash[item.id]) {
        allNew.push(item);
      }
    });
    // 全部已读则选取全部
    if(!allNew.length) {
      allNew = res;
    }
    allNew.splice(limit);
    let worksIdList = [];
    let contentList = [];
    for(let i = 0; i < num; i++) {
      if(!allNew.length) {
        break;
      }
      let rand = Math.floor(Math.random() * allNew.length);
      let item = allNew.splice(rand, 1)[0];
      worksIdList.push(item.targetId);
      contentList.push(item);
    }
    let [works, collection] = await Promise.all([
      service.works.infoListPlusFull(worksIdList),
      service.works.collectionListFull(worksIdList, uid, true)
    ]);
    works.forEach((item, i) => {
      if(item) {
        item.contentId = contentList[i].id;
        item.collection = collection[i];
      }
    });
    return works;
  }

  /**
   * 获取推荐的画圈
   * @param uid:int 用户id
   * @returns Array<Object>
   */
  async post(uid) {
    const { app, service } = this;
    let cacheKey = 'recommendPost';
    let [res, num, limit] = await Promise.all([
      app.redis.get(cacheKey),
      app.redis.get('recommendPostNum'),
      app.redis.get('recommendPostLimit')
    ]);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.content.findAll({
        attributes: [
          'id',
          'label',
          ['target_id', 'targetId']
        ],
        where: {
          type: 1,
          is_delete: false,
        },
        order: [
          ['weight', 'DESC'],
          ['create_time', 'DESC']
        ],
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    if(num) {
      num = JSON.parse(num);
    }
    num = num || 2;
    if(limit) {
      limit = JSON.parse(limit);
    }
    limit = limit || 100;
    let contentIdList = res.map((item) => {
      return item.id;
    });
    let relation = await app.model.userContentRelation.findAll({
      attributes: [
        ['content_id', 'contentId']
      ],
      where: {
        user_id: uid,
        type: 1,
        content_id: contentIdList,
      },
      raw: true,
    });
    let hash = {};
    relation.forEach((item) => {
      hash[item.contentId] = true;
    });
    // 去除已读
    let allNew = [];
    res.forEach((item) => {
      if(!hash[item.id]) {
        allNew.push(item);
      }
    });
    // 全部已读则选取全部
    if(!allNew.length) {
      allNew = res;
    }
    allNew.splice(limit);
    let postIdList = [];
    let contentList = [];
    for(let i = 0; i < num; i++) {
      if(!allNew.length) {
        break;
      }
      let rand = Math.floor(Math.random() * allNew.length);
      let item = allNew.splice(rand, 1)[0];
      postIdList.push(item.targetId);
      contentList.push(item);
    }
    let postList = await service.post.infoList(postIdList, uid);
    postList.forEach((item, i) => {
      if(item) {
        item.contentId = contentList[i].id;
        item.tag = contentList[i].label;
      }
    });
    return postList;
  }
}

module.exports = Service;
