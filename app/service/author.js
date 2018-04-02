/**
 * Created by army8735 on 2018/3/19.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
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
        ['is_settled', 'isSettled']
      ],
      where: {
        id,
        is_deleted: false,
      },
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
      let sql = `SELECT
        author.id,
        author.name,
        author.head_url AS headUrl,
        author.sign,
        author.fans_name AS fansName,
        author.fans_circle_name AS fansCircleName,
        author.is_settled AS isSettled
        FROM author
        WHERE id IN(${noCacheIdList.join(', ')})
        AND is_deleted=false;`;
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
        is_deleted: false,
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
        is_deleted: false,
      },
    });
    if(!res.length) {
      res = null;
    }
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }
  async comment(id, skip, take) {
    let [data, size] = await Promise.all([
      this.commentData(id, skip, take),
      this.commentSize(id)
    ]);
    return { data, size };
  }
  async commentData(id, skip = 0, take = 1) {
    if(!id) {
      return;
    }
    skip = parseInt(skip) || 0;
    take = parseInt(take) || 1;
    if(skip < 0 || take < 1) {
      return;
    }
    const { app, service } = this;
    let sql = `SELECT
      comment.id,
      comment.user_id AS userId,
      comment.author_id AS authorId,
      comment.content,
      comment.parent_id AS parentId,
      comment.root_id AS rootId,
      comment.create_time AS createTime,
      comment.update_time AS updateTime
      FROM comment, author_comment_relation
      WHERE author_comment_relation.author_id=${id}
      AND author_comment_relation.comment_id=comment.root_id
      AND comment.is_deleted=false
      ORDER BY comment.id DESC
      LIMIT ${skip},${take};`;
    let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(res.length) {
      let userIdHash = {};
      let userIdList = [];
      let authorIdHash = {};
      let authorIdList = [];
      let quoteIdList = [];
      res.forEach(function(item) {
        if(item.authorId) {
          if(!authorIdHash[item.authorId]) {
            authorIdHash[item.authorId] = true;
            authorIdList.push(item.authorId);
          }
          delete item.userId;
          item.isAuthor = true;
        }
        else {
          if(!userIdHash[item.userId]) {
            userIdHash[item.userId] = true;
            userIdList.push(item.userId);
          }
          delete item.authorId;
        }
        if(item.rootId !== item.parentId && item.rootId !== 0) {
          quoteIdList.push(item.parentId);
        }
      });
      let quotes = await service.comment.infoList(quoteIdList);
      let quoteHash = {};
      quotes.forEach(function(item) {
        if(item.authorId) {
          if(!authorIdHash[item.authorId]) {
            authorIdHash[item.authorId] = true;
            authorIdList.push(item.authorId);
          }
          delete item.userId;
          item.isAuthor = true;
        }
        else {
          if(!userIdHash[item.userId]) {
            userIdHash[item.userId] = true;
            userIdList.push(item.userId);
          }
          delete item.authorId;
        }
        quoteHash[item.id] = item;
        if(item.content.length > 60) {
          item.slice = true;
          item.content = item.content.slice(0, 60) + '...';
        }
      });
      let [userList, authorList] = await Promise.all([
        service.user.infoList(userIdList),
        service.author.infoList(authorIdList)
      ]);
      userIdHash = {};
      userList.forEach(function(item) {
        userIdHash[item.id] = item;
      });
      authorIdHash = {};
      authorList.forEach(function(item) {
        authorIdHash[item.id] = item;
      });
      quotes.forEach(function(item) {
        if(item.isAuthor) {
          item.name = authorIdHash[item.authorId].name;
          item.headUrl = authorIdHash[item.authorId].headUrl;
        }
        else {
          item.nickname = userIdHash[item.userId].nickname;
          item.headUrl = userIdHash[item.userId].headUrl;
        }
      });
      res.forEach(function(item) {
        if(item.isAuthor) {
          item.name = authorIdHash[item.authorId].name;
          item.headUrl = authorIdHash[item.authorId].headUrl;
        }
        else {
          item.nickname = userIdHash[item.userId].nickname;
          item.headUrl = userIdHash[item.userId].headUrl;
        }
        if(item.rootId !== item.parentId && item.rootId !== 0) {
          item.quote = quoteHash[item.parentId];
        }
      });
    }
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
   * @param aid:int 作者id
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Array<Object> 主打大作品id列表
   */
  async mainWorksIdList(aid, skip, take) {
    if(!aid) {
      return;
    }
    skip = parseInt(skip) || 0;
    take = parseInt(take) || 1;
    if(skip < 0 || take < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorMainWorksIdList_' + aid + '_' + skip + '_' + take;
    let res;
    if(skip === 0) {
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
        author_id: aid,
        is_deleted: false,
      },
      offset: skip,
      limit: take,
      order: [
        ['weight', 'DESC'],
      ],
    });
    if(res.length) {
      res = res.map(function(item) {
        item = item.toJSON();
        return item.worksId;
      });
      if(skip === 0) {
        app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
      }
    }
    return res;
  }
  async mainWorksSize(aid) {
    if(!aid) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorMainWorksSize_' + aid;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = `SELECT
      COUNT(*) AS num
      FROM author_main_works
      WHERE author_id=${aid}
      AND is_deleted=false`;
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
   * @param aid:int 作者id
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Array<Object> 大作品信息列表
   */
  async mainWorks(aid, skip, take) {
    if(!aid) {
      return;
    }
    // 先取得作者所有主打大作品列表id
    let [idList, size] = await Promise.all([
      this.mainWorksIdList(aid, skip, take),
      this.mainWorksSize(aid)
    ]);
    // 根据id获取信息
    let data = await this.worksListByIdList(aid, idList);
    return {
      size,
      data,
    };
  }

  /**
   * 根据作者id和大作品id列表获取大作品信息及作者在此大作品中的优先显示职种
   * @param aid:int 作者id
   * @param worksIdList:Array<int> 大作品id列表
   * @returns Array<Object>
   */
  async worksListByIdList(aid, worksIdList) {
    if(!aid || !worksIdList) {
      return;
    }
    if(!worksIdList.length) {
      return [];
    }
    const { service } = this;
    // 获取大作品信息、作者在此大作品中的职种id
    let [worksList, worksListProfessionIdList] = await Promise.all([
      service.works.infoList(worksIdList),
      this.worksListProfessionIdList(worksIdList, aid)
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
   * @param aid 作者id
   * @returns Array<Array<int>> 对应idList索引序，每项为此大作品中作者id参与的职种id列表
   */
  async worksListProfessionIdList(idList, aid) {
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
          return app.redis.get('authorWorksProfessionIdList_' + aid + '_' + worksId);
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
        app.redis.expire('authorWorksProfessionIdList_' + aid + '_' + worksId, CACHE_TIME);
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
          author_id: aid,
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
            app.redis.setex('authorWorksProfessionIdList_' + aid + '_' + worksId, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('authorWorksProfessionIdList_' + aid + '_' + worksId, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 获取作者的专辑信息id列表
   * @param aid:int 作者id
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Array<int> 专辑信息id列表
   */
  async musicAlbumIdList(aid, skip, take) {
    if(!aid) {
      return;
    }
    skip = parseInt(skip) || 0;
    take = parseInt(take) || 1;
    if(skip < 0 || take < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorMusicAlbumIdList_' + aid + '_' + skip + '_' + take;
    let res;
    if(skip === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        app.redis.expire(cacheKey, CACHE_TIME);
        return JSON.parse(res);
      }
    }
    let sql = `SELECT
      DISTINCT id
      FROM music_album_author_profession_relation
      WHERE author_id=${aid}
      AND is_deleted=false
      ORDER BY id
      LIMIT ${skip},${take};`;
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
    if(skip === 0) {
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    return res;
  }

  /**
   * 获取作者的专辑信息列表
   * @param aid:int 作者id
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Array<Object> 专辑信息列表
   */
  async musicAlbum(aid, skip, take) {
    if(!aid) {
      return;
    }
    const { service } = this;
    // 先取得作者所有参与专辑列表id
    let [idList, size] = await Promise.all([
      this.musicAlbumIdList(aid, skip, take),
      this.musicAlbumSize(aid)
    ]);
    let data = await service.musicAlbum.infoList(idList);
    return {
      size,
      data,
    };
  }
  async musicAlbumSize(aid) {
    if(!aid) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorMusicAlbumSize_' + aid;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = `SELECT
      COUNT(*) AS num
      FROM music_album_author_profession_relation
      WHERE author_id=${aid}
      AND is_deleted=false`;
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
   * @param aid:int 作者id
   * @returns Array<int>
   */
  async workKindList(aid) {
    if(!aid) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'authorWorkKindList_' + aid;
    let kindList = await app.redis.get(cacheKey);
    if(kindList) {
      app.redis.expire(cacheKey, CACHE_TIME);
      kindList = JSON.parse(kindList);
    }
    else {
      let sql = `SELECT
        DISTINCT kind
        FROM works_author_profession_relation
        WHERE works_author_profession_relation.author_id=${aid}
        ORDER BY kind`;
      kindList = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      kindList = kindList.map(function(item) {
        return item.kind;
      });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(kindList));
    }
    // 取得种类列表下对应的职种id列表
    let professionIdList = await this.workKindListProfessionIdList(aid, kindList);
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
   * @param aid:int 作者id
   * @param kindList:Array<int> 种类列表
   * @returns {Promise<void>}
   */
  async workKindListProfessionIdList(aid, kindList) {
    if(!aid || !kindList) {
      return;
    }
    if(!kindList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      kindList.map(function(kind) {
        return app.redis.get('authorWorkKindListProfessionIdList_' + aid + '_' + kind);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let kind = kindList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('authorWorkKindListProfessionIdList_' + aid + '_' + kind, CACHE_TIME);
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
        WHERE author_id=${aid}
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
            app.redis.setex('authorWorkKindListProfessionIdList_' + aid + '_' + kind, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('authorWorkKindListProfessionIdList_' + aid + '_' + kind, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }


  /**
   * 获取作者参与小作品种类的小作品id列表
   * @param aid:int 作者id
   * @param kind:int 种类
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Array<Object>
   */
  async kindWorkIdList(aid, kind, skip, take) {
    if(!aid || kind === null || kind === undefined) {
      return;
    }
    skip = parseInt(skip) || 0;
    take = parseInt(take) || 1;
    if(skip < 0 || take < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorKindWorkIdList_' + aid + '_' + kind + '_' + skip + '_' + take;
    let res;
    if(skip === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        app.redis.expire(cacheKey, CACHE_TIME);
        return JSON.parse(res);
      }
    }
    let sql = `SELECT
      DISTINCT works_author_profession_relation.work_id AS workId
      FROM works_author_profession_relation, works
      WHERE works_author_profession_relation.author_id=${aid}
      AND works_author_profession_relation.kind=${kind}
      AND works_author_profession_relation.is_deleted=false
      AND works_author_profession_relation.works_id=works.id
      AND works.state=0
      ORDER BY workId DESC
      LIMIT ${skip},${take};`;
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    res = res.map(function(item) {
      return item.workId;
    });
    if(skip === 0) {
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    return res;
  }

  /**
   * 获取作者参与小作品种类的小大作品基本信息列表
   * @param aid:int 作者id
   * @param idList:Array<int> 小作品id列表
   * @returns Array<Object>
   */
  async kindWorkBaseList(aid, idList) {
    if(!aid || !idList) {
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
        WHERE works_author_profession_relation.author_id=${aid}
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
   * @param aid:int 作者id
   * @param kind:int 种类
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Array<Object>
   */
  async kindWorkData(aid, kind, skip, take) {
    if(!aid || kind === null || kind === undefined) {
      return;
    }
    const { service } = this;
    let idList = await this.kindWorkIdList(aid, kind, skip, take);
    let list = await this.kindWorkBaseList(aid, idList);
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
   * @param aid:int 作者id
   * @param kind:int 种类
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns { data: Array<Object>, size: int }
   */
  async kindWork(aid, kind, skip, take) {
    if(!aid) {
      return;
    }
    let [data, size] = await Promise.all([
      this.kindWorkData(aid, kind, skip, take),
      this.kindWorkSize(aid, kind)
    ]);
    return { data, size };
  }

  /**
   * 获取作者参与小作品种类的小作品列表size
   * @param aid:int 作者id
   * @param kind:int 种类
   * @returns int
   */
  async kindWorkSize(aid, kind) {
    if(!aid || kind === null || kind === undefined) {
      return;
    }
    const { app } = this;
    let cacheKey = 'kindWorkSize_' + aid + '_' + kind;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = `SELECT
      COUNT(DISTINCT works_author_profession_relation.work_id) as num
      FROM works_author_profession_relation, works
      WHERE works_author_profession_relation.author_id=${aid}
      AND works_author_profession_relation.kind=${kind}
      AND works_author_profession_relation.is_deleted=false
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
