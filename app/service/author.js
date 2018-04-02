/**
 * Created by army8735 on 2018/3/19.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

const CACHE_TIME = 10;

class Service extends egg.Service {
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
        is_delete: false,
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
      idList.map(function(id) {
        return app.redis.get('authorInfo_' + id);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
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
            app.redis.setex('authorInfo_' + id, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('authorInfo_' + id, CACHE_TIME, 'null');
          }
        });
      }
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
    });
    if(!res.length) {
      res = null;
    }
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }
  async comment(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    let [data, size] = await Promise.all([
      this.commentData(id, offset, limit),
      this.commentSize(id)
    ]);
    return { data, size };
  }
  async commentData(id, offset, limit) {
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
      .from('author_comment_relation')
      .from('comment')
      .field('comment.id')
      .field('comment.user_id', 'userId')
      .field('comment.author_id', 'authorId')
      .field('comment.content')
      .field('comment.parent_id', 'parentId')
      .field('comment.root_id', 'rootId')
      .field('comment.create_time', 'createTime')
      .where('author_comment_relation.author_id=?', id)
      .where('author_comment_relation.comment_id=comment.root_id')
      .where('comment.is_delete=false')
      .order('comment.id', false)
      .offset(offset)
      .limit(limit)
      .toString();
    let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    res = await service.comment.plusList(res);
    return res;
  }

  /**
   * 获取作者下留言数量
   * @param id:int 作者id
   * @returns int 留言数量
   */
  async commentSize(id) {
    const { app } = this;
    let cacheKey = 'authorCommentSize_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = `SELECT
      num
      FROM author_comment_relation, comment_num
      WHERE author_comment_relation.author_id=${id}
      AND author_comment_relation.comment_id=comment_num.comment_id
      AND type=0;`;
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
    });
    if(res.length) {
      res = res.map(function(item) {
        item = item.toJSON();
        return item.worksId;
      });
      if(offset === 0) {
        app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
      }
    }
    return res;
  }
  async mainWorksSize(id) {
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
    let sql = `SELECT
      COUNT(*) AS num
      FROM author_main_works
      WHERE author_id=${id}
      AND is_delete=false`;
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
    let [idList, size] = await Promise.all([
      this.mainWorksIdList(id, offset, limit),
      this.mainWorksSize(id)
    ]);
    // 根据id获取信息
    let data = await this.worksListByIdList(id, idList);
    return {
      size,
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
    let [worksList, worksListProfessionIdList] = await Promise.all([
      service.works.infoList(worksIdList),
      this.worksListProfessionIdList(worksIdList, id)
    ]);
    // 汇集所有大作品类型
    let worksTypeList = [];
    let hash = {};
    worksList.forEach(function(item) {
      if(!hash[item.type]) {
        hash[item.type] = true;
        worksTypeList.push(item.type);
      }
    });
    // 汇集全部职种id
    let professionIdList = [];
    hash = {};
    worksListProfessionIdList.forEach(function(item) {
      if(item) {
        item.forEach(function(id) {
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
    worksTypeList.forEach(function(worksType, i) {
      let sort = typeListProfessionSort[i];
      if(sort) {
        typeProfessionSortHash[worksType] = sort;
      }
    });
    let professionHash = {};
    professionList.forEach(function(item) {
      if(item) {
        professionHash[item.id] = item;
      }
    });
    // 遍历大作品，根据对应的排序信息将最优先展示的职种放入；如果没有排序，默认第一个
    worksList.forEach(function(item, i) {
      let type = item.type;
      let sort = typeProfessionSortHash[type];
      let professionIdList = worksListProfessionIdList[i];
      if(sort) {
        if(professionIdList && professionIdList.length) {
          let has = {};
          professionIdList.forEach(function(item) {
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
      idList.map(function(worksId) {
        if(worksId !== null && worksId !== undefined) {
          return app.redis.get('authorWorksProfessionIdList_' + id + '_' + worksId);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
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
      });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          item = item.toJSON();
          let temp = hash[item.worksId] = hash[item.worksId] || [];
          temp.push(item.professionId);
        });
        noCacheIndexList.forEach(function(i) {
          let worksId = idList[i];
          let temp = hash[worksId];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('authorWorksProfessionIdList_' + id + '_' + worksId, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('authorWorksProfessionIdList_' + id + '_' + worksId, CACHE_TIME, 'null');
          }
        });
      }
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
    let sql = `SELECT
      DISTINCT id
      FROM music_album_author_profession_relation
      WHERE author_id=${id}
      AND is_delete=false
      ORDER BY id
      LIMIT ${offset},${limit};`;
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    let idList = res.map(function(item) {
      return item.id;
    });
    sql = `SELECT
      album_id AS albumId
      FROM music_album_author_profession_relation
      WHERE id IN (${idList.join(', ')})`;
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    res = res.map(function(item) {
      return item.albumId;
    });
    if(offset === 0) {
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    return res;
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
    let [idList, size] = await Promise.all([
      this.musicAlbumIdList(id, offset, limit),
      this.musicAlbumSize(id)
    ]);
    let data = await service.musicAlbum.infoList(idList);
    return {
      size,
      data,
    };
  }
  async musicAlbumSize(id) {
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
    let sql = `SELECT
      COUNT(*) AS num
      FROM music_album_author_profession_relation
      WHERE author_id=${id}
      AND is_delete=false`;
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
      let sql = `SELECT
        DISTINCT kind
        FROM works_author_profession_relation
        WHERE works_author_profession_relation.author_id=${id}
        ORDER BY kind`;
      kindList = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      kindList = kindList.map(function(item) {
        return item.kind;
      });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(kindList));
    }
    // 取得种类列表下对应的职种id列表
    let professionIdList = await this.workKindListProfessionIdList(id, kindList);
    let professionIdHash = {};
    let pid = [];
    professionIdList.forEach(function(list) {
      list.forEach(function(id) {
        if(!professionIdHash[id]) {
          professionIdHash[id] = true;
          pid.push(id);
        }
      });
    });
    // 根据去重的职种id列表获取职种信息列表
    let professionList = await service.profession.infoList(pid);
    let professionHash = {};
    professionList.forEach(function(item) {
      professionHash[item.id] = item;
    });
    let res = kindList.map(function(kind, i) {
      let temp = {
        kind,
        name: service.work.getKindName(kind),
      };
      let list = [];
      professionIdList[i].forEach(function(item) {
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
      kindList.map(function(kind) {
        return app.redis.get('authorWorkKindListProfessionIdList_' + id + '_' + kind);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
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
      let sql = `SELECT
        DISTINCT profession_id AS professionId,
        kind
        FROM works_author_profession_relation
        WHERE author_id=${id}
        AND kind IN (${noCacheIdList.join(', ')})
        ORDER BY kind`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          hash[item.kind] = hash[item.kind] || [];
          hash[item.kind].push(item.professionId);
        });
        noCacheIndexList.forEach(function(i) {
          let kind = kindList[i];
          let temp = hash[kind];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('authorWorkKindListProfessionIdList_' + id + '_' + kind, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('authorWorkKindListProfessionIdList_' + id + '_' + kind, CACHE_TIME, 'null');
          }
        });
      }
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
    let sql = `SELECT
      DISTINCT works_author_profession_relation.work_id AS workId
      FROM works_author_profession_relation, works
      WHERE works_author_profession_relation.author_id=${id}
      AND works_author_profession_relation.kind=${kind}
      AND works_author_profession_relation.is_delete=false
      AND works_author_profession_relation.works_id=works.id
      AND works.state=0
      ORDER BY workId DESC
      LIMIT ${offset},${limit};`;
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    res = res.map(function(item) {
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
      idList.map(function(workId) {
        return app.redis.get('authorKindWorkBaseList_' + workId);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
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
      let sql = `SELECT
        work_id AS workId,
        works_id AS worksId,
        profession_id AS professionId
        FROM works_author_profession_relation
        WHERE works_author_profession_relation.author_id=${id}
        AND work_id IN (${noCacheIdList.join(', ')})`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          let temp = hash[item.workId] = hash[item.workId] || {
            worksId: item.worksId,
            workId: item.workId,
            professionIdList: [],
          };
          if(item.worksId === temp.worksId) {
            temp.professionIdList.push(item.professionId);
          }
        });
        noCacheIndexList.forEach(function(i) {
          let workId = idList[i];
          let temp = hash[workId];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('authorKindWorkBaseList_' + workId, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('authorKindWorkBaseList_' + workId, CACHE_TIME, 'null');
          }
        });
      }
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
    list.forEach(function(item) {
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
      pIdList.forEach(function(professionId) {
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
    worksInfoList.forEach(function(item) {
      worksInfoHash[item.id] = item;
    });
    let workInfoHash = {};
    workInfoList.forEach(function(item) {
      workInfoHash[item.id] = item;
    });
    let professionInfoHash = {};
    professionInfoList.forEach(function(item) {
      professionInfoHash[item.id] = item;
    });
    return list.map(function(item) {
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
      pIdList.forEach(function(professionId) {
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
   * @returns { data: Array<Object>, size: int }
   */
  async kindWork(id, kind, offset, limit) {
    if(!id) {
      return;
    }
    let [data, size] = await Promise.all([
      this.kindWorkData(id, kind, offset, limit),
      this.kindWorkSize(id, kind)
    ]);
    return { data, size };
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
    let sql = `SELECT
      COUNT(DISTINCT works_author_profession_relation.work_id) as num
      FROM works_author_profession_relation, works
      WHERE works_author_profession_relation.author_id=${id}
      AND works_author_profession_relation.kind=${kind}
      AND works_author_profession_relation.is_delete=false
      AND works_author_profession_relation.works_id=works.id
      AND works.state=0;`;
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
}

module.exports = Service;
