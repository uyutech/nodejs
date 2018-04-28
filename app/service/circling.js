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
}

module.exports = Service;
