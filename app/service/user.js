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
      idList.map((id) => {
        return app.redis.get('userInfo_' + id);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
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
        res.forEach((item) => {
          let id = item.id;
          hash[id] = item;
        });
        noCacheIndexList.forEach((i) => {
          let id = idList[i];
          let temp = hash[id] || null;
          cache[i] = temp;
          app.redis.setex('userInfo_' + id, CACHE_TIME, JSON.stringify(temp));
        });
      }
    }
    return cache;
  }

  async clearInfoCache(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userInfo_' + id;
    await app.redis.del(cacheKey);
  }

  /**
   * 获取用户关注的人列表基本信息
   * @param id:int 用户id
   * @returns Array<Object>
   */
  async followPersonBaseList(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'followPersonBase_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.userUserRelation.findAll({
      attributes: [
        ['target_id', 'targetId'],
        'type'
      ],
      where: {
        user_id: id,
        type: [1, 3],
        is_delete: false,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 获取用户的关注的人列表，包括用户和作者
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{ count:int, data:Array<Object> }
   */
  async followPersonList(id, offset, limit) {
    if(!id) {
      return;
    }
    let [data, count] = await Promise.all([
      this.followPersonData(id, offset, limit),
      this.followPersonCount(id)
    ]);
    return { data, count };
  }

  /**
   * 获取用户的关注的人列表信息
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Array<Object>
   */
  async followPersonData(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let res = await app.model.userUserRelation.findAll({
      attributes: [
        ['target_id', 'targetId'],
        'type'
      ],
      where: {
        user_id: id,
        type: [1, 3],
        is_delete: false,
      },
      order: [
        ['update_time', 'DESC']
      ],
      offset,
      limit,
      raw: true,
    });
    let userIdList = [];
    let authorIdList = [];
    res.forEach((item) => {
      if(item.type === 1) {
        userIdList.push(item.targetId);
      }
      else {
        authorIdList.push(item.targetId);
      }
    });
    let [userList, authorList] = await Promise.all([
      service.user.infoList(userIdList),
      service.author.infoList(authorIdList)
    ]);
    let userHash = {};
    userList.forEach((item) => {
      if(item) {
        userHash[item.id] = item;
      }
    });
    let authorHash = {};
    authorList.forEach((item) => {
      authorHash[item.id] = item;
    });
    return res.map((item) => {
      let temp = {
        id: item.targetId,
        isAuthor: item.type === 3,
      };
      if(item.type === 1) {
        let user = userHash[item.targetId];
        if(user) {
          temp.nickname = user.nickname;
          temp.headUrl = user.headUrl;
        }
      }
      else {
        let author = authorHash[item.targetId];
        if(author) {
          temp.name = author.name;
          temp.headUrl = author.headUrl;
          temp.isSettle = author.isSettle;
        }
      }
      return temp;
    });
  }

  /**
   * 关注数
   * @param id:int 用户id
   * @returns int
   */
  async followPersonCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userFollowPersonCount_' + id;
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
    // 不能超过最大关注数
    if(state) {
      let now = await service.user.followPersonCount(uid);
      if(now > 500) {
        return {
          success: false,
          message: '超过关注人数上限啦',
        };
      }
    }
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
  async followUserList(id, offset, limit) {
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
    let idList = res.map((item) => {
      return item.userId;
    });
    res = await this.infoList(idList);
    res.forEach((item) => {
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
  async fansList(id, offset, limit) {
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
    let idList = res.map((item) => {
      return item.userId;
    });
    res = await this.infoList(idList);
    res.forEach((item) => {
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
  async friendList(id, offset, limit) {
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
    let idList = res.map((item) => {
      return item.userId;
    });
    res = await this.infoList(idList);
    res.forEach((item) => {
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
  async followAuthorList(id, offset, limit) {
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
    let idList = res.map((item) => {
      return item.authorId;
    });
    res = await service.author.infoList(idList);
    res.forEach((item) => {
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
  async postList(id, offset, limit) {
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
    res = await service.comment.plusListFull(res, id);
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

  /**
   * 获取用户收藏的视频信息
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ count:int, data:Array<Object> }
   */
  async favorVideoList(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    let [data, count] = await Promise.all([
      this.favorVideoData(id, offset, limit),
      this.favorVideoCount(id)
    ]);
    return { data, count };
  }

  /**
   * 获取用户收藏的视频信息
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async favorVideoData(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service, ctx } = this;
    let res = await app.model.userWorkRelation.findAll({
      attributes: [
        ['works_id', 'worksId'],
        ['work_id', 'workId']
      ],
      where: {
        user_id: id,
        type: 2,
        kind: 1,
        is_delete: false,
      },
      offset,
      limit,
      raw: true,
    });
    let worksIdHash = {};
    let worksIdList = [];
    res.forEach((item) => {
      if(!worksIdHash[item.worksId]) {
        worksIdHash[item.worksId] = true;
        worksIdList.push(item.worksId);
      }
    });
    let workIdHash = {};
    let workIdList = [];
    res.forEach((item) => {
      if(!workIdHash[item]) {
        workIdHash[item.workId] = true;
        workIdList.push(item.workId);
      }
    });
    let [worksList, workList, authorList] = await Promise.all([
      service.works.infoList(worksIdList),
      service.work.videoList(workIdList),
      service.works.authorList(worksIdList)
    ]);
    let worksHash = {};
    let workHash = {};
    let authorHash = {};
    let typeHash = {};
    let typeList = [];
    worksList.forEach((item) => {
      if(item) {
        if(!worksHash[item.id]) {
          worksHash[item.id] = item;
        }
        if(!typeHash[item.type]) {
          typeHash[item.type] = true;
          typeList.push(item.type);
        }
      }
    });
    workList.forEach((item) => {
      if(!workHash[item.id]) {
        workHash[item.id] = item;
      }
    });
    authorList.forEach((item) => {
      if(item && item.length) {
        if(!authorHash[item[0].worksId]) {
          authorHash[item[0].worksId] = item;
        }
      }
    });
    let professionSortList = await service.works.typeListProfessionSort(typeList);
    let professionSortHash = {};
    professionSortList.forEach((item) => {
      if(item && item.length) {
        if(!professionSortHash[item[0].worksType]) {
          professionSortHash[item[0].worksType] = item;
        }
      }
    });
    return res.map((item) => {
      let temp = {
        id: item.worksId,
        work: {
          id: item.workId,
        },
      };
      let works = worksHash[temp.id];
      if(works) {
        temp.title = works.title;
        temp.cover = works.cover;
        temp.type = works.type;
        temp.typeName = works.typeName;
      }
      else {
        ctx.logger.error('favor miss works uid:%s, worksId:%s, workId:%s', id, temp.id, temp.work.id);
      }
      let work = workHash[temp.work.id];
      if(work) {
        temp.work.title = work.title;
        temp.work.cover = work.cover;
        temp.work.url = work.url;
        temp.work.type = work.type;
        temp.work.typeName = work.typeName;
      }
      else {
        ctx.logger.error('favor miss work uid:%s, workId:%s', id, temp.work.id);
      }
      let author = authorHash[temp.id];
      if(author) {
        if(temp.type) {
          let professionSort = professionSortHash[temp.type];
          if(professionSort) {
            temp.professionSort = professionSort;
            temp.author = service.works.reorderAuthor(author, professionSort)[0];
          }
          else {
            temp.author = [author[0]];
          }
        }
        else {
          ctx.logger.error('favor miss type uid:%s, workId:%s, type:%s', id, temp.work.id, temp.type);
        }
      }
      else {
        ctx.logger.error('favor miss author uid:%s, workId:%s', id, temp.work.id);
      }
      return temp;
    });
  }

  /**
   * 获取用户收藏的视频数量
   * @param id:int 用户id
   * @returns int
   */
  async favorVideoCount(id) {
    const { app } = this;
    let res = await app.model.userWorkRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        user_id: id,
        type: 2,
        kind: 1,
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
    return res;
  }

  /**
   * 获取用户收藏的音频信息
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ count:int, data:Array<Object> }
   */
  async favorAudioList(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    let [data, count] = await Promise.all([
      this.favorAudioData(id, offset, limit),
      this.favorAudioCount(id)
    ]);
    return { data, count };
  }

  /**
   * 获取用户收藏的音频信息
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async favorAudioData(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service, ctx } = this;
    let res = await app.model.userWorkRelation.findAll({
      attributes: [
        ['works_id', 'worksId'],
        ['work_id', 'workId']
      ],
      where: {
        user_id: id,
        type: 2,
        kind: 2,
        is_delete: false,
      },
      offset,
      limit,
      raw: true,
    });
    let worksIdHash = {};
    let worksIdList = [];
    res.forEach((item) => {
      if(!worksIdHash[item.worksId]) {
        worksIdHash[item.worksId] = true;
        worksIdList.push(item.worksId);
      }
    });
    let workIdHash = {};
    let workIdList = [];
    res.forEach((item) => {
      if(!workIdHash[item]) {
        workIdHash[item.workId] = true;
        workIdList.push(item.workId);
      }
    });
    let [worksList, workList, authorList] = await Promise.all([
      service.works.infoList(worksIdList),
      service.work.audioList(workIdList),
      service.works.authorList(worksIdList)
    ]);
    let worksHash = {};
    let workHash = {};
    let authorHash = {};
    let typeHash = {};
    let typeList = [];
    worksList.forEach((item) => {
      if(item) {
        if(!worksHash[item.id]) {
          worksHash[item.id] = item;
        }
        if(!typeHash[item.type]) {
          typeHash[item.type] = true;
          typeList.push(item.type);
        }
      }
    });
    workList.forEach((item) => {
      if(!workHash[item.id]) {
        workHash[item.id] = item;
      }
    });
    authorList.forEach((item) => {
      if(item && item.length) {
        if(!authorHash[item[0].worksId]) {
          authorHash[item[0].worksId] = item;
        }
      }
    });
    let professionSortList = await service.works.typeListProfessionSort(typeList);
    let professionSortHash = {};
    professionSortList.forEach((item) => {
      if(item && item.length) {
        if(!professionSortHash[item[0].worksType]) {
          professionSortHash[item[0].worksType] = item;
        }
      }
    });
    return res.map((item) => {
      let temp = {
        id: item.worksId,
        work: {
          id: item.workId,
        },
      };
      let works = worksHash[temp.id];
      if(works) {
        temp.title = works.title;
        temp.cover = works.cover;
        temp.type = works.type;
        temp.typeName = works.typeName;
      }
      else {
        ctx.logger.error('favor miss works uid:%s, worksId:%s, workId:%s', id, temp.id, temp.work.id);
      }
      let work = workHash[temp.work.id];
      if(work) {
        temp.work.title = work.title;
        temp.work.cover = work.cover;
        temp.work.url = work.url;
        temp.work.type = work.type;
        temp.work.typeName = work.typeName;
      }
      else {
        ctx.logger.error('favor miss work uid:%s, workId:%s', id, temp.work.id);
      }
      let author = authorHash[temp.id];console.log(temp.id);
      if(author) {
        if(temp.type) {
          let professionSort = professionSortHash[temp.type];
          if(professionSort) {
            temp.author = service.works.reorderAuthor(author, professionSort)[0];
          }
          else {
            temp.author = [author[0]];
          }
        }
        else {
          ctx.logger.error('favor miss type uid:%s, workId:%s, type:%s', id, temp.work.id, temp.type);
        }
      }
      else {
        ctx.logger.error('favor miss author uid:%s, workId:%s', id, temp.work.id);
      }
      return temp;
    });
  }

  /**
   * 获取用户收藏的视频数量
   * @param id:int 用户id
   * @returns int
   */
  async favorAudioCount(id) {
    const { app } = this;
    let res = await app.model.userWorkRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        user_id: id,
        type: 2,
        kind: 2,
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
    return res;
  }

  /**
   * 获取用户收藏的图片信息
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ count:int, data:Array<Object> }
   */
  async favorImageList(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    let [data, count] = await Promise.all([
      this.favorImageData(id, offset, limit),
      this.favorImageCount(id)
    ]);
    return { data, count };
  }

  /**
   * 获取用户收藏的图片信息
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async favorImageData(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service, ctx } = this;
    let res = await app.model.userWorkRelation.findAll({
      attributes: [
        ['works_id', 'worksId'],
        ['work_id', 'workId']
      ],
      where: {
        user_id: id,
        type: 2,
        kind: 3,
        is_delete: false,
      },
      offset,
      limit,
      raw: true,
    });
    let worksIdHash = {};
    let worksIdList = [];
    res.forEach((item) => {
      if(!worksIdHash[item.worksId]) {
        worksIdHash[item.worksId] = true;
        worksIdList.push(item.worksId);
      }
    });
    let workIdHash = {};
    let workIdList = [];
    res.forEach((item) => {
      if(!workIdHash[item]) {
        workIdHash[item.workId] = true;
        workIdList.push(item.workId);
      }
    });
    let [worksList, workList, authorList] = await Promise.all([
      service.imageAlbum.infoList(worksIdList),
      service.work.imageList(workIdList),
      service.imageAlbum.authorList(worksIdList)
    ]);
    let worksHash = {};
    let workHash = {};
    let authorHash = {};
    let typeHash = {};
    let typeList = [];
    worksList.forEach((item) => {
      if(item) {
        if(!worksHash[item.id]) {
          worksHash[item.id] = item;
        }
        if(!typeHash[item.type]) {
          typeHash[item.type] = true;
          typeList.push(item.type);
        }
      }
    });
    workList.forEach((item) => {
      if(!workHash[item.id]) {
        workHash[item.id] = item;
      }
    });
    authorList.forEach((item) => {
      if(item && item.length) {
        if(!authorHash[item[0].worksId]) {
          authorHash[item[0].worksId] = item;
        }
      }
    });
    let professionSortList = await service.works.typeListProfessionSort(typeList);
    let professionSortHash = {};
    professionSortList.forEach((item) => {
      if(item && item.length) {
        if(!professionSortHash[item[0].worksType]) {
          professionSortHash[item[0].worksType] = item;
        }
      }
    });
    return res.map((item) => {
      let temp = {
        id: item.worksId,
        work: {
          id: item.workId,
        },
      };
      let works = worksHash[temp.id];
      if(works) {
        temp.title = works.title;
        temp.cover = works.cover;
        temp.type = works.type;
        temp.typeName = works.typeName;
      }
      else {
        ctx.logger.error('favor miss works uid:%s, worksId:%s, workId:%s', id, temp.id, temp.work.id);
      }
      let work = workHash[temp.work.id];
      if(work) {
        temp.work.title = work.title;
        temp.work.cover = work.cover;
        temp.work.url = work.url;
        temp.work.type = work.type;
        temp.work.typeName = work.typeName;
      }
      else {
        ctx.logger.error('favor miss work uid:%s, workId:%s', id, temp.work.id);
      }
      let author = authorHash[temp.id];
      if(author) {
        if(temp.type) {
          let professionSort = professionSortHash[temp.type];
          if(professionSort) {
            temp.professionSort = professionSort;
            temp.author = service.works.reorderAuthor(author, professionSort)[0];
          }
          else {
            temp.author = [author[0]];
          }
        }
        else {
          ctx.logger.error('favor miss type uid:%s, workId:%s, type:%s', id, temp.work.id, temp.type);
        }
      }
      else {
        ctx.logger.error('favor miss author uid:%s, workId:%s', id, temp.work.id);
      }
      return temp;
    });
  }

  /**
   * 获取用户收藏的图片数量
   * @param id:int 用户id
   * @returns int
   */
  async favorImageCount(id) {
    const { app } = this;
    let res = await app.model.userWorkRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        user_id: id,
        type: 2,
        kind: 3,
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
    return res;
  }

  /**
   * 获取用户收藏的画圈信息
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ count:int, data:Array<Object> }
   */
  async favorPostList(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    let [data, count] = await Promise.all([
      this.favorPostData(id, offset, limit),
      this.favorPostCount(id)
    ]);
    return { data, count };
  }

  /**
   * 获取用户收藏的画圈信息
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ count:int, data:Array<Object> }
   */
  async favorPostData(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let res = await app.model.userCommentRelation.findAll({
      attributes: [
        ['comment_id', 'commentId'],
        ['create_time', 'createTime']
      ],
      where: {
        user_id: id,
        type: 2,
        is_delete: false,
      },
      offset,
      limit,
      order: [
        ['id', 'DESC']
      ],
      raw: true,
    });
    let idList = res.map((item) => {
      return item.commentId;
    });
    let postList = await service.post.infoList(idList);
    return postList;
  }

  /**
   * 获取用户收藏的画圈数量
   * @param id:int 用户id
   * @returns int
   */
  async favorPostCount(id) {
    const { app } = this;
    let res = await app.model.userCommentRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        user_id: id,
        type: 2,
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
    return res;
  }

  /**
   * 获取用户关注的圈子列表
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{ count:int, data:Array<Object> }
   */
  async circleList(id, offset, limit) {
    if(!id) {
      return;
    }
    let [data, count] = await Promise.all([
      this.circleData(id, offset, limit),
      this.circleCount(id)
    ]);
    return { data, count };
  }

  /**
   * 获取用户关注的圈子列表信息
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Array<Object>
   */
  async circleData(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let res = await app.model.userCircleRelation.findAll({
      attributes: [
        ['circle_id', 'circleId']
      ],
      where: {
        user_id: id,
        type: 1,
        is_delete: false,
      },
      order: [
        ['update_time', 'DESC']
      ],
      offset,
      limit,
      raw: true,
    });
    let idList = res.map((item) => {
      return item.circleId;
    });
    res = await service.circle.infoList(idList);
    return res;
  }

  /**
   * 获取用户关注的圈子列表数量
   * @param id:int 用户id
   * @returns int
   */
  async circleCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userCircleCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.userCircleRelation.findOne({
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
   * 获取关注的人的画圈
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ size:int, data:Array<Object> }
   */
  async followPostList(id, offset, limit) {
    if(!id) {
      return;
    }
    let followPersonBaseList = await this.followPersonBaseList(id);
    let userIdList = [];
    let authorIdList = [];
    followPersonBaseList.forEach((item) => {
      if(item.type === 1) {
        userIdList.push(item.targetId);
      }
      else {
        authorIdList.push(item.targetId);
      }
    });
    let [data, count] = await Promise.all([
      this.followPostData(userIdList, authorIdList, offset, limit),
      this.followPostCount(id, userIdList, authorIdList)
    ]);
    return {
      data,
      count,
    };
  }

  /**
   * 获取关注的人的画圈
   * @param userIdList:Array<int> 关注的用户id列表
   * @param authorIdList:Array<int> 关注的作者id列表
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async followPostData(userIdList, authorIdList, offset, limit) {
    if(!userIdList || !authorIdList) {
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
        [Sequelize.Op.or]: [
          {
            user_id: userIdList,
          },
          {
            author_id: authorIdList,
          }
        ],
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
    res = await service.comment.plusListFull(res);
    return res;
  }

  /**
   * 获取关注的人的画圈数量
   * @param id:int 用户id
   * @param userIdList:Array<int> 关注的用户id列表
   * @param authorIdList:Array<int> 关注的作者id列表
   * @returns int
   */
  async followPostCount(id, userIdList, authorIdList) {
    if(!userIdList || !authorIdList) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userFollowPostCount_' + id;
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
        [Sequelize.Op.or]: [
          {
            user_id: userIdList,
          },
          {
            author_id: authorIdList,
          }
        ],
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
