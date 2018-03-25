/**
 * Created by army8735 on 2018/3/19.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const CACHE_TIME = 10;

class Service extends egg.Service {
  async info(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'worksInfo_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = `SELECT
      works.id AS worksId,
      works.title AS worksTitle,
      works.sub_title AS worksSubTitle,
      works.state AS worksState,
      works.cover AS worksCover,
      works.type AS worksType,
      works_type.name AS worksTypeName
    FROM works, works_type
    WHERE works.id=${id}
    AND works.is_authorize=true
    AND works.state>0
    AND works.type=works_type.id`;
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(res && res.length) {
      res = res[0];
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    else {
      app.redis.setex(cacheKey, CACHE_TIME, null);
    }
    return res;
  }
  async children(id) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'worksChildren_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = `SELECT
      works_work_relation.work_id AS workId,
      works_work_relation.describe,
      work.title AS workTitle,
      work.class AS workClass,
      work.type AS workType,
      work_type.name AS workTypeName
    FROM works_work_relation, work, work_type
    WHERE works_work_relation.works_id=${id}
    AND works_work_relation.is_deleted=false
    AND works_work_relation.work_id=work.id
    AND work.state>0
    AND work.type=work_type.id`;
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(res && res.length) {
      let workList = await service.work.infoList(res);
      res.forEach(function(item, i) {
        Object.assign(item, workList[i]);
      });
    }
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }
}

module.exports = Service;
