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
    let cacheKey = 'authorInfo_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = `SELECT
      author.id,
      author.name,
      author.head_url AS headUrl,
      author.sign,
      author.fans_name AS fansName,
      author.fans_circle_name AS fansCircleName
      author.is_settled AS isSettled
      FROM author
      WHERE id=${id}
      AND is_deleted=false;`;
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(res.length) {
      res = res[0];
    }
    else {
      res = null;
    }
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }
  async infoList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        return app.redis.get('authorInfo_' + id);
      })
    );
    let noCacheIdList = [];
    cache.forEach(function(item, i) {
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('authorInfo_' + idList[i], CACHE_TIME);
      }
      else if(idList[i] !== null && idList[i] !== undefined) {
        noCacheIdList.push(idList[i]);
      }
    });
    if(noCacheIdList.length) {
      let sql = `SELECT
        author.id,
        author.name,
        author.head_url AS headUrl,
        author.sign,
        author.fans_name AS fansName,
        author.fans_circle_name AS fansCircleName,
        author.is_settled AS isSettled
        FROM author
        WHERE id IN(${noCacheIdList.join(', ')})
        AND is_deleted=false;`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      let hash = {};
      res.forEach(function(item) {
        let id = item.id;
        hash[id] = item;
        app.redis.setex('authorInfo_' + id, CACHE_TIME, JSON.stringify(item));
      });
      cache.forEach(function(item, i) {
        let id = idList[i];
        if(!item && hash[id]) {
          cache[i] = hash[id];
        }
      });
    }
    return cache;
  }
}

module.exports = Service;
