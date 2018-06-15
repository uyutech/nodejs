/**
 * Created by army8735 on 2018/4/23.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

const TYPE_NAME = {
  1: '作者动态',
  2: '作品发布',
  3: '精选',
  5: '公告',
  6: '活动',
  7: '专题',
  8: '长评',
};

class Service extends egg.Service {
  async recommendComment(offset, limit) {
    const { app, service } = this;
    let cacheKey = 'circlingRecommendComment';
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.circlingComment.findAll({
        attributes: [
          ['comment_id', 'commentId'],
          'type'
        ],
        where: {
          is_delete: false,
        },
        order: [
          ['weight', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let idList = res.map((item) => {
      return item.commentId;
    });
    let infoList = await service.post.infoList(idList);
    infoList.forEach((item, i) => {
      if(item) {
        item.type = res[i].type;
        item.typeName = TYPE_NAME[res[i].type];
      }
    });
    return infoList;
  }

  /**
   * 获取推荐内容
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{ data: Array<Object>, count: int }
   */
  async post(uid, offset, limit) {
    let [data, count] = await Promise.all([
      this.postData(uid, offset, limit),
      this.postCount()
    ]);
    return {
      data,
      count,
    };
  }

  async postData(uid, offset, limit) {
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'circlingPost_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.circlingPost.findAll({
        attributes: [
          ['comment_id', 'commentId'],
          'tag'
        ],
        where: {
          is_delete: false,
        },
        order: [
          'weight'
        ],
        offset,
        limit,
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let idList = [];
    let tagHash = {};
    res.forEach((item) => {
      idList.push(item.commentId);
      if(item.tag) {
        tagHash[item.commentId] = item.tag;
      }
    });
    let postList = await service.post.infoList(idList);
    postList.forEach((item) => {
      item.tag = tagHash[item.id];
    });
    return postList;
  }

  async postCount() {
    const { app } = this;
    let cacheKey = 'circlingPostCount';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.circlingPost.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        is_delete: false,
      },
      raw: true,
    });
    if(res) {
      res = res.num || 0;
    }
    else {
      res = 0;
    }
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }
}

module.exports = Service;
