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
    let cacheKey = 'userInfo_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = `SELECT
      user.id,
      user.nickname,
      user.head_url AS headUrl,
      user.sign,
      user.coins
      FROM user
      WHERE id=${id};`;
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
        return app.redis.get('userInfo_' + id);
      })
    );
    let qs = [];
    let hash = {};
    cache.forEach(function(item, i) {
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('userInfo_' + idList[i], CACHE_TIME);
      }
      else {
        hash[qs.length] = i;
        qs.push(idList[i]);
      }
    });
    if(qs.length) {
      let sql = `SELECT
        user.id,
        user.nickname,
        user.head_url AS headUrl,
        user.sign,
        user.coins
        FROM user
        WHERE id IN(${qs.join(', ')});`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      res.forEach(function(item, i) {
        let id = item.userId;
        cache[hash[i]] = item;
        app.redis.setex('userInfo_' + id, CACHE_TIME, JSON.stringify(item));
      });
    }
    return cache;
  }
}

module.exports = Service;
