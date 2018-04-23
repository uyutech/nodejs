/**
 * Created by army8735 on 2018/4/2.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

class Service extends egg.Service {
  /**
   * 根据id获取圈子信息
   * @param id:int 圈子id
   * @returns Object
   */
  async info(id) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'circleInfo_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.circle.findOne({
        attributes: [
          'id',
          'name',
          'describe',
          'cover',
          'banner',
          'type'
        ],
        where: {
          id,
        },
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    if(!res) {
      return;
    }
    let type = await service.circleType.info(res.type);
    if(type) {
      res.typeName = type.name;
    }
    return res;
  }

  /**
   * 根据id列表获取圈子信息列表
   * @param idList:Array<int> 圈子id列表
   * @returns Array<Object>
   */
  async infoList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app, service } = this;
    let cache = await Promise.all(
      idList.map((id) => {
        if(id !== undefined && id !== null) {
          return app.redis.get('circleInfo_' + id);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
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
      let res = await app.model.circle.findAll({
        attributes: [
          'id',
          'name',
          'describe',
          'cover',
          'banner',
          'type'
        ],
        where: {
          id: noCacheIdList,
        },
        raw: true,
      });
      let hash = {};
      res.forEach((item) => {
        hash[item.id] = item;
      });
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || null;
        cache[i] = temp;
        app.redis.setex('circleInfo_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    let typeIdList = [];
    let typeIdHash = {};
    cache.forEach((item) => {
      if(item && item.type && !typeIdHash[item.type]) {
        typeIdHash[item.type] = true;
        typeIdList.push(item.type);
      }
    });
    let typeList = await service.circleType.infoList(typeIdList);
    let typeHash = {};
    typeList.forEach((item) => {
      if(item) {
        typeHash[item.id] = item;
      }
    });
    cache.forEach((item) => {
      if(item && item.type && typeHash[item.type]) {
        item.typeName = typeHash[item.type].name;
      }
    });
    return cache;
  }

  /**
   * 获取圈子下的画圈
   * @param id:int 圈子id
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ count:int, data:Array<Object> }
   */
  async postList(id, uid, offset, limit) {
    if(!id) {
      return;
    }
    let [data, count] = await Promise.all([
      this.postData(id, uid, offset, limit),
      this.postCount(id)
    ]);
    return { data, count };
  }

  /**
   * 获取圈子下画圈数据
   * @param id:int 圈子id
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async postData(id, uid, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let res = await app.model.circleCommentRelation.findAll({
      attributes: [
        ['comment_id', 'commentId']
      ],
      where: {
        circle_id: id,
        is_comment_delete: false,
      },
      offset,
      limit,
      order: [
        ['comment_id', 'DESC']
      ],
      raw: true,
    });
    res = res.map((item) => {
      return item.commentId;
    });
    return service.post.infoList(res, uid);
  }

  /**
   * 获取圈子下画圈数量
   * @param id:int 圈子id
   * @returns int
   */
  async postCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'circlePostCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.circleCommentRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        circle_id: id,
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
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 获取圈子列表下画圈数量
   * @param idList:int 圈子id列表
   * @returns Array<int>
   */
  async postCountList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map((id) => {
        if(id !== undefined && id !== null) {
          return app.redis.get('circlePostCount_' + id);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
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
      let res = await app.model.circleCommentRelation.findAll({
        attributes: [
          ['circle_id', 'circleId'],
          [Sequelize.fn('COUNT', '*'), 'num']
        ],
        where: {
          circle_id: noCacheIdList,
          is_comment_delete: false,
        },
        group: 'circle_id',
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          hash[item.circleId] = item.num;
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || 0;
        cache[i] = temp;
        app.redis.setex('circlePostCount_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 获取全部圈子
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{ count:int, data:Array<Object> }
   */
  async all(offset, limit) {
    let [data, count] = await Promise.all([
      this.allData(offset, limit),
      this.allCount()
    ]);
    return { data, count };
  }

  /**
   * 获取全部圈子信息
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Array<Object>
   */
  async allData(offset, limit) {
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'allCircle_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.circle.findAll({
        attributes: [
          'id',
          'name',
          'describe',
          'cover',
          'banner',
          'type'
        ],
        where: {
          is_delete: false,
        },
        offset,
        limit,
        raw: true,
      });
      // 只缓存第一页
      if(offset === 0) {
        app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
      }
    }
    let idList = res.map((item) => {
      return item.id;
    });
    let [fansCountList, postCountList] = await Promise.all([
      this.fansCountList(idList),
      this.postCountList(idList)
    ]);
    res.forEach((item, i) => {
      item.fansCount = fansCountList[i];
      item.postCount = postCountList[i];
    });
    return res;
  }

  /**
   * 获取全部圈子数量
   * @returns int
   */
  async allCount() {
    const { app } = this;
    let cacheKey = 'allCircleCount';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.circle.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
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
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 按热度（人数）获取圈子列表
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{ count:int, data:Array<Object> }
   */
  async popularList(offset, limit) {
    let [data, count] = await Promise.all([
      this.popularData(offset, limit),
      this.popularCount()
    ]);
    return { data, count };
  }

  async popularData(offset, limit) {
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'popularCircle_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.userCircleRelation.findAll({
        attributes: [
          ['circle_id', 'circleId'],
          [Sequelize.fn('COUNT', '*'), 'num']
        ],
        where: {
          type: 1,
          is_circle_delete: false,
        },
        group: 'circle_id',
        order: [
          Sequelize.literal('num DESC')
        ],
        offset,
        limit,
        raw: true
      });
      app.redis.setex(cacheKey, app.config.redis.longTime, JSON.stringify(res));
    }
    let idList = res.map((item) => {
      return item.circleId;
    });
    let [infoList, fansCountList, postCountList] = await Promise.all([
      this.infoList(idList),
      this.fansCountList(idList),
      this.postCountList(idList)
    ]);
    infoList.forEach((item, i) => {
      if(item) {
        item.fansCount = fansCountList[i];
        item.postCount = postCountList[i];
      }
    });
    return infoList;
  }

  async popularCount() {
    const { app } = this;
    let cacheKey = 'popularCircleCount';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.userCircleRelation.findOne({
      attributes: [
        Sequelize.literal('COUNT(DISTINCT circle_id) AS num')
      ],
      where: {
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
    app.redis.setex(cacheKey, app.config.redis.longTime, JSON.stringify(res));
    return res;
  }

  /**
   * 是否关注了圈子
   * @param id:int 圈子id
   * @param uid:int 当前登录用户id
   * @returns boolean
   */
  async isFollow(id, uid) {
    if(!id) {
      return;
    }
    if(!uid) {
      return false;
    }
    const { app } = this;
    let cacheKey = 'userCircleRelation_' + uid + '_' + id + '_1';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.userCircleRelation.findOne({
      where: {
        user_id: uid,
        type: 1,
        circle_id: id,
      },
      raw: true,
    });
    res = !!res;
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 是否关注了圈子列表
   * @param idList:int 圈子id列表
   * @param uid:int 当前登录用户id
   * @returns Array<boolean>
   */
  async isFollowList(idList, uid) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    if(!uid) {
      return false;
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map((id) => {
        if(id !== undefined && id !== null) {
          return app.redis.get('userCircleRelation_' + uid + '_' + id + '_1');
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
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
      let res = await app.model.userCircleRelation.findAll({
        attributes: [
          ['circle_id', 'circleId']
        ],
        where: {
          circle_id: noCacheIdList,
          user_id: uid,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.circleId;
          hash[id] = true;
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || false;
        cache[i] = temp;
        app.redis.setex('userCircleRelation_' + uid + '_' + id + '_1', app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 获得粉丝数量
   * @param id:int 圈子id
   * @returns int
   */
  async fansCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'circleFansCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.userCircleRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        circle_id: id,
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
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 获得粉丝数量
   * @param idList:int 圈子id列表
   * @returns Array<int>
   */

  async fansCountList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map((id) => {
        if(id !== undefined && id !== null) {
          return app.redis.get('circleFansCount_' + id);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
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
      let res = await app.model.userCircleRelation.findAll({
        attributes: [
          ['circle_id', 'circleId'],
          [Sequelize.fn('COUNT', '*'), 'num']
        ],
        where: {
          circle_id: noCacheIdList,
          type: 1,
        },
        group: 'circle_id',
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          hash[item.circleId] = item.num;
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || 0;
        cache[i] = temp;
        app.redis.setex('circleFansCount_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 获取圈子下的tag的id列表
   * @param id:int 圈子id
   * @param type:int/null 空为全部
   * @returns Array<Object>
   */
  async tagId(id, type) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'circleTagId_' + id;
    if(type) {
      cacheKey += '_' + type;
    }
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    let where = {
      circle_id: id,
      type,
      is_delete: false,
    };
    if(type) {
      where.type = type;
    }
    res = await app.model.circleTagRelation.findAll({
      attributes: [
        ['tag_id', 'tagId']
      ],
      where,
      raw: true,
    });
    res = res.map((item) => {
      return item.tagId;
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 获取圈子列表下的tag的id列表
   * @param idList:Array<int> 圈子id列表
   * @param type:int/null 空为全部
   * @returns Array<Object>
   */
  async tagIdList(idList, type) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map((id) => {
        if(id !== null && id !== undefined) {
          let cacheKey = 'circleTagId_' + id;
          if(type) {
            cacheKey += '_' + type;
          }
          return app.redis.get(cacheKey);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        let cacheKey = 'circleTagId_' + id;
        if(type) {
          cacheKey += '_' + type;
        }
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
      let where = {
        circle_id: noCacheIdList,
        is_delete: false,
      };
      if(type) {
        where.type = type;
      }
      let res = await app.model.circleTagRelation.findAll({
        attributes: [
          ['circle_id', 'circleId'],
          ['tag_id', 'tagId']
        ],
        where,
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.circleId;
          let temp = hash[id] = hash[id] || [];
          temp.push(item.tagId);
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || [];
        cache[i] = temp;
        let cacheKey = 'circleTagId_' + id;
        if(type) {
          cacheKey += '_' + type;
        }
        app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 获取圈子下的tag列表
   * @param id:int 圈子id
   * @param type:int/null 空为全部
   * @returns Array<Object>
   */
  async tag(id, type) {
    if(!id) {
      return;
    }
    const { service } = this;
    let tagIdList = await this.tagId(id, type);
    if(!tagIdList) {
      return [];
    }
    return await service.tag.infoList(tagIdList);
  }

  /**
   * 获取圈子列表下的tag列表
   * @param idList:Array<int> 圈子列表id
   * @param type:int
   * @returns Array<Array<Object>>
   */
  async tagList(idList, type) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { service } = this;
    let list = await this.tagIdList(idList, type);
    let tagIdList = [];
    let tagIdHash = {};
    list.forEach((arr) => {
      arr.forEach((item) => {
        if(!tagIdHash[item]) {
          tagIdHash[item] = true;
          tagIdList.push(item);
        }
      });
    });
    let infoList = await service.tag.infoList(tagIdList);
    let hash = {};
    infoList.forEach((item) => {
      hash[item.id] = item;
    });
    return idList.map((id, i) => {
      let temp = [];
      let tagIdList = list[i];
      tagIdList.forEach((item) => {
        if(hash[item]) {
          temp.push(hash[item]);
        }
      });
      return temp;
    });
  }

  /**
   * 关注/取关圈子
   * @param id:int 圈子id
   * @param uid:int 用户id
   * @param state
   * @returns Object{ count:int, state:boolean }
   */
  async follow(id, uid, state) {
    if(!id || !uid) {
      return {
        success: false,
      };
    }
    state = !!state;
    let [now, count] = await Promise.all([
      this.isFollow(id, uid),
      this.fansCount(id)
    ]);
    if(now === state) {
      return {
        success: true,
        data: {
          state,
          count,
        },
      };
    }
    const { app, service } = this;
    // 不能超过最大关注数
    if(state) {
      let now = await service.user.followCircleCount(uid);
      if(now > 500) {
        return {
          success: false,
          message: '超过关注圈数上限啦',
        };
      }
    }
    // 更新内存中用户对作者关系的状态，同时入库
    let cacheKey = 'userCircleRelation_' + uid + '_' + id + '_1';
    if(state) {
      await Promise.all([
        app.redis.setex(cacheKey, app.config.redis.time, 'true'),
        app.model.userCircleRelation.upsert({
          user_id: uid,
          circle_id: id,
          type: 1,
          update_time: new Date(),
        }, {
          where: {
            user_id: uid,
            circle_id: id,
          },
        })
      ]);
    }
    else {
      await Promise.all([
        app.redis.setex(cacheKey, app.config.redis.time, 'false'),
        app.model.userCircleRelation.destroy({
          where: {
            user_id: uid,
            circle_id: id,
            type: 1,
          },
        })
      ]);
    }
    // 更新计数
    cacheKey = 'circleFansCount_' + id;
    if(state) {
      count = await app.redis.incr(cacheKey);
    }
    else {
      count = await app.redis.decr(cacheKey);
    }
    return {
      success: true,
      data: {
        state,
        count,
      },
    };
  }

  /**
   * 屏蔽圈子
   * @param id:int 圈子id
   * @param uid:int 用户id
   */
  async block(id, uid) {
    if(!id || !uid) {
      return {
        success: false,
      };
    }
    const { app } = this;
    let exist = await app.model.userCircleRelation.findOne({
      attributes: [
        'id',
        'type'
      ],
      where: {
        user_id: uid,
        circle_id: id,
      },
      raw: true,
    });
    if(exist && exist.type === 2) {
      return {
        success: false,
        message: '已经屏蔽过无需重复屏蔽',
      };
    }
    await app.model.userCircleRelation.upsert({
      user_id: uid,
      circle_id: id,
      type: 2,
      update_time: new Date(),
    }, {
      where: {
        user_id: uid,
        circle_id: id,
      },
    });
    app.redis.del('userCircleRelation_' + uid + '_' + id + '_1');
    await app.redis.decr('circleFansCount_' + id);
    return {
      success: true,
    };
  }
}

module.exports = Service;
