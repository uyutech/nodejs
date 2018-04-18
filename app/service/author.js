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
      app.redis.expire(cacheKey, CACHE_TIME);
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
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
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
        app.redis.expire('authorInfo_' + id, CACHE_TIME);
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
        app.redis.setex('authorInfo_' + id, CACHE_TIME, JSON.stringify(temp));
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
      app.redis.expire(cacheKey, CACHE_TIME);
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
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 获取作者的站外链接
   * @param id:int 作者id
   * @returns Array<Object>
   */
  async outsides(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorOutsides_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
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
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
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
      app.redis.expire(cacheKey, CACHE_TIME);
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
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
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
        app.redis.expire('authorFansCount_' + id, CACHE_TIME);
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
        app.redis.setex('authorFansCount_' + id, CACHE_TIME, JSON.stringify(temp));
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
      app.redis.expire(cacheKey, CACHE_TIME);
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
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
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
        app.redis.expire('userPersonRelation_' + uid + '_' + id + '_3', CACHE_TIME);
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
        app.redis.setex('userPersonRelation_' + uid + '_' + id + '_3', CACHE_TIME, JSON.stringify(temp));
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
        app.redis.setex(cacheKey, CACHE_TIME, 'true'),
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
        app.redis.setex(cacheKey, CACHE_TIME, 'false'),
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
      app.redis.expire(cacheKey, CACHE_TIME);
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
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
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
   * 获取作者主打大作品id列表
   * @param id:int 作者id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object> 主打大作品id列表
   */
  async mainWorksIdList(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorMainWorksIdList_' + id;
    let res;
    if(offset === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        app.redis.expire(cacheKey, CACHE_TIME);
        return JSON.parse(res);
      }
    }
    res = await app.model.authorMainWorks.findAll({
      attributes: [
        ['works_id', 'worksId']
      ],
      where: {
        author_id: id,
        is_delete: false,
      },
      offset: offset,
      limit: limit,
      order: [
        ['weight', 'DESC'],
      ],
      raw: true,
    });
    if(res.length) {
      res = res.map((item) => {
        return item.worksId;
      });
      if(offset === 0) {
        app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
      }
    }
    return res;
  }
  async mainWorksCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorMainWorksSize_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.authorMainWorks.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        author_id: id,
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
   * 获取作者参与大作品信息列表
   * @param id:int 作者id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object> 大作品信息列表
   */
  async mainWorks(id, offset, limit) {
    if(!id) {
      return;
    }
    // 先取得作者所有主打大作品列表id
    let [idList, count] = await Promise.all([
      this.mainWorksIdList(id, offset, limit),
      this.mainWorksCount(id)
    ]);
    // 根据id获取信息
    let data = await this.worksListByIdList(id, idList);
    return {
      count,
      data,
    };
  }

  /**
   * 根据作者id和大作品id列表获取大作品信息及作者在此大作品中的优先显示职种
   * @param id:int 作者id
   * @param worksIdList:Array<int> 大作品id列表
   * @returns Array<Object>
   */
  async worksListByIdList(id, worksIdList) {
    if(!id || !worksIdList) {
      return;
    }
    if(!worksIdList.length) {
      return [];
    }
    const { service } = this;
    // 获取大作品信息、相关作者信息
    let worksList = await service.works.infoListPlusFull(worksIdList);
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
   * 获取作者的专辑信息id列表
   * @param id:int 作者id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<int> 专辑信息id列表
   */
  async musicAlbumIdList(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorMusicAlbumIdList_' + id;
    let res;
    if(offset === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        app.redis.expire(cacheKey, CACHE_TIME);
        return JSON.parse(res);
      }
    }
    res = await app.model.musicAlbumAuthorRelation.findAll({
      attributes: [
        ['album_id', 'albumId']
      ],
      where: {
        author_id: id,
        is_delete: false,
      },
      offset: offset,
      limit: limit,
      raw: true,
    });
    let idList = res.map((item) => {
      return item.albumId;
    });
    if(offset === 0) {
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(idList));
    }
    return idList;
  }

  /**
   * 获取作者的专辑信息列表
   * @param id:int 作者id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object> 专辑信息列表
   */
  async musicAlbum(id, offset, limit) {
    if(!id) {
      return;
    }
    const { service } = this;
    // 先取得作者所有参与专辑列表id
    let [idList, count] = await Promise.all([
      this.musicAlbumIdList(id, offset, limit),
      this.musicAlbumCount(id)
    ]);
    let data = await service.musicAlbum.infoListPlusCount(idList);
    return {
      count,
      data,
    };
  }
  async musicAlbumCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorMusicAlbumSize_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.musicAlbumAuthorRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        author_id: id,
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
      app.redis.expire(cacheKey, CACHE_TIME);
      kindList = JSON.parse(kindList);
    }
    else {
      kindList = await app.model.workAuthorRelation.findAll({
        attributes: [
          Sequelize.literal('DISTINCT kind')
        ],
        where: {
          author_id: id,
          is_delete: false,
        },
        raw: true,
      });
      kindList = kindList.map((item) => {
        return item.kind;
      });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(kindList));
    }
    // 取得种类列表下对应的职种id列表
    let professionIdList = await this.workKindListProfessionId(id, kindList);
    let professionIdHash = {};
    let pid = [];
    professionIdList.forEach((list) => {
      list.forEach((id) => {
        if(!professionIdHash[id]) {
          professionIdHash[id] = true;
          pid.push(id);
        }
      });
    });
    // 根据去重的职种id列表获取职种信息列表
    let professionList = await service.profession.infoList(pid);
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
        app.redis.expire('authorWorkKindListProfessionId_' + id + '_' + kind, CACHE_TIME);
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
          is_delete: false,
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
        app.redis.setex('authorWorkKindListProfessionId_' + id + '_' + kind, CACHE_TIME, JSON.stringify(temp));
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
        app.redis.expire(cacheKey, CACHE_TIME);
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
        is_delete: false,
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
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    return res;
  }

  /**
   * 获取作者在小作品中的职种列表
   * @param id:int 作者id
   * @param workId:int 作品id
   * @returns Array<int>
   */
  async workProfessionIdList(id, workId) {
    if(!id || !workId) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorWorkProfessionIdList_' + id + '_' + workId;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.workAuthorRelation.findAll({
      attributes: [
        ['profession_id', 'professionId']
      ],
      where: {
        author_id: id,
        work_id: workId,
        is_delete: false,
      },
      raw: true,
    });
    res = res.map((item) => {
      return item.professionId;
    });
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 获取作者在小作品列表中的职种
   * @param id:int 作者id
   * @param workIdList:Array<int> 作品id列表
   * @returns Array<Array<int>>
   */
  async workListProfessionIdList(id, workIdList) {
    if(!id || !workIdList) {
      return;
    }
    if(!workIdList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      workIdList.map((workId) => {
        if(workId !== null && workId !== undefined) {
          return app.redis.get('authorWorkProfessionIdList_' + id + '_' + workId);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let workId = workIdList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('authorWorkProfessionIdList_' + id + '_' + workId, CACHE_TIME);
      }
      else if(workId !== null && workId !== undefined) {
        if(!noCacheIdHash[workId]) {
          noCacheIdHash[workId] = true;
          noCacheIdList.push(workId);
        }
        noCacheIndexList.push(i);
      }
    });
    if(noCacheIdList.length) {
      let res = await app.model.workAuthorRelation.findAll({
        attributes: [
          ['work_id', 'workId'],
          ['profession_id', 'professionId']
        ],
        where: {
          author_id: id,
          work_id: noCacheIdList,
          is_delete: false,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.workId;
          let temp = hash[id] = hash[id] || [];
          temp.push(item.professionId);
        });
      }
      noCacheIndexList.forEach((i) => {
        let workId = workIdList[i];
        let temp = hash[workId] || [];
        cache[i] = temp;
        app.redis.setex('authorWorkProfessionIdList_' + id + '_' + workId, CACHE_TIME, JSON.stringify(temp));
      });
    }
    return cache;
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
        delete item.author;
      }
    });
    return workList.map((item, i) => {
      let worksId = worksIdList[i];
      let copy = Object.assign({}, worksHash[worksId] || {});
      copy.work = item;
      return copy;
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
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.workAuthorRelation.findOne({
      attributes: [
        Sequelize.literal('COUNT(DISTINCT work_id) AS num')
      ],
      where: {
        author_id: id,
        kind,
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
        app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
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
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
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
      // app.redis.expire(cacheKey, CACHE_TIME);
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
      },
      offset,
      limit,
      raw: true,
    });
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  async allCount() {
    const { app } = this;
    let cacheKey = 'allAuthorCount';
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
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
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
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
        app.redis.expire(cacheKey, CACHE_TIME);
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
        },
        order: [
          ['create_time', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      if(offset === 0) {
        app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
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
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.authorDynamic.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        author_id: id,
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
}

module.exports = Service;
