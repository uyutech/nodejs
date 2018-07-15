/**
 * Created by army8735 on 2018/7/13.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');
const moment = require('moment');

class Service extends egg.Service {
  async works(offset, limit) {
    let [data, count] = await Promise.all([
      this.worksData(offset, limit),
      this.worksCount()
    ]);
    return {
      data,
      count,
    };
  }

  async worksData(offset, limit) {
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'jsgm_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.jsgm.findAll({
        attributes: [
          'id',
          ['user_id', 'userId'],
          'name',
          'title',
          'inspiration',
          'content',
          'relate',
          'refer',
          'history',
          ['create_time', 'createTime']
        ],
        order: [
          ['id', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let userIdList = [];
    let userIdHash = {};
    res.forEach((item) => {
      if(!userIdHash[item.userId]) {
        userIdHash[item.userId] = true;
        userIdList.push(item.userId);
      }
    });
    let userList = await service.user.infoList(userIdList);
    let userHash = {};
    userList.forEach((item) => {
      userHash[item.id] = item;
    });
    res.forEach((item) => {
      item.user = userHash[item.userId];
    });
    return res;
  }

  async worksCount() {
    const { app } = this;
    let cacheKey = 'jsgmCount';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.jsgm.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
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

  async single(id) {
    const { app } = this;
    let cacheKey = 'jsgmSingle_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.jsgm.findOne({
      attributes: [
        'id',
        ['user_id', 'userId'],
        'name',
        'title',
        'inspiration',
        'content',
        'relate',
        'refer',
        'history',
        ['create_time', 'createTime']
      ],
      where: {
        id,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }
}

module.exports = Service;
