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
  async author(id) {}
  async authorList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app, service } = this;
    let cache = await Promise.all(idList.map(function(id) {
      return app.redis.get('workAuthor_' + id);
    }));
    let exist = {};
    let authorList = [];
    let noCacheIdList = [];
    cache.forEach(function(workAuthorList, i) {
      if(workAuthorList) {
        workAuthorList = JSON.parse(workAuthorList);
        workAuthorList.forEach(function(item) {
          let key = item.authorId + '_' + item.professionId;
          if(!exist[key]) {
            exist[key] = true;
            authorList.push(item);
          }
        });
        app.redis.expire('workAuthor_' + idList[i], CACHE_TIME);
      }
      else {
        noCacheIdList.push(idList[i]);
      }
    });
    if(noCacheIdList.length) {
      let sql = `SELECT
        work_author_profession_relation.work_id AS workId,
        work_author_profession_relation.author_id AS authorId,
        work_author_profession_relation.profession_id AS professionId,
        profession.type,
        profession.type_name AS typeName,
        profession.kind,
        profession.kind_name AS kindName
        FROM work_author_profession_relation, profession
        WHERE work_author_profession_relation.work_id IN (${noCacheIdList.join(', ')})
        AND work_author_profession_relation.is_deleted=false
        AND work_author_profession_relation.profession_id=profession.id;`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          let key = item.authorId + '_' + item.professionId;
          if(!exist[key]) {
            exist[key] = true;
            authorList.push(item);
          }
          hash[item.workId] = hash[item.workId] || [];
          hash[item.workId].push(item);
        });
        noCacheIdList.forEach(function(id) {
          if(hash[id]) {
            app.redis.setex('workAuthor_' + id, CACHE_TIME, JSON.stringify(hash[id]));
          }
        });
      }
    }
    let authorIdList = [];
    authorList.forEach(function(item) {
      if(item.authorId !== null && item.authorId !== undefined) {
        authorIdList.push(item.authorId);
      }
    });
    if(authorIdList.length) {
      let res = await service.author.infoList(authorIdList);
      let authorIdHash = {};
      res.forEach(function(item) {
        let id = item.id;
        if(item && id !== undefined && id !== null) {
          authorIdHash[id] = item;
        }
      });
      authorList.forEach(function(item) {
        let authorInfo = authorIdHash[item.authorId];
        if(authorInfo) {
          item.headUrl = authorInfo.headUrl;
          item.name = authorInfo.name;
          item.isSettled = authorInfo.isSettled;
        }
      });
    }
    return authorList;
  }
}

module.exports = Service;
