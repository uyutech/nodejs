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
    if(skip < 0 || take < 1) {
      return;
    }
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
    if(skip === 0) {
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
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
    // 根据id获取信息
    let res = await this.worksListByWorksIdList(id, worksIdList);
    return res;
  }

  /**
   * 获取作者参与大作品id列表
   * @param id:int 作者id
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Array<int> 大作品id列表
   */
  async worksIdList(id, skip, take) {
    if(!id) {
      return;
    }
    skip = parseInt(skip) || 0;
    take = parseInt(take) || 1;
    if(skip < 0 || take < 1) {
      return;
    }
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
      DISTINCT works_work_relation.works_id AS worksId
      FROM work_author_profession_relation, work, works_work_relation
      WHERE work_author_profession_relation.author_id=${id}
      AND work_author_profession_relation.work_id=work.id
      AND work.id=works_work_relation.work_id
      LIMIT ${skip},${take};`;
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    res = res.map(function(item) {
      return item.worksId;
    });
    if(skip === 0) {
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
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
    // 先取得作者所有参与大作品列表id
    let worksIdList = await this.worksIdList(id, skip, take);
    let res = await this.worksListByWorksIdList(id, worksIdList);
    return res;
  }

  /**
   * 根据作者id和大作品id列表获取大作品信息及作者在此大作品中的优先显示职种
   * @param id:int 作者id
   * @param worksIdList:Array<int> 大作品id列表
   * @returns Array<Object>
   */
  async worksListByWorksIdList(id, worksIdList) {
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
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Array<int> 专辑信息id列表
   */
  async musicAlbumIdList(id, skip, take) {
    if(!id) {
      return;
    }
    skip = parseInt(skip) || 0;
    take = parseInt(take) || 1;
    if(skip < 0 || take < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorMusicAlbumIdList_' + id + '_' + skip + '_' + take;
    let res;
    if(skip === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        app.redis.expire(cacheKey, CACHE_TIME);
        return JSON.parse(res);
      }
    }
    let sql = `SELECT
      DISTINCT id, album_id AS musicAlbumId
      FROM music_album_author_profession_relation
      WHERE author_id=${id}
      AND is_deleted=false
      ORDER BY id
      LIMIT ${skip},${take};`;
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    res = res.map(function(item) {
      return item.musicAlbumId;
    });
    if(skip === 0) {
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    return res;
  }

  /**
   * 获取作者的专辑信息列表
   * @param id:int 作者id
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Array<Object> 专辑信息列表
   */
  async musicAlbumList(id, skip, take) {
    if(!id) {
      return;
    }
    const { service } = this;
    // 先取得作者所有参与专辑列表id
    let musicAlbumIdList = await this.musicAlbumIdList(id, skip, take);
    let res = await service.musicAlbum.infoList(musicAlbumIdList);
    return res;
  }

  /**
   * 获取作者参与小作品的种类列表
   * @param id:int 作者id
   * @returns Array<int>
   */
  async workClassList(id) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'authorWorkClassList_' + id;
    let classList = await app.redis.get(cacheKey);
    if(classList) {
      app.redis.expire(cacheKey, CACHE_TIME);
      classList = JSON.parse(classList);
    }
    else {
      let sql = `SELECT
        DISTINCT work.class
        FROM works_author_profession_relation, work
        WHERE works_author_profession_relation.author_id=${id}
        AND works_author_profession_relation.work_id=work.id
        ORDER BY class`;
      classList = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      classList = classList.map(function(item) {
        return item.class;
      });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(classList));
    }
    // 取得class列表下对应的职种id列表
    let professionIdList = await this.workClassListProfessionIdList(id, classList);
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
    // 遍历class列表，转换为附带名字的class，同时将profession加上
    let res = service.work.classList2InfoList(classList);
    res.forEach(function(classInfo, i) {
      let professionList = [];
      professionIdList[i].forEach(function(item) {
        if(professionHash[item]) {
          professionList.push(professionHash[item]);
        }
      });
      classInfo.professionList = professionList;
    });
    return res;
  }

  /**
   * 获取作者小作品种类的职种信息
   * @param id
   * @param classList
   * @returns {Promise<void>}
   */
  async workClassListProfessionIdList(id, classList) {
    if(!id || !classList) {
      return;
    }
    if(!classList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      classList.map(function(klass) {
        return app.redis.get('authorWorkClassListProfessionIdList_' + id + '_' + klass);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let klass = classList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('authorWorkClassListProfessionIdList_' + id + '_' + klass, CACHE_TIME);
      }
      else if(klass !== null && klass !== undefined) {
        if(!noCacheIdHash[klass]) {
          noCacheIdHash[klass] = true;
          noCacheIdList.push(klass);
        }
        noCacheIndexList.push(i);
      }
    });
    if(noCacheIdList.length) {
      let sql = `SELECT
        DISTINCT works_author_profession_relation.profession_id AS professionId,
        work.class
        FROM works_author_profession_relation, work
        WHERE works_author_profession_relation.author_id=${id}
        AND works_author_profession_relation.work_id=work.id
        AND work.class IN (${noCacheIdList.join(', ')})
        ORDER BY work.class`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          hash[item.class] = hash[item.class] || [];
          hash[item.class].push(item.professionId);
        });
        noCacheIndexList.forEach(function(i) {
          let klass = classList[i];
          let temp = hash[klass];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('authorWorkClassListProfessionIdList_' + id + '_' + klass, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('authorWorkClassListProfessionIdList_' + id + '_' + klass, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }


  /**
   * 获取作者参与小作品种类的小大作品id列表
   * @param id:int 作者id
   * @param klass:int 种类
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Array<Object>
   */
  async classWorkIdList(id, klass, skip, take) {
    if(!id || klass === null || klass === undefined) {
      return;
    }
    skip = parseInt(skip) || 0;
    take = parseInt(take) || 1;
    if(skip < 0 || take < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'authorClassWorkIdList_' + id + '_' + klass + '_' + skip + '_' + take;
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
      FROM works_author_profession_relation, work, works
      WHERE works_author_profession_relation.author_id=${id}
      AND works_author_profession_relation.work_id=work.id
      AND work.class=${klass}
      AND works_author_profession_relation.works_id=works.id
      AND works.state<2
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
   * 获取作者参与小作品种类的小大作品基本xinxi 列表
   * @param id:int 作者id
   * @param idList:Array<int> 小作品id列表
   * @returns Array<Object>
   */
  async classWorkBaseList(id, idList) {
    if(!id || !idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(workId) {
        return app.redis.get('authorClassWorkBaseList_' + workId);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let workId = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('authorClassWorkBaseList_' + workId, CACHE_TIME);
      }
      else if(workId !== null && workId !== undefined) {
        if(!noCacheIdHash[workId]) {
          noCacheIdHash[workId] = true;
          noCacheIdList.push(workId);
        }
        noCacheIndexList.push(i);
      }
    });console.log(cache);
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
          hash[item.workId] = item;
        });
        noCacheIndexList.forEach(function(i) {
          let workId = idList[i];
          let temp = hash[workId];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('authorClassWorkBaseList_' + workId, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('authorClassWorkBaseList_' + workId, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 获取作者参与小作品种类的大作品列表
   * @param id:int 作者id
   * @param klass:int 种类
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Array<Object>
   */
  async classWorkData(id, klass, skip, take) {
    if(!id || klass === null || klass === undefined) {
      return;
    }
    const { service } = this;
    let idList = await this.classWorkIdList(id, klass, skip, take);
    let list = await this.classWorkBaseList(id, idList);
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
      let professionId = item.professionId;
      if(!professionIdHash[professionId]) {
        professionIdHash[professionId] = true;
        professionIdList.push(professionId);
      }
    });
    let [worksInfoList, professionInfoList, workInfoList] = await Promise.all([
      service.works.infoList(worksIdList),
      service.profession.infoList(professionIdList),
      service.work.infoList(workIdList)
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
    let res = list.map(function(item) {
      let temp = {
        id: item.worksId,
        workId: item.workId,
      };
      if(worksInfoHash[temp.id]) {
        Object.assign(temp, worksInfoHash[temp.id]);
      }
      if(workInfoHash[item.workId]) {
        temp.workTitle = workInfoHash[item.workId].title;
      }
      if(professionInfoHash[item.professionId]) {
        temp.profession = professionInfoHash[item.professionId];
      }
      return temp;
    });
    return res;
  }

  /**
   * 获取作者参与小作品种类的大作品列表和分页数据
   * @param id:int 作者id
   * @param klass:int 种类
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns { data: Array<Object>, size: int }
   */
  async classWork(id, klass, skip, take) {
    if(!id) {
      return;
    }
    let [data, size] = await Promise.all([
      this.classWorkData(id, klass, skip, take),
      this.classWorkSize(id, klass)
    ]);
    return { data, size };
  }

  /**
   * 获取作者参与小作品种类的大作品列表size
   * @param id:int 作者id
   * @param klass:int 种类
   * @returns int
   */
  async classWorkSize(id, klass) {
    if(!id || klass === null || klass === undefined) {
      return;
    }
    const { app } = this;
    let cacheKey = 'classWorkSize_' + id + '_' + klass;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = `SELECT
      COUNT(DISTINCT works_author_profession_relation.work_id) as num
      FROM works_author_profession_relation, work, works
      WHERE works_author_profession_relation.author_id=${id}
      AND works_author_profession_relation.work_id=work.id
      AND work.class=${klass}
      AND works_author_profession_relation.works_id=works.id
      AND works.state<2;`;
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
