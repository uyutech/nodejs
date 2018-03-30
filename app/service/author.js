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
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('authorInfo_' + id, CACHE_TIME);
      }
      else if(id !== null && id !== undefined) {
        noCacheIdList.push(id);
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
      let hash = {};
      res.forEach(function(item) {
        let id = item.id;
        hash[id] = item;
        app.redis.setex('authorInfo_' + id, CACHE_TIME, JSON.stringify(item));
      });
      cache.forEach(function(item, i) {
        let id = idList[i];
        if(!item && hash[id]) {
          cache[i] = hash[id];
        }
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
   * @param id:int 作者id
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Array<Object> 主打大作品id列表
   */
  async mainWorksIdList(id, skip, take) {
    if(!id) {
      return;
    }
    skip = parseInt(skip) || 0;
    take = parseInt(take) || 1;
    const { app } = this;
    let cacheKey = 'authorMainWorksIdList_' + id + '_' + skip + '_' + take;
    let res;
    if(skip === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        app.redis.expire(cacheKey, CACHE_TIME);
        return JSON.parse(res);
      }
    }
    let sql = `SELECT
      works_id AS worksId
      FROM author_main_works
      WHERE author_id=${id}
      AND is_deleted=false
      ORDER BY weight DESC
      LIMIT ${skip},${take};`;
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    res = res.map(function(item) {
      return item.worksId;
    });
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 获取作者参与大作品信息列表
   * @param id:int 作者id
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Array<Object> 大作品信息列表
   */
  async mainWorksList(id, skip, take) {
    if(!id) {
      return;
    }
    // 先取得作者所有主打大作品列表id
    let worksIdList = await this.mainWorksIdList(id, skip, take);
    let res = await this.worksListByWorksIdList(id, worksIdList);
    return res;
  }

  /**
   * 获取作者参与大作品id列表
   * @param id:int 作者id
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Array<Object> 大作品id列表
   */
  async worksIdList(id, skip, take) {
    if(!id) {
      return;
    }
    skip = parseInt(skip) || 0;
    take = parseInt(take) || 1;
    const { app } = this;
    let cacheKey = 'authorWorksIdList_' + id + '_' + skip + '_' + take;
    let res;
    if(skip === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        app.redis.expire(cacheKey, CACHE_TIME);
        return JSON.parse(res);
      }
    }
    let sql = `SELECT
      DISTINCT(works_work_relation.works_id) AS worksId
      FROM work_author_profession_relation, work, works_work_relation
      WHERE work_author_profession_relation.author_id=${id}
      AND work_author_profession_relation.work_id=work.id
      AND work.id=works_work_relation.work_id
      LIMIT ${skip},${take};`;
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    res = res.map(function(item) {
      return item.worksId;
    });
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 获取作者参与大作品信息列表
   * @param id:int 作者id
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Array<Object> 大作品信息列表
   */
  async worksList(id, skip, take) {
    if(!id) {
      return;
    }
    // 先取得作者所有大作品列表id
    let worksIdList = await this.worksIdList(id, skip, take);
    let res = await this.worksListByWorksIdList(id, worksIdList);
    return res;
  }


  async worksListByWorksIdList(id, worksIdList) {
    if(!id || !worksIdList) {
      return;
    }
    if(!worksIdList.length) {
      return [];
    }
    const { service } = this;
    // 获取大作品信息、作者在此大作品中的职种id、在大作品下小作品集合中的职种id
    let [infoList, worksListProfessionIdList, collectionListProfessionIdList] = await Promise.all([
      service.works.infoList(worksIdList),
      this.worksListProfessionIdList(worksIdList, id),
      this.collectionListProfessionIdList(worksIdList, id)
    ]);
    // 汇集所有大作品类型
    let worksTypeList = [];
    let hash = {};
    infoList.forEach(function(item) {
      if(!hash[item.type]) {
        hash[item.type] = true;
        worksTypeList.push(item.type);
      }
    });
    // 汇集全部职种id，大作品
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
    // 小作品集合列表
    collectionListProfessionIdList.forEach(function(item) {
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
    let [typeListProfessionSort, professionInfoList] = await Promise.all([
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
    let professionInfoHash = {};
    professionInfoList.forEach(function(item) {
      if(item) {
        professionInfoHash[item.id] = item;
      }
    });
    // 遍历大作品，根据对应的排序信息将最优先展示的职种放入；如果没有排序，默认第一个
    infoList.forEach(function(item, i) {
      let type = item.type;
      let sort = typeProfessionSortHash[type];
      let professionIdList = (worksListProfessionIdList[i] || []).concat(collectionListProfessionIdList[i] || []);
      if(sort) {
        if(professionIdList.length) {
          let has = {};
          professionIdList.forEach(function(item) {
            has[item] = true;
          });
          for(let j = 0, len = sort.length; j < len; j++) {
            let professionId = sort[j].professionId;
            if(has[professionId]) {
              item.profession = professionInfoHash[professionId];
              break;
            }
          }
        }
      }
      else if(professionIdList.length) {
        item.profession = professionInfoHash[professionIdList[0]];
      }
    });
    return infoList;
  }

  /**
   * 获取大作品id列表中，作者id参与的职种id列表
   * @param idList<int> 大作品id列表
   * @param id 作者id
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
          return app.redis.get('authorWorksProfessionList_' + id + '_' + worksId);
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
        app.redis.expire('authorWorksProfessionList_' + id + '_' + worksId, CACHE_TIME);
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
      let sql = `SELECT
        works_id AS worksId,
        profession_id AS professionId
        FROM works_author_profession_relation
        WHERE works_id IN (${noCacheIdList.join(', ')})
        AND author_id=${id}`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          hash[item.worksId] = hash[item.worksId] || [];
          hash[item.worksId].push(item.professionId);
        });
        noCacheIndexList.forEach(function(i) {
          let worksId = idList[i];
          let temp = hash[worksId];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('authorWorksProfessionList_' + id + '_' + worksId, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('authorWorksProfessionList_' + id + '_' + worksId, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 获取大作品id列表中，每个大作品下小作品集合中作者id参与的职种id列表
   * @param idList<int> 大作品id列表
   * @param id 作者id
   * @returns Array<Array<int>> 对应idList索引序，每项为此大作品下小作品集合中作者id参与的职种id列表
   */
  async collectionListProfessionIdList(idList, id) {
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
          return app.redis.get('authorWorksCollectionListProfessionList_' + id + '_' + worksId);
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
        app.redis.expire('authorWorksCollectionListProfessionList_' + id + '_' + worksId, CACHE_TIME);
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
      let sql = `SELECT
        works_work_relation.works_id AS worksId,
        works_work_relation.work_id AS workId,
        work_author_profession_relation.profession_id AS professionId
        FROM works_work_relation, work_author_profession_relation
        WHERE works_work_relation.works_id IN (${noCacheIdList.join(', ')})
        AND works_work_relation.work_id=work_author_profession_relation.work_id
        AND work_author_profession_relation.author_id=${id}`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          hash[item.worksId] = hash[item.worksId] || [];
          hash[item.worksId].push(item.professionId);
        });
        noCacheIndexList.forEach(function(i) {
          let worksId = idList[i];
          let temp = hash[worksId];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('authorWorksCollectionListProfessionList_' + id + '_' + worksId, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('authorWorksCollectionListProfessionList_' + id + '_' + worksId, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }
}

module.exports = Service;
