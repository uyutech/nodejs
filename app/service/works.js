/**
 * Created by army8735 on 2018/3/19.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Service extends egg.Service {
  async info(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'worksInfo_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, 120);
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
      app.redis.setex(cacheKey, 120, JSON.stringify(res));
    }
    return res;
  }
  async children(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'worksList_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, 120);
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
      app.redis.setex(cacheKey, 120, JSON.stringify(res));
    }
    return res;
  }
}

module.exports = Service;
