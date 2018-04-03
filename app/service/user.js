/**
 * Created by army8735 on 2018/3/19.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

const CACHE_TIME = 10;

class Service extends egg.Service {
  /**
   * 获取用户信息
   * @param id:int 用户id
   * @returns Object
   */
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
    res = await app.model.user.findOne({
      attributes: [
        'id',
        'nickname',
        'sex',
        ['head_url', 'headUrl'],
        'sign',
        'coins',
        'sign'
      ],
      where: {
        id,
        is_delete: false,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 获取用户信息列表
   * @param idList:Array<int> 用户id列表
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
        return app.redis.get('userInfo_' + id);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('userInfo_' + id, CACHE_TIME);
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
      let res = await app.model.user.findAll({
        attributes: [
          'id',
          'nickname',
          'sex',
          ['head_url', 'headUrl'],
          'sign',
          'coins'
        ],
        where: {
          id: noCacheIdList,
          is_delete: false,
        },
        raw: true,
      });
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
            app.redis.setex('userInfo_' + id, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('userInfo_' + id, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 关注数
   * @param id:int 用户id
   * @returns int
   */
  async followCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userFollowCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.userUserRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        user_id: id,
        type: [1, 3],
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
   * 粉丝数
   * @param id:int 用户id
   * @returns int
   */
  async fansCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userFansCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.userUserRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        target_id: id,
        type: 1,
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
   * 是否关注了用户
   * @param id:int 用户id
   * @param uid:int 当前登录用户id
   * @returns boolean
   */
  async isFollow(id, uid) {
    if(!id || id === uid) {
      return;
    }
    if(!uid) {
      return false;
    }
    const { app } = this;
    let cacheKey = 'userUserRelation_' + uid + '_' + id + '_' + 1;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.userUserRelation.findOne({
      where: {
        user_id: uid,
        type: 1,
        target_id: id,
        is_delete: false,
      },
    });
    if(res) {
      res = true;
    }
    else {
      res = false;
    }
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 是否是粉丝
   * @param id:int 用户id
   * @param uid:int 当前登录用户id
   * @returns boolean
   */
  async isFans(id, uid) {
    if(!id || id === uid) {
      return;
    }
    if(!uid) {
      return false;
    }
    return await this.isFollow(uid, id);
  }

  /**
   * 关注/取关用户
   * @param id:int 用户id
   * @param uid:int 当前登录用户id
   * @param state
   * @returns Object{ count:int, state:boolean }
   */
  async follow(id, uid, state) {
    if(!id || !uid || id === uid) {
      return;
    }
    state = !!state;
    const { app, ctx } = this;
    // 更新内存中用户对作者关系的状态
    let userRelationCache;
    if(state) {
      userRelationCache = app.redis.setex('userUserRelation_' + uid + '_' + id + '_' + 1, CACHE_TIME, 'true');
    }
    else {
      userRelationCache = app.redis.setex('userUserRelation_' + uid + '_' + id + '_' + 1, CACHE_TIME, 'false');
    }
    // 入库
    await Promise.all([
      userRelationCache,
      app.model.userUserRelation.upsert({
        user_id: uid,
        target_id: id,
        type: 1,
        is_delete: !state,
        update_time: new Date(),
      }, {
        where: {
          user_id: uid,
          type: 1,
          target_id: id,
        },
        raw: true,
      })
    ]);
    // 更新计数，优先内存缓存
    let cacheKey = 'userFansCount_' + id;
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
      res = await app.model.userUserRelation.findOne({
        attributes: [
          [Sequelize.fn('COUNT', '*'), 'num']
        ],
        where: {
          target_id: id,
          type: 3,
          is_delete: false,
        },
        raw: true,
      });
      if(res) {
        count = res.num;
        app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(count));
      }
      else {
        ctx.logger.error('userFansCount_%s find null', id);
      }
    }
    return {
      state,
      count,
    };
  }

  /**
   * 获取关注的圈友信息
   * @param id:int 作者id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ count:int, data:Array<Object> }
   */
  async followUser(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    let [data, count] = await Promise.all([
      this.followUserData(id, offset, limit),
      this.followUserCount(id)
    ]);
    return { data, count };
  }

  /**
   * 获取关注的圈友信息
   * @param id:int 作者id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async followUserData(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let sql = squel.select()
      .from('user_user_relation')
      .field('target_id', 'userId')
      .where('user_id=?', id)
      .where('type=1')
      .where('is_delete=false')
      .order('update_time', false)
      .offset(offset)
      .limit(limit)
      .toString();
    let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(!res.length) {
      return [];
    }
    let idList = res.map(function(item) {
      return item.userId;
    });
    res = await this.infoList(idList);
    res.forEach(function(item) {
      delete item.sign;
      delete item.coins;
    });
    return res;
  }

  /**
   * 获得关注的圈友数量
   * @param id:int 用户id
   * @returns int
   */
  async followUserCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userFollowUserCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.userUserRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        user_id: id,
        type: 1,
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
   * 获取粉丝信息
   * @param id:int 作者id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ count:int, data:Array<Object> }
   */
  async fans(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    let [data, count] = await Promise.all([
      this.fansData(id, offset, limit),
      this.fansCount(id)
    ]);
    return { data, count };
  }

  /**
   * 获取粉丝信息
   * @param id:int 作者id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async fansData(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let sql = squel.select()
      .from('user_user_relation')
      .field('user_id', 'userId')
      .where('target_id=?', id)
      .where('type=1')
      .where('is_delete=false')
      .order('update_time', false)
      .offset(offset)
      .limit(limit)
      .toString();
    let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(!res.length) {
      return [];
    }
    let idList = res.map(function(item) {
      return item.userId;
    });
    res = await this.infoList(idList);
    res.forEach(function(item) {
      delete item.sign;
      delete item.coins;
    });
    return res;
  }

  /**
   * 获得粉丝数量
   * @param id:int 用户id
   * @returns int
   */
  async fansCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userFansCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.userUserRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        target_id: id,
        type: 1,
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
   * 获取互相关注的圈友信息
   * @param id:int 作者id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ count:int, data:Array<Object> }
   */
  async friend(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    let [data, count] = await Promise.all([
      this.friendData(id, offset, limit),
      this.friendCount(id)
    ]);
    return { data, count };
  }

  /**
   * 获得互相关注的圈友信息
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async friendData(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let sql = squel.select()
      .from('user_user_relation')
      .field('user_id', 'userId')
      .where('target_id=?', id)
      .where('type=1')
      .where('user_id IN ?', squel.select()
        .from('user_user_relation')
        .field('target_id')
        .where('user_id=?', id)
        .where('type=1')
        .where('is_delete=false'))
      .where('is_delete=false')
      .order('update_time', false)
      .offset(offset)
      .limit(limit)
      .toString();
    let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(!res.length) {
      return [];
    }
    let idList = res.map(function(item) {
      return item.userId;
    });
    res = await this.infoList(idList);
    res.forEach(function(item) {
      delete item.sign;
      delete item.coins;
    });
    return res;
  }

  /**
   * 获得互相关注的圈友数量
   * @param id:int 用户id
   * @returns int
   */
  async friendCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userFriendCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = squel.select()
      .from('user_user_relation')
      .field('COUNT(*)', 'num')
      .where('target_id=?', id)
      .where('type=1')
      .where('user_id IN ?', squel.select()
        .from('user_user_relation')
        .field('target_id')
        .where('user_id=?', id)
        .where('type=1')
        .where('is_delete=false'))
      .where('is_delete=false')
      .toString();
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(res.length) {
      res = res[0].num || 0;
    }
    else {
      res = 0;
    }
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 获取关注的作者信息
   * @param id:int 作者id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ count:int, data:Array<Object> }
   */
  async followAuthor(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    let [data, count] = await Promise.all([
      this.followAuthorData(id, offset, limit),
      this.followAuthorCount(id)
    ]);
    return { data, count };
  }

  /**
   * 获取关注的作者信息
   * @param id:int 作者id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async followAuthorData(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let sql = squel.select()
      .from('user_user_relation')
      .field('target_id', 'authorId')
      .where('user_id=?', id)
      .where('type=3')
      .where('is_delete=false')
      .order('update_time', false)
      .offset(offset)
      .limit(limit)
      .toString();
    let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(!res.length) {
      return [];
    }
    let idList = res.map(function(item) {
      return item.authorId;
    });
    res = await service.author.infoList(idList);
    res.forEach(function(item) {
      delete item.sign;
      delete item.fansName;
      delete item.fansCircleName;
      delete item.isSettle;
    });
    return res;
  }

  /**
   * 获得关注的作者数量
   * @param id:int 用户id
   * @returns int
   */
  async followAuthorCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userFollowAuthorCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.userUserRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        user_id: id,
        type: 3,
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
   * 获取用户的画圈
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ size:int, data:Array<Object> }
   */
  async post(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    let [data, count] = await Promise.all([
      this.postData(id, offset, limit),
      this.postCount(id)
    ]);
    return { data, count };
  }

  /**
   * 获取画圈详情
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async postData(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let res = await app.model.comment.findAll({
      attributes: [
        'id',
        ['user_id', 'uid'],
        ['author_id', 'aid'],
        'content',
        ['parent_id', 'pid'],
        ['root_id', 'rid'],
        ['create_time', 'createTime']
      ],
      where: {
        user_id: id,
        root_id: 0,
        is_delete: false,
      },
      order: [
        ['id', 'DESC']
      ],
      offset,
      limit,
      raw: true,
    });
    res = await service.comment.plusList(res);
    return res;
  }
  /**
   * 获取画圈数量
   * @param id:int 用户id
   * @returns int
   */
  async postCount(id) {
    const { app } = this;
    let cacheKey = 'userPostCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.comment.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        user_id: id,
        root_id: 0,
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
