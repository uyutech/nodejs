/**
 * Created by army8735 on 2018/3/25.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const CACHE_TIME = 10;

class Service extends egg.Service {
  /**
   * 根据小作品id和klass获取完整信息
   * @param id:int 小作品id
   * @param klass:int 小作品分类（视频、音频等）
   * @returns Object
   */
  async infoPlus(id, klass) {
    if(!id || !klass) {
      return;
    }
    const { app } = this;
    let cacheKey = 'workInfoPlus_' + id;
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
      return null;
    }
    return res;
  }

  /**
   * 根据小作品id获取基本信息
   * @param id:int 小作品id
   * @returns Object
   */
  async info(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'workInfo_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let query = await app.model.work.findOne({
      attributes: [
        'id',
        'title',
        'class',
        'type',
      ],
      where: {
        id,
        is_deleted: false,
      },
    });
    if(query) {
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(query));
    }
    else {
      app.redis.setex(cacheKey, CACHE_TIME, null);
    }
    return query;
  }

  /**
   * 根据小作品id列表获取基本信息
   * @param idList:Array<int> 小作品id列表
   * @returns Array<Object>
   */
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
        return app.redis.get('workInfo_' + id);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('workInfo_' + id, CACHE_TIME);
      }
      else if(id !== null && id !== undefined) {
        if(!noCacheIdHash[id]) {
          noCacheIdHash[id] = true;
          noCacheIdList.push(id);
        }
        noCacheIndexList.push(i);
      }
    });
    if(noCacheIdList.length) {
      let sql = `SELECT
        id,
        title,
        class,
        type
        FROM work
        WHERE id IN (${noCacheIdList.join(', ')});`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          hash[item.id] = item;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let temp = hash[id];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('workInfo_' + id, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('workInfo_' + id, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 根据小作品id和klass列表获取完整信息
   * @param list:Array<{id:int, klass:int}> 小作品id
   * @returns Array<Object>
   */
  async infoPlusList(list) {
    if(!list) {
      return;
    }
    if(!list.length) {
      return [];
    }
    const self = this;
    let res = await Promise.all(list.map(function(item) {
      return self.infoPlus(item.id, item.class);
    }));
    return res;
  }
  async author(id) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'workAuthor_' + id;
    let res = await app.reids.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = `SELECT
      work_author_profession_relation.work_id AS workId,
      work_author_profession_relation.author_id AS authorId,
      work_author_profession_relation.profession_id AS professionId,
      profession.type,
      profession.type_name AS typeName,
      profession.kind,
      profession.kind_name AS kindName
      FROM work_author_profession_relation, profession
      WHERE work_author_profession_relation.work_id=${id}
      AND work_author_profession_relation.is_deleted=false
      AND work_author_profession_relation.profession_id=profession.id;`;
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
  async userRelationList(list, uid) {
    if(!list || !uid) {
      return;
    }
    if(!list.length) {
      return [];
    }
    const { app, service } = this;
    let cache = await Promise.all(list.map(function(item) {
      return app.redis.get('userWorkRelation_' + uid + '_' + item.id);
    }));
    let res = [];
    let noCacheIdList = [];
    cache.forEach(function(userWorkRelation, i) {
      let id = list[i].id;
      if(userWorkRelation) {
        userWorkRelation = JSON.parse(userWorkRelation);
        res[i] = userWorkRelation;
        app.redis.expire('userWorkRelation_' + uid + '_' + id, CACHE_TIME);
      }
      else {
        noCacheIdList.push(id);
      }
    });
    if(noCacheIdList.length) {
      let sql = `SELECT
        type,
        work_id AS workId
        FROM user_work_relation
        WHERE user_id=${uid}
        AND work_id IN (${noCacheIdList.join(', ')})
        AND is_deleted=false`;
      let query = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(query.length) {
        let hash = {};
        query.forEach(function(item) {
          let temp = hash[item.workId] = hash[item.workId] || {};
          if(item.type === 1) {
            temp.isFavored = true;
          }
          else {
            temp.isLiked = true;
          }
        });
        for(let i = 0, len = list.length; i < len; i++) {
          let id = list[i].id;
          let item = hash[id];
          if(!res[i] && item) {
            res[i] = item;
            app.redis.setex('userWorkRelation_' + uid + '_' + id, CACHE_TIME, JSON.stringify(item));
          }
        }
      }
    }
    return res;
  }
  async like(worksId, workId, uid, is) {
    if(!worksId || !worksId || !uid) {
      return;
    }
    const { app } = this;
    let query = await app.model.userWorkRelation.findOne({
      where: {
        user_id: uid,
        type: 0,
        work_id: workId,
      },
    });
    if(query) {
      let res = await query.update({
        is_deleted: !is,
        update_time: new Date(),
      }, {
        where: {
          user_id: uid,
          type: 0,
          work_id: workId,
        },
      });
      if(!res) {
        return;
      }
    }
    else {
      let temp = await this.info(workId);
      if(!temp) {
        return;
      }
      let klass = temp.class;
      let now = new Date();
      let res = await app.model.userWorkRelation.create({
        user_id: uid,
        type: 0,
        work_id: workId,
        works_id: worksId,
        class: klass,
        is_deleted: false,
        create_time: now,
        update_time: now,
      });
      if(!res) {
        return;
      }
    }
    app.redis.del('userWorkRelation_' + uid + '_' + workId);
    return {
      is,
    };
  }
  async favor(worksId, workId, uid, is) {
    if(!worksId || !worksId || !uid) {
      return;
    }
    const { app } = this;
    let query = await app.model.userWorkRelation.findOne({
      where: {
        user_id: uid,
        type: 1,
        work_id: workId,
      },
    });
    if(query) {
      let res = await query.update({
        is_deleted: !is,
        update_time: new Date(),
      }, {
        where: {
          user_id: uid,
          type: 1,
          work_id: workId,
        },
      });
      if(!res) {
        return;
      }
    }
    else {
      let temp = await this.info(workId);
      if(!temp) {
        return;
      }
      let klass = temp.class;
      let now = new Date();
      let res = await app.model.userWorkRelation.create({
        user_id: uid,
        type: 1,
        work_id: workId,
        works_id: worksId,
        class: klass,
        is_deleted: false,
        create_time: now,
        update_time: now,
      });
      if(!res) {
        return;
      }
    }
    app.redis.del('userWorkRelation_' + uid + '_' + workId);
    return {
      is,
    };
  }
  classList2InfoList(classList) {
    return classList.map(function(klass) {
      return {
        klass,
        name: {
          1: '视频',
          2: '音频',
          3: '图片',
        }[klass],
      };
    });
  }
}

module.exports = Service;
