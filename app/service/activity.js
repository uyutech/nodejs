/**
 * Created by army8735 on 2018/6/29.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

class Service extends egg.Service {
  async ysjxy() {
    let [info, originWorks] = await Promise.all([
      this.ysjxyInfo(),
      this.ysjxyOriginWorks()
    ]);
    return {
      info,
      originWorks,
    };
  }

  async ysjxyInfo() {
    const { app } = this;
    let cacheKey = 'ysjxyInfo';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.activity.findOne({
      attributes: [
        'id',
        'title',
        'describe',
        ['start_time', 'startTime'],
        ['end_time', 'endTime']
      ],
      where: {
        id: 1,
      },
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  async ysjxyOriginWorks() {
    const { app, service } = this;
    let cacheKey = 'ysjxyOriginWorks';
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.activityWorks.findAll({
        attributes: [
          ['works_id', 'worksId'],
          ['origin_url', 'originUrl'],
          ['accompany_url', 'accompanyUrl']
        ],
        where: {
          activity_id: 1,
        },
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let idList = res.map((item) => {
      return item.worksId;
    });
    let [works, collection] = await Promise.all([
      service.works.infoListPlusFull(idList),
      service.works.collectionListFull(idList, undefined, true)
    ]);
    works.forEach((item, i) => {
      if(item) {
        item.collection = collection[i];
        item.originUrl = res[i].originUrl;
        item.accompanyUrl = res[i].accompanyUrl;
      }
    });
    return works;
  }
}

module.exports = Service;
