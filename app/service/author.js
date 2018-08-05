/**
 * Created by army8735 on 2018/3/19.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

class Service extends egg.Service {
  /**
   * 根据作者id获取作者信息
   * @param id:int 作者id
   * @returns Object
   */
  async info(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorInfo_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.author.findOne({
      attributes: [
        'id',
        'name',
        ['head_url', 'headUrl'],
        'sign',
        ['fans_name', 'fansName'],
        ['fans_circle_name', 'fansCircleName'],
        ['is_settle', 'isSettle']
      ],
      where: {
        id,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 根据作者id获取作者信息和粉丝数
   * @param id:int 作者id
   * @returns Object
   */
  async infoPlusFans(id) {
    if(!id) {
      return;
    }
    let [info, fansCount] = await Promise.all([
      this.info(id),
      this.fansCount(id)
    ]);
    info.fansCount = fansCount;
    return info;
  }

  /**
   * 根据作者id列表获取作者信息列表
   * @param idList:Array<int> 作者id列表
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
        if(id !== null && id !== undefined) {
          return app.redis.get('authorInfo_' + id);
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
      let res = await app.model.author.findAll({
        attributes: [
          'id',
          'name',
          ['head_url', 'headUrl'],
          'sign',
          ['fans_name', 'fansName'],
          ['fans_circle_name', 'fansCircleName'],
          ['is_settle', 'isSettle']
        ],
        where: {
          id: noCacheIdList,
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
        app.redis.setex('authorInfo_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 根据作者id列表获取作者信息列表和粉丝数列表
   * @param idList:Array<int> 作者id列表
   * @returns Array<Object>
   */
  async infoListPlusFans(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    let [list, fansCountList] = await Promise.all([
      this.infoList(idList),
      this.fansCountList(idList)
    ]);
    list.forEach((item, i) => {
      item.fansCount = fansCountList[i];
    });
    return list;
  }

  /**
   * 获取作者别名列表
   * @param id:int 作者id
   * @returns Array<String>
   */
  async aliases(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorAliases_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.authorAlias.findAll({
      attributes: [
        'alias',
      ],
      where: {
        author_id: id,
        is_delete: false,
      },
    });
    res = res.map((item) => {
      return item.alias;
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 作者技能列表
   * @param id:int 作者id
   * @returns Array<Object>
   */
  async skill(id) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'authorSkill_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.authorSkillRelation.findAll({
        attributes: [
          ['skill_id', 'skillId'],
          'point'
        ],
        where: {
          author_id: id,
          is_delete: false,
        },
        order: [
          ['point', 'DESC']
        ],
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let skillIdList = res.map((item) => {
      return item.skillId;
    });
    let skillList = await service.skill.infoList(skillIdList);
    return res.map((item, i) => {
      if(item) {
        return {
          id: item.skillId,
          name: skillList[i].name,
          code: skillList[i].code,
          point: item.point,
        };
      }
    });
  }

  /**
   * 获取作者的站外链接
   * @param id:int 作者id
   * @returns Array<Object>
   */
  async outside(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorOutsides_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.authorOutside.findAll({
      attributes: [
        'url',
        'type'
      ],
      where: {
        author_id: id,
        is_delete: false,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 粉丝数
   * @param id:int 作者id
   * @returns int
   */
  async fansCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorFansCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.userPersonRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        target_id: id,
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
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 粉丝数
   * @param idList:Array<int> 作者id列表
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
          return app.redis.get('authorFansCount_' + id);
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
      let res = await app.model.userPersonRelation.findAll({
        attributes: [
          ['target_id', 'targetId'],
          [Sequelize.fn('COUNT', '*'), 'num']
        ],
        where: {
          target_id: noCacheIdList,
          type: 3,
        },
        group: 'target_id',
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.targetId;
          hash[id] = item.num || 0;
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || 0;
        cache[i] = temp;
        app.redis.setex('authorFansCount_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 是否关注了作者
   * @param id:int 作者id
   * @param uid:int 用户id
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
    let cacheKey = 'userPersonRelation_' + uid + '_' + id + '_3';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.userPersonRelation.findOne({
      where: {
        user_id: uid,
        type: 3,
        target_id: id,
      },
    });
    res = !!res;
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 是否关注了作者列表
   * @param idList:int 作者id列表
   * @param uid:int 用户id
   * @returns boolean
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
          return app.redis.get('userPersonRelation_' + uid + '_' + id + '_3');
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
          ['author_id', 'authorId']
        ],
        where: {
          author_id: noCacheIdList,
          user_id: uid,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.authorId;
          hash[id] = true;
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || false;
        cache[i] = temp;
        app.redis.setex('userPersonRelation_' + uid + '_' + id + '_3', app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 关注/取关作者
   * @param id:int 作者id
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
      let now = await service.user.followPersonCount(uid);
      if(now > 500) {
        return {
          success: false,
          message: '超过关注人数上限啦',
        };
      }
    }
    // 更新内存中用户对作者关系的状态，同时入库
    let cacheKey = 'userPersonRelation_' + uid + '_' + id + '_3';
    if(state) {
      await Promise.all([
        app.redis.setex(cacheKey, app.config.redis.time, 'true'),
        app.model.userPersonRelation.upsert({
          user_id: uid,
          target_id: id,
          type: 3,
          update_time: new Date(),
        }, {
          where: {
            user_id: uid,
            target_id: id,
          },
        })
      ]);
    }
    else {
      await Promise.all([
        app.redis.setex(cacheKey, app.config.redis.time, 'false'),
        app.model.userPersonRelation.destroy({
          where: {
            user_id: uid,
            target_id: id,
            type: 3,
          },
        })
      ]);
    }
    // 更新计数，优先内存缓存
    cacheKey = 'authorFansCount_' + id;
    if(state) {
      count = await app.redis.incr(cacheKey);
    }
    else {
      count = await app.redis.decr(cacheKey);
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
   * 获取作者的评论id
   * @param id:int 作品id
   * @returns int
   */
  async commentId(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorComment_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.authorCommentRelation.findOne({
      attributes: [
        ['comment_id', 'commentId']
      ],
      where: {
        author_id: id,
      },
      raw: true,
    });
    if(res) {
      res = res.commentId;
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    else {
      return;
    }
    return res;
  }

  /**
   * 获取作者的留言数据
   * @param id:int 作者id
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ count:int, data:Array<Object> }
   */
  async commentList(id, uid, offset, limit) {
    if(!id) {
      return;
    }
    const { service } = this;
    let commentId = await this.commentId(id);
    return await service.post.commentList(commentId, uid, offset, limit);
  }

  /**
   * 获取作者参与大作品信息列表
   * @param id:int 作者id
   * @param type:int 类型
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object> 大作品信息列表
   */
  async mainWorksList(id, type, offset, limit) {
    if(!id || !type) {
      return;
    }
    // 先取得作者所有主打大作品列表id
    let [data, count] = await Promise.all([
      this.mainWorksData(id, type, offset, limit),
      this.mainWorksCount(id, type)
    ]);
    return {
      count,
      data,
    };
  }

  /**
   * 获取作者主打大作品列表
   * @param id:int 作者id
   * @param type:int 类型
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object> 主打大作品id列表
   */
  async mainWorksData(id, type, offset, limit) {
    if(!id || !type) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'authorMainWorksList_' + id + '_' + type;
    let res;
    if(offset === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        res = JSON.parse(res);
      }
    }
    if(!res) {
      res = await app.model.authorMainWorks.findAll({
        attributes: [
          ['works_id', 'worksId']
        ],
        where: {
          author_id: id,
          is_delete: false,
          type,
        },
        offset: offset,
        limit: limit,
        order: [
          ['weight', 'DESC'],
        ],
        raw: true,
      });
      res = res.map((item) => {
        return item.worksId;
      });
      if(offset === 0) {
        app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
      }
    }
    let worksList = [];
    switch(type) {
      case 1:
        worksList = await service.works.infoListPlusFull(res);
        break;
      case 2:
        worksList = await service.musicAlbum.infoListPlusFull(res);
        break;
    }
    worksList.forEach((item) => {
      if(item) {
        let author = item.author;
        let profession = [];
        // 根据顺序将本作者的职种附加上去
        author.forEach((group) => {
          group.forEach((item) => {
            for(let i = 0, len = item.list.length; i < len; i++) {
              if(item.list[i].id === id) {
                profession.push({
                  id: item.id,
                  name: item.name,
                });
                break;
              }
            }
          });
        });
        item.profession = profession;
        delete item.author;
      }
    });
    return worksList;
  }

  /**
   * 主打作品数字统计
   * @param id:int 作者id
   * @param type:int 类型
   * @returns int
   */
  async mainWorksCount(id, type) {
    if(!id || !type) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorMainWorksSize_' + id + '_' + type;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.authorMainWorks.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        author_id: id,
        is_delete: false,
        type,
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
   * 获取作者参与小作品的种类列表
   * @param id:int 作者id
   * @returns Array<int>
   */
  async workKindList(id) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'authorWorkKindList_' + id;
    let kindList = await app.redis.get(cacheKey);
    if(kindList) {
      kindList = JSON.parse(kindList);
    }
    else {
      kindList = await app.model.workAuthorRelation.findAll({
        attributes: [
          Sequelize.literal('DISTINCT kind')
        ],
        where: {
          author_id: id,
        },
        raw: true,
      });
      kindList = kindList.map((item) => {
        return item.kind;
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(kindList));
    }
    // 取得种类列表下对应的职种id列表
    let professionIdList = await this.workKindListProfessionId(id, kindList);
    let professionIdHash = {};
    let pIdList = [];
    professionIdList.forEach((list) => {
      list.forEach((id) => {
        if(!professionIdHash[id]) {
          professionIdHash[id] = true;
          pIdList.push(id);
        }
      });
    });
    // 根据去重的职种id列表获取职种信息列表
    let professionList = await service.profession.infoList(pIdList);
    let professionHash = {};
    professionList.forEach((item) => {
      professionHash[item.id] = item;
    });
    return kindList.map((kind, i) => {
      let temp = {
        kind,
        name: service.work.getKindName(kind),
      };
      let list = [];
      professionIdList[i].forEach((item) => {
        if(professionHash[item]) {
          list.push(professionHash[item]);
        }
      });
      temp.professionList = list;
      return temp;
    });
  }

  /**
   * 获取作者小作品种类的职种信息
   * @param id:int 作者id
   * @param kindList:Array<int> 种类列表
   * @returns {Promise<void>}
   */
  async workKindListProfessionId(id, kindList) {
    if(!id || !kindList) {
      return;
    }
    if(!kindList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      kindList.map((kind) => {
        return app.redis.get('authorWorkKindListProfessionId_' + id + '_' + kind);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let kind = kindList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        }
      else if(kind !== null && kind !== undefined) {
        if(!noCacheIdHash[kind]) {
          noCacheIdHash[kind] = true;
          noCacheIdList.push(kind);
        }
        noCacheIndexList.push(i);
      }
    });
    if(noCacheIdList.length) {
      let res = await app.model.workAuthorRelation.findAll({
        attributes: [
          Sequelize.literal('DISTINCT profession_id AS professionId'),
          'kind'
        ],
        where: {
          author_id: id,
          kind: noCacheIdList,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          hash[item.kind] = hash[item.kind] || [];
          hash[item.kind].push(item.professionId);
        });
      }
      noCacheIndexList.forEach((i) => {
        let kind = kindList[i];
        let temp = hash[kind] || null;
        cache[i] = temp;
        app.redis.setex('authorWorkKindListProfessionId_' + id + '_' + kind, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 获取作者参与小作品种类的小作品id列表
   * @param id:int 作者id
   * @param kind:int 种类
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<int>
   */
  async kindWorkIdList(id, kind, offset, limit) {
    if(!id || !kind) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorKindWorkIdList_' + id + '_' + kind;
    let res;
    if(offset === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        return JSON.parse(res);
      }
    }
    res = await app.model.workAuthorRelation.findAll({
      attributes: [
        Sequelize.literal('DISTINCT work_id AS workId')
      ],
      where: {
        author_id: id,
        kind,
      },
      order: [
        ['work_id', 'DESC']
      ],
      offset,
      limit,
      raw: true,
    });
    res = res.map((item) => {
      return item.workId;
    });
    if(offset === 0) {
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    return res;
  }

  /**
   * 获取作者参与小作品种类的大作品列表和分页数据
   * @param id:int 作者id
   * @param uid:int 用户id
   * @param kind:int 种类
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ data: Array<Object>, count: int }
   */
  async kindWorkList(id, uid, kind, offset, limit) {
    if(!id) {
      return;
    }
    let [data, count] = await Promise.all([
      this.kindWorkData(id, uid, kind, offset, limit),
      this.kindWorkSize(id, kind)
    ]);
    return { data, count };
  }

  /**
   * 获取作者参与小作品种类的大作品列表
   * @param id:int 作者id
   * @param uid:int 用户id
   * @param kind:int 种类
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async kindWorkData(id, uid, kind, offset, limit) {
    if(!id || !kind) {
      return;
    }
    const { service } = this;
    let workIdList = await this.kindWorkIdList(id, kind, offset, limit);
    let worksIdList = await service.work.belongIdList(workIdList);
    let [
      worksList,
      workList
    ] = await Promise.all([
      service.works.infoListPlusCount(worksIdList),
      service.work.infoListPlusFull(workIdList, kind, uid)
    ]);
    let worksHash = {};
    worksList.forEach((item) => {
      if(item) {
        worksHash[item.id] = item;
      }
    });
    workList.forEach((item) => {
      if(item) {
        let professionList = [];
        item.author.forEach((group) => {
          group.forEach((item) => {
            for (let i = 0, len = item.list.length; i < len; i++) {
              if(item.list[i].id === id) {
                professionList.push({
                  id: item.id,
                  name: item.name,
                });
                break;
              }
            }
          });
        });
        item.profession = professionList;
        item.author = service.works.firstAuthor(item.author);
      }
    });
    return workList.map((item, i) => {
      if(item) {
        let worksId = worksIdList[i];
        let copy = Object.assign({}, worksHash[worksId] || {});
        copy.work = item;
        return copy;
      }
    });
  }

  /**
   * 获取作者参与小作品种类的小作品列表size
   * @param id:int 作者id
   * @param kind:int 种类
   * @returns int
   */
  async kindWorkSize(id, kind) {
    if(!id || kind === null || kind === undefined) {
      return;
    }
    const { app } = this;
    let cacheKey = 'kindWorkSize_' + id + '_' + kind;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.workAuthorRelation.findOne({
      attributes: [
        Sequelize.literal('COUNT(DISTINCT work_id) AS num')
      ],
      where: {
        author_id: id,
        kind,
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
   * 作者和用户校验相符
   * @param id:int 作者id
   * @param uid:int 用户id
   * @returns boolean
   */
  async isUser(id, uid) {
    if(!id || !uid) {
      return;
    }
    const { app } = this;
    let res = await app.model.userAuthorRelation.findOne({
      attributes: [
        'id'
      ],
      where: {
        author_id: id,
        user_id: uid,
      },
      raw: true,
    });
    return !!res;
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

  /**
   * 获取类似名字的作者
   * @param name:String 名字
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Array<Object>
   */
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
    let cacheKey = 'authorIdListByName_' + name;
    let res;
    if(offset === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        res = JSON.parse(res);
      }
    }
    if(!res) {
      res = await app.model.author.findAll({
        attributes: [
          'id'
        ],
        where: {
          name: {
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
        app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
      }
    }
    return res;
  }

  /**
   * 获取类似名字的作者数量
   * @param name:String 名字
   * @returns int
   */
  async countByName(name) {
    if(!name) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorCountByName_' + name;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.author.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        name: {
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
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 获取全部作者
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
   * 获取全部作者信息
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
    let cacheKey = 'allAuthor_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.author.findAll({
      attributes: [
        'id',
        'name',
        ['head_url', 'headUrl'],
        'sign',
        ['fans_name', 'fansName'],
        ['fans_circle_name', 'fansCircleName'],
        ['is_settle', 'isSettle']
      ],
      where: {
        is_delete: false,
        is_settle: true,
      },
      offset,
      limit,
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  async allCount() {
    const { app } = this;
    let cacheKey = 'allAuthorCount';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.author.findOne({
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
   * 获取最新入驻作者
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{ count:int, data:Array<Object> }
   */
  async allSettle(offset, limit) {
    let [data, count] = await Promise.all([
      this.allSettleData(offset, limit),
      this.allSettleCount()
    ]);
    return { data, count };
  }

  async allSettleData(offset, limit) {
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'allSettleData_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.userAuthorRelation.findAll({
        attributes: [
          ['author_id', 'authorId']
        ],
        where: {
          settle: {
            $ne: 3,
          },
          type: 1,
        },
        order: [
          ['create_time', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      res = res.map((item) => {
        return item.authorId;
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let list = await this.infoList(res);
    return list;
  }

  async allSettleCount() {
    const { app } = this;
    let cacheKey = 'allSettleCount';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.userAuthorRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        settle: {
          $ne: 3,
        },
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
   * 获取作者动态
   * @param id:int 作者id
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{ count:int, data: Array<Object> }
   */
  async dynamicList(id, uid, offset, limit) {
    if(!id) {
      return;
    }
    let [data, count] = await Promise.all([
      this.dynamicData(id, uid, offset, limit),
      this.dynamicCount(id)
    ]);
    return { data, count };
  }

  async dynamicData(id, uid, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'authorDynamic_' + id;
    let res;
    if(offset === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        res = JSON.parse(res);
      }
    }
    if(!res) {
      res = await app.model.authorDynamic.findAll({
        attributes: [
          ['target_id', 'targetId'],
          'type'
        ],
        where: {
          author_id: id,
          is_delete: false,
          is_target_delete: false,
        },
        order: [
          ['create_time', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      if(offset === 0) {
        app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
      }
    }
    let idList = res.map((item) => {
      return item.targetId;
    });
    return await service.post.infoList(idList, uid);
  }

  async dynamicCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorDynamicCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.authorDynamic.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        author_id: id,
        is_delete: false,
        is_target_delete: false,
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
   * 举报作者
   * @param id:int 作者id
   * @param uid:int 用户id
   */
  async report(id, uid) {
    if(!id) {
      return;
    }
    const { app } = this;
    await app.model.userReport.create({
      target_id: id,
      type: 7,
      user_id: uid,
    });
  }

  /**
   * 加入黑名单作者
   * @param id:int 作者id
   * @param uid:int 用户id
   */
  async black(id, uid) {
    if(!id || !uid) {
      return {
        success: false,
      };
    }
    const { app } = this;
    let exist = await app.model.userPersonRelation.findOne({
      attributes: [
        'id',
        'type'
      ],
      where: {
        user_id: uid,
        target_id: id,
      },
      raw: true,
    });
    if(exist && exist.type === 4) {
      return {
        success: false,
        message: '已经加入过黑名单无需重复加入',
      };
    }
    await app.model.userPersonRelation.upsert({
      user_id: uid,
      target_id: id,
      type: 4,
      update_time: new Date(),
    }, {
      where: {
        user_id: uid,
        target_id: id,
      },
    });
    app.redis.del('userPersonRelation_' + uid + '_' + id + '_3');
    app.redis.decr('authorFansCount_' + id);
    return {
      success: true,
    }
  }

  /**
   * 获取作者合作关系
   * @param id:int 作者id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async cooperationList(id, offset, limit) {
    if(!id) {
      return;
    }
    let [data, count] = await Promise.all([
      this.cooperationData(id, offset, limit),
      this.cooperationCount(id)
    ]);
    return {
      data,
      count,
    };
  }

  async cooperationData(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app  } = this;
    let cacheKey = 'authorCooperation_' + id;
    let res;
    if(offset === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        res = JSON.parse(res);
      }
    }
    if(!res) {
      res = await app.model.authorCooperation.findAll({
        attributes: [
          ['target_id', 'targetId'],
          Sequelize.literal('COUNT(DISTINCT works_id) AS num')
        ],
        where: {
          author_id: id,
          is_delete: false,
        },
        group: [
          'target_id'
        ],
        order: [
          Sequelize.literal('num DESC')
        ],
        offset,
        limit,
        raw: true,
      });
      if(offset === 0) {
        app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
      }
    }
    let idList = res.map((item) => {
      return item.targetId;
    });
    let authorList = await this.infoList(idList);
    return authorList.map((item, i) => {
      if(item) {
        return {
          id: item.id,
          name: item.name,
          headUrl: item.headUrl,
          isSettle: item.isSettle,
          count: res[i].num,
        };
      }
    });
  }

  async cooperationCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorCooperationCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    let sql = squel.select()
      .from(
        squel.select()
          .from('author_cooperation')
          .field('COUNT(DISTINCT works_id)')
          .where('author_id=?', id)
          .where('is_delete=false')
          .group('target_id')
      , 'num')
      .field('count(*)', 'num')
      .toString();
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(res.length) {
      res = res[0].num || 0;
    }
    else {
      res = 0;
    }
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 获取作者的所有技能作品列表
   * @param id:int 作者id
   * @param limit:int 分页尺寸
   * @returns Array<Object>
   */
  async allSkillWorks(id, limit) {
    if(!id) {
      return;
    }
    limit = parseInt(limit) || 1;
    if(limit < 1) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'authorAllSkillWorks_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.authorSkillWorks.findAll({
        attributes: [
          Sequelize.literal('DISTINCT skill_id AS skillId'),
        ],
        where: {
          author_id: id,
        },
        raw: true,
      });
      res = res.map((item) => {
        return item.skillId;
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let query = res.map((item) => {
      return this.skillWorks(id, item, 0, limit);
    });
    query.push(service.skill.infoList(res));
    let ret = await Promise.all(query);
    let infoList = ret.pop();
    let hash = {};
    infoList.forEach((item) => {
      hash[item.id] = item;
    });
    return ret.map((item, i) => {
      item.info = hash[res[i]];
      return item;
    });
  }

  /**
   * 获取作者的技能作品列表翻页
   * @param id:int 作者id
   * @param skillId:int 作者id
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Array<Object>
   */
  async skillWorks(id, skillId, offset, limit) {
    if(!id || !skillId) {
      return;
    }
    let [data, count] = await Promise.all([
      this.skillWorksData(id, skillId, offset, limit),
      this.skillWorksCount(id, skillId)
    ]);
    return {
      data,
      count,
    };
  }

  /**
   * 获取作者的技能作品列表
   * @param id:int 作者id
   * @param skillId:int 作者id
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Array<Object>
   */
  async skillWorksData(id, skillId, offset, limit) {
    if(!id || !skillId) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'authorSkillWorks_' + id + '_' + skillId + '_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.authorSkillWorks.findAll({
        attributes: [
          Sequelize.literal('DISTINCT works_id AS worksId')
        ],
        where: {
          author_id: id,
          skill_id: skillId,
        },
        order: [
          ['works_id', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      res = res.map((item) => {
        return item.worksId;
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    return service.works.infoListPlusCount(res);
  }

  /**
   * 获取作者的技能作品统计
   * @param id:int 作者id
   * @param skillId:int 作者id
   * @returns Array<Object>
   */
  async skillWorksCount(id, skillId) {
    if(!id || !skillId) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'authorSkillWorksCount_' + id + '_' + skillId;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.authorSkillWorks.findOne({
      attributes: [
        Sequelize.literal('COUNT(DISTINCT works_id) AS num')
      ],
      where: {
        author_id: id,
        skill_id: skillId,
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
   * 获取关联的用户
   * @param id:int 作者id
   * @returns Array<Object>
   */
  async user(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorUser_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.userAuthorRelation.findAll({
      attributes: [
        ['user_id', 'userId'],
        'type'
      ],
      where: {
        author_id: id,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 获取关联的用户
   * @param idList:Array<int> 作者id
   * @returns Array<Array<Object>>
   */
  async userList(idList) {
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
          return app.redis.get('authorUser_' + id);
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
      let res = await app.model.userAuthorRelation.findAll({
        attributes: [
          ['author_id', 'authorId'],
          ['user_id', 'userId'],
          'type'
        ],
        where: {
          author_id: noCacheIdList,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.authorId;
          let temp = hash[id] = hash[id] || [];
          temp.push({
            userId: item.userId,
            type: item.type,
          });
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || [];
        cache[i] = temp;
        app.redis.setex('authorUser_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }
}

module.exports = Service;
