/**
 * Created by army8735 on 2018/3/25.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const CACHE_TIME = 10;

class Service extends egg.Service {
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

  /**
   * 根据kind返回类型名
   * @param kind:int 类型
   * @returns string
   */
  getKindName(kind) {
    return {
      1: '视频',
      2: '音频',
      3: '图片',
      4: '文字',
    }[kind] || '其它';
  }

  /**
   * 根据id列表返回小作品信息
   * @param idList:Array<int>
   * @param kind:int
   * @returns Array<Object>
   */
  async infoList(idList, kind) {
    switch(kind) {
      case 1:
        return await this.videoList(idList);
      case 2:
        return await this.audioList(idList);
      case 3:
        return await this.imageList(idList);
      case 4:
        return await this.textList(idList);
    }
    return [];
  }
  /**
   * 根据id列表获取视频信息
   * @param idList:Array<int>
   * @returns Array<Object>
   */
  async videoList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        if(id !== null && id !== undefined) {
          return app.redis.get('video_' + id);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('video_' + id, CACHE_TIME);
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
        video.id,
        video.title,
        video.width,
        video.height,
        video.duration,
        video.cover,
        video.url,
        video.type,
        work_type.name AS typeName
        FROM video, work_type
        WHERE video.id IN (${noCacheIdList.join(', ')})
        AND video.type=work_type.id`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          let id = item.id;
          hash[id] = item;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let temp = hash[id];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('video_' + id, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('video_' + id, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 根据id列表获取音频信息
   * @param idList:Array<int>
   * @returns Array<Object>
   */
  async audioList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        if(id !== null && id !== undefined) {
          return app.redis.get('audio_' + id);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('audio_' + id, CACHE_TIME);
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
        audio.id,
        audio.title,
        audio.duration,
        audio.cover,
        audio.url,
        audio.type,
        work_type.name AS typeName
        FROM audio, work_type
        WHERE audio.id IN (${noCacheIdList.join(', ')})
        AND audio.type=work_type.id`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          let id = item.id;
          hash[id] = item;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let temp = hash[id];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('audio_' + id, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('audio_' + id, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 根据id列表获取图片信息
   * @param idList:Array<int>
   * @returns Array<Object>
   */
  async imageList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        if(id !== null && id !== undefined) {
          return app.redis.get('image_' + id);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('image_' + id, CACHE_TIME);
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
        image.id,
        image.title,
        image.width,
        image.height,
        image.url,
        image.type,
        work_type.name AS typeName
        FROM image, work_type
        WHERE image.id IN (${noCacheIdList.join(', ')})
        AND image.type=work_type.id`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          let id = item.id;
          hash[id] = item;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let temp = hash[id];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('image_' + id, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('image_' + id, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 根据id列表获取文本信息
   * @param idList:Array<int>
   * @returns Array<Object>
   */
  async textList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        if(id !== null && id !== undefined) {
          return app.redis.get('text_' + id);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('text_' + id, CACHE_TIME);
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
        text.id,
        text.title,
        text.content,
        text.type,
        work_type.name AS typeName
        FROM text, work_type
        WHERE text.id IN (${noCacheIdList.join(', ')})
        AND text.type=work_type.id`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          let id = item.id;
          hash[id] = item;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let temp = hash[id];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('text_' + id, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('text_' + id, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 获取用户对作品的点赞、收藏关系
   * @param idList:Array<int> 作品id
   * @returns {Promise<void>}
   */
  async userVideoRelationList(uid, idList) {
    if(!uid || !idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        if(id !== null && id !== undefined) {
          return app.redis.get('userVideoRelation_' + uid + '_' + id);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('userVideoRelation_' + uid + '_' + id, CACHE_TIME);
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
      let res = await app.model.userWorkRelation.findAll({
        attributes: [
          ['work_id', 'workId'],
          'type'
        ],
        where: {
          user_id: uid,
          work_id: noCacheIdList,
          is_deleted: false,
          kind: 1,
        },
      });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          item = item.toJSON();
          let id = item.workId;
          let type = item.type;
          hash[id] = hash[id] || {};
          hash[id][type] = true;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let temp = hash[id];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('userVideoRelation_' + uid + '_' + id, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('userVideoRelation_' + uid + '_' + id, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 获取用户对作品的点赞、收藏关系
   * @param idList:Array<int> 作品id
   * @returns {Promise<void>}
   */
  async userAudioRelationList(uid, idList) {
    if(!uid || !idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        if(id !== null && id !== undefined) {
          return app.redis.get('userAudioRelation_' + uid + '_' + id);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('userAudioRelation_' + uid + '_' + id, CACHE_TIME);
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
      let res = await app.model.userWorkRelation.findAll({
        attributes: [
          ['work_id', 'workId'],
          'type'
        ],
        where: {
          user_id: uid,
          work_id: noCacheIdList,
          is_deleted: false,
          kind: 2,
        },
      });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          item = item.toJSON();
          let id = item.workId;
          let type = item.type;
          hash[id] = hash[id] || {};
          hash[id][type] = true;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let temp = hash[id];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('userAudioRelation_' + uid + '_' + id, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('userAudioRelation_' + uid + '_' + id, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 获取用户对作品的点赞、收藏关系
   * @param idList:Array<int> 作品id
   * @returns {Promise<void>}
   */
  async userImageRelationList(uid, idList) {
    if(!uid || !idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        if(id !== null && id !== undefined) {
          return app.redis.get('userImageRelation_' + uid + '_' + id);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('userImageRelation_' + uid + '_' + id, CACHE_TIME);
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
      let res = await app.model.userWorkRelation.findAll({
        attributes: [
          ['work_id', 'workId'],
          'type'
        ],
        where: {
          user_id: uid,
          work_id: noCacheIdList,
          is_deleted: false,
          kind: 3,
        },
      });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          item = item.toJSON();
          let id = item.workId;
          let type = item.type;
          hash[id] = hash[id] || {};
          hash[id][type] = true;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let temp = hash[id];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('userImageRelation_' + uid + '_' + id, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('userImageRelation_' + uid + '_' + id, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 获取用户对作品的点赞、收藏关系
   * @param idList:Array<int> 作品id
   * @returns {Promise<void>}
   */
  async userTextRelationList(uid, idList) {
    if(!uid || !idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        if(id !== null && id !== undefined) {
          return app.redis.get('userTextRelation_' + uid + '_' + id);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('userTextRelation_' + uid + '_' + id, CACHE_TIME);
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
      let res = await app.model.userWorkRelation.findAll({
        attributes: [
          ['work_id', 'workId'],
          'type'
        ],
        where: {
          user_id: uid,
          work_id: noCacheIdList,
          is_deleted: false,
          kind: 4,
        },
      });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          item = item.toJSON();
          let id = item.workId;
          let type = item.type;
          hash[id] = hash[id] || {};
          hash[id][type] = true;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let temp = hash[id];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('userTextRelation_' + uid + '_' + id, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('userTextRelation_' + uid + '_' + id, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }
}

module.exports = Service;
