/**
 * Created by army8735 on 2018/4/5.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

const CACHE_TIME = 10;

class Service extends egg.Service {
  async banner(tag) {
    if(!tag) {
      return;
    }
    const { app } = this;
    let cacheKey = 'recommendBanner_' + tag;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.recommendBanner.findAll({
      attributes: [
        'title',
        'pic',
        ['target_id', 'targetId'],
        'type'
      ],
      where: {
        tag,
        is_delete: false,
      },
      order: [
        ['weight', 'DESC']
      ],
      raw: true,
    });
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }
  async list(tag, offset, limit) {
    if(!tag) {
      return;
    }
    let [data, count] = await Promise.all([
      this.listData(tag, offset, limit),
      this.listCount(tag)
    ]);
    return { data, count };
  }
  async listData(tag, offset, limit) {
    if(!tag) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'find_' + tag + '_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
      app.redis.expire(cacheKey, CACHE_TIME);
    }
    else {
      res = await app.model.recommend.findAll({
        attributes: [
          'type',
          'title',
          'content',
          'describe'
        ],
        where: {
          tag,
          is_delete: false,
        },
        order: [
          ['weight', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    let worksIdList = [];
    let worksIdHash = {};
    let authorIdList = [];
    let authorIdHash = {};
    res.forEach(function(item) {
      switch(item.type) {
        case 1:
          item.content = item.content.trim();
          if(!worksIdHash[item.content]) {
            worksIdHash[item.content] = true;
            worksIdList.push(item.content);
          }
          break;
        case 4:
          item.content = item.content.trim().split(',');
          item.content.forEach(function(item) {
            if(!authorIdHash[item.trim()]) {
              authorIdHash[item.trim()] = true;
              authorIdList.push(item.trim());
            }
          });
          break;
        case 5:
          item.content = item.content.trim().split(',');
          item.content.forEach(function(item) {
            if(!worksIdHash[item.trim()]) {
              worksIdHash[item.trim()] = true;
              worksIdList.push(item.trim());
            }
          });
          break;
      }
    });
    let [worksList, authorList] = await Promise.all([
      service.works.infoListPlus(worksIdList),
      service.author.infoList(authorIdList)
    ]);
    let worksHash = {};
    worksList.forEach((item) => {
      if(item) {
        if(!worksHash[item.id]) {
          worksHash[item.id] = item;
        }
      }
    });
    let authorHash = {};
    authorList.forEach((item)=> {
      if(item) {
        if(!authorHash[item.id]) {
          authorHash[item.id] = item;
        }
      }
    });
    res.forEach((item) => {
      switch(item.type) {
        case 1:
          item.content = worksHash[item.content];
          break;
        case 4:
          item.content = item.content.map((item) => {
            return authorHash[item];
          }).filter(function(item) {
            return item;
          });
          break;
        case 5:
          item.content = item.content.map((item) => {
            return worksHash[item];
          }).filter((item) => {
            return item;
          });
          break;
      }
    });
    return res;
  }
  async listCount(tag) {
    if(!tag) {
      return;
    }
    const { app } = this;
    let cacheKey = 'findCount_' + tag;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.recommend.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        tag,
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
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 根据kind类型获取推荐列表
   * @param kind:int 类型
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{ count:int, data:Array<Object> }
   */
  async kind(kind, offset, limit) {
    if(!kind) {
      return;
    }
    let [data, count] = await Promise.all([
      this.kindData(kind, offset, limit),
      this.kindCount(kind)
    ]);
    return { data, count };
  }
  async kindData(kind, offset, limit) {
    if(!kind) {
      return;
    }
    kind = parseInt(kind) || 1;
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'findKind_' + kind + '_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
      app.redis.expire(cacheKey, CACHE_TIME);
    }
    else {
      res = await app.model.recommendList.findAll({
        attributes: [
          ['works_id', 'worksId']
        ],
        where: {
          kind,
          is_delete: false,
        },
        order: [
          ['weight', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    let idList = res.map(function(item) {
      return item.worksId;
    });console.log(idList);
    switch(kind) {
      case 1:
        return service.works.infoListPlus(idList);
    }
  }
  async kindCount(kind) {
    if(!kind) {
      return;
    }
    const { app } = this;
    let cacheKey = 'findKindCount_' + kind;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.recommendList.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        kind,
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
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }
}

module.exports = Service;
