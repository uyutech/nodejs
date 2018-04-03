/**
 * Created by army8735 on 2018/3/25.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('Sequelize');
const squel = require('squel');

const CACHE_TIME = 10;

class Service extends egg.Service {
  /**
   * 点赞作品
   * @param uid:int 用户id
   * @param worksId:int 大作品id
   * @param workId:int 小作品id
   * @param state:bool 状态
   * @returns Object{ state:bool, count:int }
   */
  async like(uid, worksId, workId, state) {
    return await this.operate(uid, worksId, workId, 1, state);
  }

  /**
   * 收藏作品
   * @param uid:int 用户id
   * @param worksId:int 大作品id
   * @param workId:int 小作品id
   * @param state:bool 状态
   * @returns Object{ state:bool, count:int }
   */
  async favor(uid, worksId, workId, state) {
    return await this.operate(uid, worksId, workId, 2, state);
  }

  /**
   * 操作作品
   * @param uid:int 用户id
   * @param worksId:int 大作品id
   * @param workId:int 小作品id
   * @param type:int 操作类型
   * @param state:bool 状态
   * @returns Object{ state:bool, count:int }
   */
  async operate(uid, worksId, workId, type, state) {
    if(!uid || !worksId || !workId || !type) {
      return;
    }
    type = parseInt(type);
    if(type !== 1 && type !== 2) {
      return;
    }
    state = !!state;
    let kind = this.getKind(workId);
    if(!kind) {
      return;
    }
    const { app, ctx } = this;
    // 更新内存中用户对作品关系的状态
    let userRelationCache;
    if(state) {
      userRelationCache = app.redis.setex('userWorkRelation_' + uid + '_' + workId + '_' + type, CACHE_TIME, true);
    }
    else {
      userRelationCache = app.redis.setex('userWorkRelation_' + uid + '_' + workId + '_' + type, CACHE_TIME, false);
    }
    // 入库
    await Promise.all([
      userRelationCache,
      app.model.userWorkRelation.upsert({
        user_id: uid,
        works_id: worksId,
        work_id: workId,
        kind,
        type,
        is_delete: !state,
        update_time: new Date(),
      }, {
        where: {
          work_id: workId,
          type,
          user_id: uid,
        },
      })
    ]);
    // 更新计数，优先内存缓存
    let cacheKey = 'workCount_' + workId + '_' + type;
    let res = await app.redis.get(cacheKey);
    let count;
    if(res) {
      count = JSON.parse(res);
      if(state) {
        count++;
      }
      else {
        count--;
      }
      count = Math.max(count, 0);
      // 可能因为2次操作之间的延迟导致key过期设置超时失败，此时放弃操作内存防止数据不一致
      let expire = await app.redis.expire(cacheKey, CACHE_TIME);
      if(expire) {
        if(state) {
          app.redis.incr(cacheKey);
        }
        else {
          app.redis.decr(cacheKey);
        }
      }
    }
    else {
      res = await app.model.userWorkRelation.findOne({
        attributes: [
          [Sequelize.fn('COUNT', '*'), 'num']
        ],
        where: {
          work_id: workId,
          type,
          is_delete: false,
        },
        raw: true,
      });
      if(res) {
        count = res.num;
        app.redis.setex(cacheKey, CACHE_TIME, count);
      }
      else {
        ctx.logger.error('workCount_%s_%s find null', workId, type);
      }
    }
    return {
      state,
      count,
    };
  }

  /**
   * 根据作品id获取作品类型
   * @param id:int 作品id
   * @returns int
   */
  getKind(id) {
    if(!id) {
      return;
    }
    return {
      2016: 2,
      2020: 1,
      2021: 3,
      2022: 4,
    }[id.slice(0, 4)] || 0;
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
      let sql = squel.select()
        .from('video')
        .from('work_type')
        .field('video.id')
        .field('video.title')
        .field('video.width')
        .field('video.height')
        .field('video.duration')
        .field('video.cover')
        .field('video.url')
        .field('video.type')
        .field('work_type.name', 'typeName')
        .where('video.id IN ?', noCacheIdList)
        .where('video.type=work_type.id')
        .toString();
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
      let sql = squel.select()
        .from('audio')
        .from('work_type')
        .field('audio.id')
        .field('audio.title')
        .field('audio.duration')
        .field('audio.cover')
        .field('audio.url')
        .field('audio.type')
        .field('work_type.name', 'typeName')
        .where('audio.id IN ?', noCacheIdList)
        .where('audio.type=work_type.id')
        .toString();
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
      let sql = squel.select()
        .from('image')
        .from('work_type')
        .field('image.id')
        .field('image.title')
        .field('image.width')
        .field('image.height')
        .field('image.url')
        .field('image.type')
        .field('work_type.name', 'typeName')
        .where('image.id IN ?', noCacheIdList)
        .where('image.type=work_type.id')
        .toString();
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
      let sql = squel.select()
        .from('text')
        .from('work_type')
        .field('text.id')
        .field('text.title')
        .field('text.content')
        .field('text.type')
        .field('work_type.name', 'typeName')
        .where('text.id IN ?', noCacheIdList)
        .where('text.type=work_type.id')
        .toString();
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
   * 获取用户对作品的点赞关系列表
   * @param uid:int 用户id
   * @param idList:Array<int> 作品id
   * @returns Array<Object>
   */
  async userLikeList(uid, idList) {
    return await this.userRelationList(uid, idList, 1);
  }

  /**
   * 获取用户对作品的收藏关系列表
   * @param uid:int 用户id
   * @param idList:Array<int> 作品id
   * @returns Array<Object>
   */
  async userFavorList(uid, idList) {
    return await this.userRelationList(uid, idList, 2);
  }

  async userRelationList(uid, idList, type) {
    if(!uid || !idList || !type) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        if(id !== null && id !== undefined) {
          return app.redis.get('userWorkRelation_' + uid + '_' + id + '_' + type);
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
        app.redis.expire('userWorkRelation_' + uid + '_' + id + '_' + type, CACHE_TIME);
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
          ['work_id', 'workId']
        ],
        where: {
          user_id: uid,
          type,
          work_id: noCacheIdList,
          is_delete: false,
        },
        raw: true,
      });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          let id = item.workId;
          hash[id] = true;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let temp = hash[id];
          if(temp) {
            cache[i] = true;
            app.redis.setex('userWorkRelation_' + uid + '_' + id + '_' + type, CACHE_TIME, true);
          }
          else {
            app.redis.setex('userWorkRelation_' + uid + '_' + id + '_' + type, CACHE_TIME, false);
          }
        });
      }
    }
    return cache;
  }

  /**
   * 获取点赞统计数据
   * @param idList:Array<int> 作品id列表
   * @returns Array<int>
   */
  async likeCount(idList) {
    return await this.countList(idList, 1);
  }

  /**
   * 获取收藏统计数据
   * @param idList:Array<int> 作品id列表
   * @returns Array<int>
   */
  async favorCount(idList) {
    return await this.countList(idList, 2);
  }

  /**
   * 根据id列表和type获取对应数据
   * @param idList:Array<int> 作品id列表
   * @param type:int 数据类型
   * @returns Array<int>
   */
  async countList(idList, type) {
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
          return app.redis.get('workCount_' + id + '_' + type);
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
        app.redis.expire('workCount_' + id + '_' + type, CACHE_TIME);
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
          [Sequelize.fn('COUNT', '*'), 'num']
        ],
        where: {
          work_id: noCacheIdList,
          type,
          is_delete: false,
        },
        group: 'work_id',
        raw: true,
      });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          let id = item.workId;
          hash[id] = item.num;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let temp = hash[id];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('workCount_' + id + '_' + type, CACHE_TIME, temp);
          }
          else {
            cache[i] = 0;
            app.redis.setex('workCount_' + id + '_' + type, CACHE_TIME, 0);
          }
        });
      }
    }
    return cache;
  }
}

module.exports = Service;
