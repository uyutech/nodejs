/**
 * Created by army8735 on 2018/3/25.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const CACHE_TIME = 10;

class Service extends egg.Service {
  async info(id, klass) {
    if(!id || !klass) {
      return;
    }
    const { app } = this;
    let cacheKey = 'workInfo_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    if(klass === 1) {
      let sql = `SELECT
        work_video.id,
        work_video.width,
        work_video.height,
        work_video.time,
        work_video.cover,
        work_video.url
        FROM work_video
        WHERE work_video.id=${id}`;
      res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res && res.length) {
        res = res[0];
        app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
      }
      else {
        app.redis.setex(cacheKey, CACHE_TIME, null);
      }
    }
    else if(klass === 2) {
      let sql = `SELECT
        work_audio.id,
        work_audio.time,
        work_audio.cover,
        work_audio.url,
        work_audio.lrc
        FROM work_audio
        WHERE work_audio.id=${id}`;
      res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res && res.length) {
        res = res[0];
        app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
      }
      else {
        app.redis.setex(cacheKey, CACHE_TIME, null);
      }
    }
    else if(klass === 3) {
      let sql = `SELECT
        work_image.id,
        work_image.width,
        work_image.height,
        work_image.url
        FROM work_image
        WHERE work_image.id=${id}`;
      res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res && res.length) {
        res = res[0];
        app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
      }
      else {
        app.redis.setex(cacheKey, CACHE_TIME, null);
      }
    }
    else if(klass === 4) {
      let sql = `SELECT
        work_text.id,
        work_text.content
        FROM work_text
        WHERE work_text.id=${id}`;
      res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res && res.length) {
        res = res[0];
        app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
      }
      else {
        app.redis.setex(cacheKey, CACHE_TIME, null);
      }
    }
    else {
      return;
    }
    return res;
  }
  async infoList(dataList) {
    if(!dataList) {
      return;
    }
    if(!dataList.length) {
      return [];
    }
    const self = this;
    let res = await Promise.all(dataList.map(function(data) {
      return self.info(data.id, data.class);
    }));
    return res;
  }
}

module.exports = Service;
