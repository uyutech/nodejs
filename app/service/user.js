/**
 * Created by army8735 on 2018/3/19.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');
const Spark = require('spark-md5');

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
        ['reg_state', 'regState'],
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
          ['reg_state', 'regState'],
          'sign',
          'coins'
        ],
        where: {
          id: noCacheIdList,
          is_delete: false,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.id;
          hash[id] = item;
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || null;
        cache[i] = temp;
        app.redis.setex('userInfo_' + id, CACHE_TIME, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 获取用户作者信息
   * @param id:int
   * @returns Array<Object>
   */
  async author(id) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'userAuthor_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
      app.redis.expire(cacheKey, CACHE_TIME);
    }
    else {
      res = await app.model.userAuthorRelation.findAll({
        attributes: [
          ['author_id', 'id'],
          'type',
          'settle'
        ],
        where: {
          user_id: id,
          is_delete: false,
        },
        order: [
          'type'
        ],
        raw: true,
      });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    let idList = res.map((item) => {
      return item.id;
    });
    let infoList = await service.author.infoList(idList);
    res.forEach((item, i) => {
      if(item && infoList[i]) {
        Object.assign(item, infoList[i]);
      }
    });
    return res;
  }

  /**
   * 清除用户信息缓存
   * @param id:int 用户id
   */
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
    res = await app.model.userPersonRelation.findAll({
      attributes: [
        ['target_id', 'targetId'],
        'type'
      ],
      where: {
        user_id: id,
        type: [1, 3],
      },
      raw: true,
    });
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 获取用户圈友id列表
   * @param id:int 用户id
   * @returns Array<int>
   */
  async friendIdList(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'friendId_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = squel.select()
      .from('user_person_relation')
      .field('user_id', 'userId')
      .where('target_id=?', id)
      .where('type=1')
      .where('user_id IN ?', squel.select()
        .from('user_person_relation')
        .field('target_id')
        .where('user_id=?', id)
        .where('type=1')
      )
      .order('id', false)
      .toString();
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(!res.length) {
      return [];
    }
    res = res.map((item) => {
      return item.userId;
    });
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
    let res = await app.model.userPersonRelation.findAll({
      attributes: [
        ['target_id', 'targetId'],
        'type'
      ],
      where: {
        user_id: id,
        type: [1, 3],
      },
      order: [
        ['id', 'DESC']
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
   * 关注人数
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
    res = await app.model.userPersonRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        user_id: id,
        type: [1, 3],
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
   * 关注圈子数
   * @param id:int 用户id
   * @returns int
   */
  async followCircleCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userFollowCircleCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.userPersonRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        user_id: id,
        type: [1, 3],
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
    let cacheKey = 'userPersonRelation_' + uid + '_' + id + '_1';
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.userPersonRelation.findOne({
      where: {
        user_id: uid,
        type: 1,
        target_id: id,
      },
    });
    res = !!res;
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
      return {
        success: false,
      };
    }
    let now = await this.isFollow(id, uid);
    if(now === state) {
      let count = await this.fansCount(id);
      return {
        success: true,
        data: {
          state,
          count,
        },
      };
    }
    state = !!state;
    const { app, service } = this;
    // 不能超过最大关注数
    if(state) {
      let now = await this.followPersonCount(uid);
      if(now > 500) {
        return {
          success: false,
          message: '超过关注人数上限啦',
        };
      }
    }
    // 更新内存中用户对作者关系的状态，同时入库
    let cacheKey = 'userPersonRelation_' + uid + '_' + id + '_1';
    if(state) {
      await Promise.all([
        app.redis.setex(cacheKey, CACHE_TIME, 'true'),
        app.model.userPersonRelation.create({
          user_id: uid,
          target_id: id,
          type: 1,
        }, {
          raw: true,
        })
      ]);
    }
    else {
      await Promise.all([
        app.redis.setex(cacheKey, CACHE_TIME, 'false'),
        app.model.userPersonRelation.destroy({
          where: {
            user_id: uid,
            target_id: id,
            type: 1,
          },
        })
      ]);
    }
    // 更新计数，优先内存缓存
    cacheKey = 'userFansCount_' + id;
    let count = await this.fansCount(id);
    if(state) {
      count++;
      app.redis.incr(cacheKey);
    }
    else {
      count--;
      app.redis.decr(cacheKey);
    }
    app.redis.del('friendId_' + uid);
    return {
      success: true,
      data: {
        state,
        count,
      },
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
      .from('user_person_relation')
      .field('target_id', 'userId')
      .where('user_id=?', id)
      .where('type=1')
      .order('id', false)
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
    res = await app.model.userPersonRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        user_id: id,
        type: 1,
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
      .from('user_person_relation')
      .field('user_id', 'userId')
      .where('target_id=?', id)
      .where('type=1')
      .order('id', false)
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
    res = await app.model.userPersonRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        target_id: id,
        type: 1,
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
    let idList = await this.friendIdList(id);
    let data = await this.friendData(idList, offset, limit);
    return { data, count: idList.length };
  }

  /**
   * 获得互相关注的圈友信息
   * @param idList:int 用户id列表
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async friendData(idList, offset, limit) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    idList = idList.slice(offset, limit);
    let res = await this.infoList(idList);
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
      .from('user_person_relation')
      .field('COUNT(*)', 'num')
      .where('target_id=?', id)
      .where('type=1')
      .where('user_id IN ?', squel.select()
        .from('user_person_relation')
        .field('target_id')
        .where('user_id=?', id)
        .where('type=1')
      )
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
      .from('user_person_relation')
      .field('target_id', 'authorId')
      .where('user_id=?', id)
      .where('type=3')
      .order('id', false)
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
    res = await app.model.userPersonRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        user_id: id,
        type: 3,
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
   * @returns Object{ count:int, data:Array<Object> }
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
      },
      order: [
        ['id', 'DESC']
      ],
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
    let workIdList = [];
    res.forEach((item) => {
      workIdList.push(item.workId);
    });
    let [worksList, workList] = await Promise.all([
      service.works.infoListPlusCount(worksIdList),
      service.work.infoListPlusFull(workIdList, 1, id)
    ]);
    let worksHash = {};
    worksList.forEach((item) => {
      item.author = service.works.firstAuthor(item.author);
      worksHash[item.id] = item;
    });
    workList.forEach((item) => {
      item.author = service.works.firstAuthor(item.author);
    });
    return res.map((item, i) => {
      let works = worksHash[item.worksId];
      if(works) {
        let copy = Object.assign({}, works);
        let work = workList[i];
        if(work) {
          copy.work = work;
        }
        else {
          ctx.logger.error('favor miss work uid:%s, %j', id, item);
        }
        return copy;
      }
      else {
        ctx.logger.error('favor miss works uid:%s, %j', id, item);
      }
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
      },
      order: [
        ['id', 'DESC']
      ],
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
    let workIdList = [];
    res.forEach((item) => {
      workIdList.push(item.workId);
    });
    let [worksList, workList] = await Promise.all([
      service.works.infoListPlusCount(worksIdList),
      service.work.infoListPlusFull(workIdList, 2, id)
    ]);
    let worksHash = {};
    worksList.forEach((item, i) => {
      item.author = service.works.firstAuthor(item.author);
      worksHash[item.id] = item;
    });
    workList.forEach((item) => {
      item.author = service.works.firstAuthor(item.author);
    });
    return res.map((item, i) => {
      let works = worksHash[item.worksId];
      if(works) {
        let copy = Object.assign({}, works);
        let work = workList[i];
        if(work) {
          copy.work = work;
        }
        else {
          ctx.logger.error('favor miss work uid:%s, %j', id, item);
        }
        return copy;
      }
      else {
        ctx.logger.error('favor miss works uid:%s, %j', id, item);
      }
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
        ['work_id', 'workId']
      ],
      where: {
        user_id: id,
        type: 2,
        kind: 3,
      },
      offset,
      limit,
      raw: true,
    });
    let workIdHash = {};
    let workIdList = [];
    res.forEach((item) => {
      if(!workIdHash[item]) {
        workIdHash[item.workId] = true;
        workIdList.push(item.workId);
      }
    });
    let [
      workList,
      authorList,
      likeCountList,
      isLikeList
    ] = await Promise.all([
      service.work.imageList(workIdList),
      service.work.authorList(workIdList),
      service.work.likeCountList(workIdList),
      service.work.isLikeList(workIdList, id)
    ]);
    workList.forEach((item, i) => {
      if(item) {
        item.likeCount = likeCountList[i] || 0;
        item.isLike = isLikeList[i] || false;
        item.author = authorList[i];
      }
    });
    return workList;
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
        is_comment_delete: false,
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
    return await service.post.infoList(idList);
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
        is_comment_delete: false,
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
        is_circle_delete: false,
      },
      order: [
        ['id', 'DESC']
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
        is_circle_delete: false,
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
   * @returns Object{ count:int, data:Array<Object> }
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
      this.followPostData(id, userIdList, authorIdList, offset, limit),
      this.followPostCount(id, userIdList, authorIdList)
    ]);
    return {
      data,
      count,
    };
  }

  /**
   * 获取关注的人的画圈
   * @param id:int 用户id
   * @param userIdList:Array<int> 关注的用户id列表
   * @param authorIdList:Array<int> 关注的作者id列表
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async followPostData(id, userIdList, authorIdList, offset, limit) {
    if(!id || !userIdList || !authorIdList) {
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
    res = await service.comment.plusListFull(res, id);
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
    if(!id || !userIdList || !authorIdList) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userFollowPostCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      // app.redis.expire(cacheKey, CACHE_TIME);
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
    app.redis.setex(cacheKey, 30, JSON.stringify(res));
    return res;
  }

  /**
   * 获取圈友的画圈
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ count:int, data:Array<Object> }
   */
  async friendPostList(id, offset, limit) {
    if(!id) {
      return;
    }
    let idList = await this.friendIdList(id);
    let [data, count] = await Promise.all([
      this.friendPostData(id, idList, offset, limit),
      this.friendPostCount(id, idList)
    ]);
    return {
      data,
      count,
    };
  }

  /**
   * 获取圈友的画圈
   * @param id:int 用户id
   * @param idList:Array<int> 圈友列表
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async friendPostData(id, idList, offset, limit) {
    if(!id || !idList) {
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
        user_id: idList,
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
   * 获取圈友的画圈数量
   * @param id:int 用户id
   * @param idList:Array<int> 圈友id列表
   * @returns int
   */
  async friendPostCount(id, idList) {
    if(!id || !idList) {
      return;
    }
    const { app } = this;
    let cacheKey = 'friendPostCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      // app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.comment.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        user_id: idList,
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
    app.redis.setex(cacheKey, 30, JSON.stringify(res));
    return res;
  }

  /**
   * 获取类似名字的作者
   * @param name:String 名字
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{data: Array<Object>, count: int}
   */
  async listByName(name, offset, limit) {
    if(!name) {
      return;
    }
    let [idList, count] = await Promise.all([
      this.idListByName(name, offset, limit),
      this.countByName(name)
    ]);
    let data = await this.infoList(idList);
    return {
      data,
      count,
    };
  }

  async idListByName(name, offset, limit) {
    if(!name) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userIdListByName_' + name;
    let res;
    if(offset === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        res = JSON.parse(res);
      }
    }
    if(!res) {
      res = await app.model.user.findAll({
        attributes: [
          'id'
        ],
        where: {
          nickname: {
            $like: '%' + name + '%',
          },
          is_delete: false,
        },
        offset,
        limit,
        raw: true,
      });
      res = res.map((item) => {
        return item.id;
      });
      if(offset === 0) {
        app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
      }
    }
    return res;
  }

  async countByName(name) {
    if(!name) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userCountByName_' + name;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.user.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        nickname: {
          $like: '%' + name + '%',
        },
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
   * 获取消息
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{ data: Array<Object>, count:int }
   */
  async messageList(id, offset, limit) {
    if(!id) {
      return;
    }
    let [data, count] = await Promise.all([
      this.messageData(id, offset, limit),
      this.messageCount(id)
    ]);
    return {
      data,
      count,
    };
  }

  /**
   * 获取消息
   * @param id:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{ data: Array<Object>, count:int }
   */
  async messageData(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let res = await app.model.message.findAll({
      attributes: [
        'id',
        // ['user_id', 'uid'],
        // ['author_id', 'aid'],
        ['is_read', 'isRead'],
        'type',
        ['ref_id', 'refId'],
        ['comment_id', 'commentId']
      ],
      where: {
        target_id: id,
      },
      order: [
        'is_read',
        ['id', 'DESC']
      ],
      offset,
      limit,
      raw: true,
    });
    let idList = res.map((item) => {
      return item.commentId;
    });
    let infoList = await service.comment.infoList(idList);
    infoList = await service.comment.plusList(infoList);
    res.forEach((item, i) => {
      let comment = infoList[i];
      if(comment) {
        item.comment = comment;
      }
      delete item.commentId;
    });
    let noReadIdList = [];
    res.forEach((item) => {
      if(!item.isRead) {
        noReadIdList.push(item.id);
      }
    });
    if(noReadIdList.length) {
      app.model.message.update({
        is_read: true,
      }, {
        where: {
          id: noReadIdList,
        },
        raw: true,
      });
    }
    return res;
  }

  /**
   * 获取消息数量
   * @param id:int 用户id
   * @returns int
   */
  async messageCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'messageCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.message.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        target_id: id,
      },
      raw: true,
    });
    if(res) {
      res = res.num || 0;
    }
    else {
      res = 0;
    }
    app.redis.setex(cacheKey, 30, JSON.stringify(res));
    return res;
  }

  /**
   * 更新用户的作者入住状态
   * @param id:int 用户id
   * @param authorId:int 作者id
   * @param settle:int 入住状态
   * @returns Object
   */
  async updateAuthorSettle(id, authorId, settle) {
    if(!id || !authorId) {
      return;
    }
    const { app, service } = this;
    let check = await service.author.isUser(authorId, id);
    if(!check) {
      return;
    }
    return await app.model.userAuthorRelation.update({
      settle,
    }, {
      where: {
        user_id: id,
        author_id: authorId,
      },
      raw: true,
    });
  }

  /**
   * 获取用户的地址
   * @param id:int 用户id
   * @returns Array<Object>
   */
  async address(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'address_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.userAddress.findAll({
      attributes: [
        'id',
        'name',
        'phone',
        'address'
      ],
      where: {
        user_id: id,
        is_delete: false,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }
}

module.exports = Service;
