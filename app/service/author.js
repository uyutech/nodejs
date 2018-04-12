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
        return app.redis.get('authorInfo_' + id);
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
    if(!res.length) {
      res = null;
    }
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
    if(!res.length) {
      res = null;
    }
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
   * 关注/取关作者
   * @param id:int 作者id
   * @param uid:int 用户id
   * @param state
   * @returns Object{ count:int, state:boolean }
   */
  async follow(id, uid, state) {
    if(!id || !uid) {
      return;
    }
    state = !!state;
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
    const { app, ctx, service } = this;
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
        app.model.userPersonRelation.create({
          user_id: uid,
          target_id: id,
          type: 3,
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
            type: 3,
          },
        })
      ]);
    }
    // 更新计数，优先内存缓存
    cacheKey = 'authorFansCount_' + id;
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
    let cacheKey = 'authorMainWorksIdList_' + id + '_' + offset + '_' + limit;
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
    let sql = squel.select()
      .from('author_main_works')
      .field('COUNT(*)', 'num')
      .where('author_id', id)
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
    // 获取大作品信息、作者在此大作品中的职种id
    let [worksList, worksListProfessionIdList, numList] = await Promise.all([
      service.works.infoList(worksIdList),
      this.worksListProfessionIdList(worksIdList, id),
      service.works.numCountList(worksIdList, 1)
    ]);
    // 汇集所有大作品类型
    let worksTypeList = [];
    let hash = {};
    worksList.forEach((item, i) => {
      if(!hash[item.type]) {
        hash[item.type] = true;
        worksTypeList.push(item.type);
      }
      item.popular = numList[i] || 0;
    });
    // 汇集全部职种id
    let professionIdList = [];
    hash = {};
    worksListProfessionIdList.forEach((item) => {
      if(item) {
        item.forEach((id) => {
          if(id !== null && id !== undefined && !hash[id]) {
            hash[id] = true;
            professionIdList.push(id);
          }
        });
      }
    });
    // 查询大作品类型对应的排序规则，和职种名称
    let [typeListProfessionSort, professionList] = await Promise.all([
      service.works.typeListProfessionSort(worksTypeList),
      service.profession.infoList(professionIdList),
    ]);
    let typeProfessionSortHash = {};
    worksTypeList.forEach((worksType, i) => {
      let sort = typeListProfessionSort[i];
      if(sort) {
        typeProfessionSortHash[worksType] = sort;
      }
    });
    let professionHash = {};
    professionList.forEach((item) => {
      if(item) {
        professionHash[item.id] = item;
      }
    });
    // 遍历大作品，根据对应的排序信息将最优先展示的职种放入；如果没有排序，默认第一个
    worksList.forEach((item, i) => {
      let type = item.type;
      let sort = typeProfessionSortHash[type];
      let professionIdList = worksListProfessionIdList[i];
      if(sort) {
        if(professionIdList && professionIdList.length) {
          let has = {};
          professionIdList.forEach((item) => {
            has[item] = true;
          });
          for(let j = 0, len = sort.length; j < len; j++) {
            let professionId = sort[j].professionId;
            if(has[professionId]) {
              item.profession = professionHash[professionId];
              break;
            }
          }
        }
      }
      else if(professionIdList.length) {
        item.profession = professionHash[professionIdList[0]];
      }
    });
    return worksList;
  }

  /**
   * 获取大作品id列表中，作者id参与的职种id列表
   * @param idList<int> 大作品id列表
   * @param id:int 作者id
   * @returns Array<Array<int>> 对应idList索引序，每项为此大作品中作者id参与的职种id列表
   */
  async worksListProfessionIdList(idList, id) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map((worksId) => {
        if(worksId !== null && worksId !== undefined) {
          return app.redis.get('authorWorksProfessionIdList_' + id + '_' + worksId);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let worksId = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('authorWorksProfessionIdList_' + id + '_' + worksId, CACHE_TIME);
      }
      else if(worksId !== null && worksId !== undefined) {
        if(!noCacheIdHash[worksId]) {
          noCacheIdHash[worksId] = true;
          noCacheIdList.push(worksId);
        }
        noCacheIndexList.push(i);
      }
    });
    if(noCacheIdList.length) {
      let res = await app.model.worksAuthorProfessionRelation.findAll({
        attributes: [
          ['works_id', 'worksId'],
          ['profession_id', 'professionId']
        ],
        where: {
          works_id: noCacheIdList,
          author_id: id,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let temp = hash[item.worksId] = hash[item.worksId] || [];
          temp.push(item.professionId);
        });
      }
      noCacheIndexList.forEach((i) => {
        let worksId = idList[i];
        let temp = hash[worksId] || null;
        cache[i] = temp;
        app.redis.setex('authorWorksProfessionIdList_' + id + '_' + worksId, CACHE_TIME, JSON.stringify(temp));
      });
    }
    return cache;
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
    let cacheKey = 'authorMusicAlbumIdList_' + id + '_' + offset + '_' + limit;
    let res;
    if(offset === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        app.redis.expire(cacheKey, CACHE_TIME);
        return JSON.parse(res);
      }
    }
    let sql = squel.select()
      .from('music_album_author_profession_relation')
      .field('album_id', 'albumId')
      .distinct()
      .where('author_id=?', id)
      .where('is_delete=false')
      .offset(offset)
      .limit(limit)
      .toString();
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
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
    let [data, numCountList] = await Promise.all([
      service.musicAlbum.infoList(idList),
      service.works.numCountList(idList, 1)
    ]);
    data.forEach((item, i) => {
      item.popular = numCountList[i] || 0;
    });
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
    res = await app.model.musicAlbumAuthorProfessionRelation.findOne({
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
      let sql = squel.select()
        .from('works_author_profession_relation')
        .field('kind')
        .distinct()
        .where('author_id=?', id)
        .order('kind')
        .toString();
      kindList = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      kindList = kindList.map((item) => {
        return item.kind;
      });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(kindList));
    }
    // 取得种类列表下对应的职种id列表
    let professionIdList = await this.workKindListProfessionIdList(id, kindList);
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
    let res = kindList.map((kind, i) => {
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
    return res;
  }

  /**
   * 获取作者小作品种类的职种信息
   * @param id:int 作者id
   * @param kindList:Array<int> 种类列表
   * @returns {Promise<void>}
   */
  async workKindListProfessionIdList(id, kindList) {
    if(!id || !kindList) {
      return;
    }
    if(!kindList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      kindList.map((kind) => {
        return app.redis.get('authorWorkKindListProfessionIdList_' + id + '_' + kind);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let kind = kindList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('authorWorkKindListProfessionIdList_' + id + '_' + kind, CACHE_TIME);
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
      let sql = squel.select()
        .from('works_author_profession_relation')
        .field('profession_id', 'professionId')
        .field('kind')
        .distinct()
        .where('author_id=?', id)
        .where('kind IN ?', noCacheIdList)
        .toString();
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
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
        app.redis.setex('authorWorkKindListProfessionIdList_' + id + '_' + kind, CACHE_TIME, JSON.stringify(temp));
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
   * @returns Array<Object>
   */
  async kindWorkIdList(id, kind, offset, limit) {
    if(!id || kind === null || kind === undefined) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorKindWorkIdList_' + id + '_' + kind + '_' + offset + '_' + limit;
    let res;
    if(offset === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        app.redis.expire(cacheKey, CACHE_TIME);
        return JSON.parse(res);
      }
    }
    let sql = squel.select()
      .from('works_author_profession_relation')
      .from('works')
      .field('works_author_profession_relation.work_id', 'workId')
      .distinct()
      .where('works_author_profession_relation.author_id=?', id)
      .where('works_author_profession_relation.kind=?', kind)
      .where('works_author_profession_relation.is_delete=false')
      .where('works_author_profession_relation.works_id=works.id')
      .where('works.state=0')
      .order('workId', false)
      .offset(offset)
      .limit(limit)
      .toString();
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    res = res.map((item) => {
      return item.workId;
    });
    if(offset === 0) {
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    return res;
  }

  /**
   * 获取作者参与小作品种类的小大作品基本信息列表
   * @param id:int 作者id
   * @param idList:Array<int> 小作品id列表
   * @returns Array<Object>
   */
  async kindWorkBaseList(id, idList) {
    if(!id || !idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map((workId) => {
        return app.redis.get('authorKindWorkBaseList_' + workId);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let workId = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('authorKindWorkBaseList_' + workId, CACHE_TIME);
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
      let res = await app.model.worksAuthorProfessionRelation.findAll({
        attributes: [
          ['work_id', 'workId'],
          ['works_id', 'worksId'],
          ['profession_id', 'professionId']
        ],
        where: {
          author_id: id,
          work_id: noCacheIdList,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let temp = hash[item.workId] = hash[item.workId] || {
            worksId: item.worksId,
            workId: item.workId,
            professionIdList: [],
          };
          if(item.worksId === temp.worksId) {
            temp.professionIdList.push(item.professionId);
          }
        });
      }
      noCacheIndexList.forEach((i) => {
        let workId = idList[i];
        let temp = hash[workId] || null;
        cache[i] = temp;
        app.redis.setex('authorKindWorkBaseList_' + workId, CACHE_TIME, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 获取作者参与小作品种类的大作品列表
   * @param id:int 作者id
   * @param kind:int 种类
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async kindWorkData(id, kind, offset, limit) {
    if(!id || kind === null || kind === undefined) {
      return;
    }
    const { service } = this;
    let idList = await this.kindWorkIdList(id, kind, offset, limit);
    let list = await this.kindWorkBaseList(id, idList);
    let worksIdList = [];
    let worksIdHash = {};
    let workIdList = [];
    let workIdHash = {};
    let professionIdList = [];
    let professionIdHash = {};
    list.forEach((item) => {
      let worksId = item.worksId;
      if(!worksIdHash[worksId]) {
        worksIdHash[worksId] = true;
        worksIdList.push(worksId);
      }
      let workId = item.workId;
      if(!workIdHash[workId]) {
        workIdHash[workId] = true;
        workIdList.push(workId);
      }
      let pIdList = item.professionIdList;
      pIdList.forEach((professionId) => {
        if(!professionIdHash[professionId]) {
          professionIdHash[professionId] = true;
          professionIdList.push(professionId);
        }
      });
    });
    let [worksInfoList, professionInfoList, workInfoList] = await Promise.all([
      service.works.infoList(worksIdList),
      service.profession.infoList(professionIdList),
      service.work.infoList(workIdList, kind)
    ]);
    let worksInfoHash = {};
    worksInfoList.forEach((item) => {
      worksInfoHash[item.id] = item;
    });
    let workInfoHash = {};
    workInfoList.forEach((item) => {
      workInfoHash[item.id] = item;
    });
    let professionInfoHash = {};
    professionInfoList.forEach((item) => {
      professionInfoHash[item.id] = item;
    });
    return list.map((item) => {
      let temp = {
        id: item.worksId,
      };
      if(worksInfoHash[temp.id]) {
        Object.assign(temp, worksInfoHash[temp.id]);
      }
      if(workInfoHash[item.workId]) {
        temp.work = workInfoHash[item.workId];
      }
      temp.professionList = [];
      let pIdList = item.professionIdList;
      pIdList.forEach((professionId) => {
        if(professionInfoHash[professionId]) {
          temp.professionList.push(professionInfoHash[professionId]);
        }
      });
      return temp;
    });
  }

  /**
   * 获取作者参与小作品种类的大作品列表和分页数据
   * @param id:int 作者id
   * @param kind:int 种类
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns { data: Array<Object>, count: int }
   */
  async kindWork(id, kind, offset, limit) {
    if(!id) {
      return;
    }
    let [data, count] = await Promise.all([
      this.kindWorkData(id, kind, offset, limit),
      this.kindWorkSize(id, kind)
    ]);
    return { data, count };
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
    let sql = squel.select()
      .from('works_author_profession_relation')
      .from('works')
      .field('COUNT(DISTINCT works_author_profession_relation.work_id)', 'num')
      .where('works_author_profession_relation.author_id=?', id)
      .where('works_author_profession_relation.kind=?', kind)
      .where('works_author_profession_relation.is_delete=false')
      .where('works_author_profession_relation.works_id=works.id')
      .where('works.state=0')
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
    let cacheKey = 'authorIdListByName_' + name + '_' + offset + '_' + limit;
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
}

module.exports = Service;
