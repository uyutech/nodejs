/**
 * Created by army8735 on 2018/3/19.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

const CACHE_TIME = 10;

const WORKS_STATE_NAME = {
  0: '已完成',
  1: '未完成', // 公开
  2: '未完成', // 保密
};

class Service extends egg.Service {
  /**
   * 根据作品id获取作品信息
   * @param id:int 作品id
   * @returns Object
   */
  async info(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'worksInfo_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = squel.select()
      .from('works')
      .from('works_type')
      .field('works.id')
      .field('works.title')
      .field('works.sub_title', 'subTitle')
      .field('works.state')
      .field('works.cover')
      .field('works.type')
      .field('works_type.name', 'typeName')
      .where('works.id=?', id)
      .where('works.is_authorize=true')
      .where('works.type=works_type.id')
      .toString();
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(res.length) {
      res = res[0];
      res.worksStateName = WORKS_STATE_NAME[res.worksState];
    }
    else {
      res = null;
    }
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 根据作品id列表获取作品信息列表
   * @param idList:Array<int> 作品id列表
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
        if(id !== null && id !== undefined) {
          return app.redis.get('worksInfo_' + id);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('worksInfo_' + id, CACHE_TIME);
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
      let sql = squel.select()
        .from('works')
        .from('works_type')
        .field('works.id')
        .field('works.title')
        .field('works.sub_title', 'subTitle')
        .field('works.state')
        .field('works.cover')
        .field('works.type')
        .field('works_type.name', 'typeName')
        .where('works.id IN ?', noCacheIdList)
        .where('works.is_authorize=true')
        .where('works.type=works_type.id')
        .toString();
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach((item) => {
          let id = item.id;
          hash[id] = item;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let temp = hash[id];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('worksInfo_' + id, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('worksInfo_' + id, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 根据作品id获取作品热度
   * @param id:int 作品id
   * @returns int
   */
  async popular(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'worksPopular_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = `SELECT
      works.num
      FROM works_num
      WHERE works_num.works_id=${id}
      AND type=0;`;
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(res.length) {
      res = res[0].num;
    }
    else {
      res = 0;
    }
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 根据作品id列表获取作品热度列表
   * @param idList:Array<int> 作品id列表
   * @returns Array<int>
   */
  async popularList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        if(id !== null && id !== undefined) {
          return app.redis.get('worksPopular_' + id);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('worksPopular_' + id, CACHE_TIME);
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
        works.works_id AS worksId
        works.num
        FROM works_num
        WHERE works_num.works_id IN (${noCacheIdList.join(', ')})
        AND type=0;`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach((item) => {
          let id = item.worksId;
          hash[id] = item.num;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let temp = hash[id];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('worksPopular_' + id, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('worksPopular_' + id, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 根据大作品id获取小作品集合信息
   * @param id:int 大作品id
   * @returns Array<Object>
   */
  async collection(id, uid) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'worksCollection_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      res = JSON.parse(res);
    }
    else {
      res = await app.model.worksWorkRelation.findAll({
        attributes: [
          ['work_id', 'workId'],
          'kind',
          'tag',
        ],
        where: {
          works_id: id,
        },
        order: [
          ['weight', 'DESC'],
          'kind'
        ],
        raw: true,
      });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    let videoIdList = [];
    let audioIdList = [];
    let imageIdList = [];
    let textIdList = [];
    let workIdList = [];
    res.forEach((item) => {
      switch(item.kind) {
        case 1:
          videoIdList.push(item.workId);
          break;
        case 2:
          audioIdList.push(item.workId);
          break;
        case 3:
          imageIdList.push(item.workId);
          break;
        case 4:
          textIdList.push(item.workId);
          break;
      }
      workIdList.push(item.workId);
    });
    let [
      videoList,
      audioList,
      imageList,
      textList,
      userLikeList,
      userFavorList,
      likeCountList,
      favorCountList
    ] = await Promise.all([
      service.work.videoList(videoIdList),
      service.work.audioList(audioIdList),
      service.work.imageList(imageIdList),
      service.work.textList(textIdList),
      service.work.userLikeList(uid, workIdList),
      service.work.userFavorList(uid, workIdList),
      service.work.likeCount(workIdList),
      service.work.favorCount(workIdList)
    ]);
    let videoHash = {};
    let audioHash = {};
    let imageHash = {};
    let textHash = {};
    videoList.forEach((item) => {
      if(item) {
        videoHash[item.id] = item;
      }
    });
    audioList.forEach((item) => {
      if(item) {
        audioHash[item.id] = item;
      }
    });
    imageList.forEach((item) => {
      if(item) {
        imageHash[item.id] = item;
      }
    });
    textList.forEach((item) => {
      if(item) {
        textHash[item.id] = item;
      }
    });
    let userLikeHash = {};
    let userFavorHash = {};
    userLikeList.forEach(function(item, i) {
      if(item) {
        let id = workIdList[i];
        userLikeHash[id] = item;
      }
    });
    userFavorList.forEach(function(item, i) {
      if(item) {
        let id = workIdList[i];
        userFavorHash[id] = item;
      }
    });
    let likeCountHash = {};
    let favorCountHash = {};
    likeCountList.forEach(function(item, i) {
      if(item !== null && item !== undefined) {
        let id = workIdList[i];
        likeCountHash[id] = item;
      }
    });
    favorCountList.forEach(function(item, i) {
      if(item !== null && item !== undefined) {
        let id = workIdList[i];
        favorCountHash[id] = item;
      }
    })
    return res.map((item) => {
      let temp = {
        id: item.workId,
        kind: item.kind,
      };
      if(item.tag) {
        temp.tag = item.tag;
      }
      temp.isLike = userLikeHash[temp.id];
      temp.isFavor = userFavorHash[temp.id];
      temp.likeCount = likeCountHash[temp.id];
      temp.favorCount = favorCountHash[temp.id];
      switch(temp.kind) {
        case 1:
          if(videoHash[temp.id]) {
            Object.assign(temp, videoHash[temp.id]);
          }
          break;
        case 2:
          if(audioHash[temp.id]) {
            Object.assign(temp, audioHash[temp.id]);
          }
          break;
        case 3:
          if(imageHash[temp.id]) {
            Object.assign(temp, imageHash[temp.id]);
          }
          break;
        case 4:
          if(textHash[temp.id]) {
            Object.assign(temp, textHash[temp.id]);
          }
          break;
      }
      return temp;
    });
  }

  /**
   * 获取评论全部信息
   * @param id:int 作品id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ data:Array<Object>, count:int }
   */
  async comment(id, offset, limit) {
    let [data, count] = await Promise.all([
      this.commentData(id, offset, limit),
      this.commentCount(id)
    ]);
    return { data, count };
  }

  /**
   * 获取评论数据
   * @param id:int 作品id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
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
      .from('works_comment_relation')
      .from('comment')
      .field('comment.id')
      .field('comment.user_id', 'uid')
      .field('comment.author_id', 'aid')
      .field('comment.content')
      .field('comment.parent_id', 'pid')
      .field('comment.root_id', 'rid')
      .field('comment.create_time', 'createTime')
      .where('works_comment_relation.works_id=?', id)
      .where('works_comment_relation.comment_id=comment.root_id')
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
   * 获取评论size
   * @param id:int 作品id
   * @returns int
   */
  async commentCount(id) {
    const { app } = this;
    let cacheKey = 'worksCommentCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = squel.select()
      .from('works_comment_relation')
      .from('comment')
      .field('COUNT(*)', 'num')
      .where('works_comment_relation.works_id=?', id)
      .where('works_comment_relation.comment_id=comment.root_id')
      .where('comment.is_delete=false')
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
   * 获取作品作者列表
   * @param id:int 作品id
   * @returns Array<Object>
   */
  async author(id) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'worksAuthors_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
      app.redis.expire(cacheKey, CACHE_TIME);
    }
    else {
      let sql = squel.select()
        .from('works_author_profession_relation')
        .from('profession')
        .field('works_author_profession_relation.works_id', 'worksId')
        .field('works_author_profession_relation.work_id', 'workId')
        .field('works_author_profession_relation.author_id', 'authorId')
        .field('works_author_profession_relation.profession_id', 'professionId')
        .field('profession.name', 'professionName')
        .where('works_author_profession_relation.works_id=?', id)
        .where('works_author_profession_relation.is_delete=false')
        .where('works_author_profession_relation.profession_id=profession.id')
        .toString();
      res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    let authorIdList = [];
    let authorIdHash = {};
    res.forEach((item) => {
      let authorId = item.authorId;
      if(!authorIdHash[authorId]) {
        authorIdHash[authorId] = true;
        authorIdList.push(authorId);
      }
    });
    if(authorIdList.length) {
      let list = await service.author.infoList(authorIdList);
      let hash = {};
      list.forEach((item) => {
        hash[item.id] = item;
      });
      res.forEach((item) => {
        let authorInfo = hash[item.authorId];
        if(authorInfo) {
          item.headUrl = authorInfo.headUrl;
          item.name = authorInfo.name;
          item.isSettle = authorInfo.isSettle;
        }
      });
    }
    return res;
  }

  /**
   * 获取作品id列表的作者列表
   * @param idList:Array<int> 作品id列表
   * @returns Array:<Array<Object>>
   */
  async authorList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app, service } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        return app.redis.get('worksAuthors_' + id);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('worksAuthors_' + id, CACHE_TIME);
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
      let sql = squel.select()
        .from('works_author_profession_relation')
        .from('profession')
        .field('works_author_profession_relation.works_id', 'worksId')
        .field('works_author_profession_relation.work_id', 'workId')
        .field('works_author_profession_relation.author_id', 'authorId')
        .field('works_author_profession_relation.profession_id', 'professionId')
        .field('profession.name', 'professionName')
        .where('works_author_profession_relation.works_id IN ?', noCacheIdList)
        .where('works_author_profession_relation.is_delete=false')
        .where('works_author_profession_relation.profession_id=profession.id')
        .toString();
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach((item) => {
          let worksId = item.worksId;
          let temp = hash[worksId] = hash[worksId] || [];
          temp.push(item);
        });
        noCacheIdList.forEach(function(id, i) {
          let item = hash[id];
          if(item) {
            cache[i] = item;
            app.redis.setex('worksAuthors_' + id, CACHE_TIME, JSON.stringify(item));
          }
        });
      }
    }
    let authorIdList = [];
    let authorIdHash = {};
    cache.forEach(function(list) {
      if(list && list.length) {
        list.forEach((item) => {
          if(!authorIdHash[item.authorId]) {
            authorIdHash[item.authorId] = true;
            authorIdList.push(item.authorId);
          }
        });
      }
    });
    if(authorIdList.length) {
      let list = await service.author.infoList(authorIdList);
      let hash = {};
      list.forEach((item) => {
        hash[item.id] = item;
      });
      cache.forEach(function(list) {
        if(list && list.length) {
          list.forEach((item) => {
            let authorInfo = hash[item.authorId];
            if(authorInfo) {
              item.headUrl = authorInfo.headUrl;
              item.name = authorInfo.name;
              item.isSettle = authorInfo.isSettle;
            }
          });
        }
      });
    }
    return cache;
  }

  /**
   * 根据作品类型获取职种排序规则
   * @param type:int 作品类型
   * @returns Array<Object>
   */
  async typeProfessionSort(type) {
    if(!type) {
      return;
    }
    const { app } = this;
    let cacheKey = 'typeProfessionSort_' + type;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.worksTypeProfessionSort.findAll({
      attributes: [
        ['works_type', 'worksType'],
        'group',
        'weight'
      ],
      where: {
        works_type: type,
      },
      order: [
        'group',
        ['weight', 'DESC']
      ],
      raw: true,
    });
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 根据作品类型列表获取职种排序规则列表
   * @param typeList:int 作品类型列表
   * @returns Array<Array<Object>>
   */
  async typeListProfessionSort(typeList) {
    if(!typeList) {
      return;
    }
    if(!typeList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      typeList.map(function(type) {
        return app.redis.get('typeProfessionSort_' + type);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let type = typeList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('typeProfessionSort_' + type, CACHE_TIME);
      }
      else if(type !== null && type !== undefined) {
        if(!noCacheIdHash[type]) {
          noCacheIdHash[type] = true;
          noCacheIdList.push(type);
        }
        noCacheIndexList.push(i);
      }
    });
    if(noCacheIdList.length) {
      let res = await app.model.worksTypeProfessionSort.findAll({
        attributes: [
          ['works_type', 'worksType'],
          'group',
          'weight',
          ['profession_id', 'professionId']
        ],
        where: {
          works_type: noCacheIdList,
        },
        raw: true,
      });
      if(res.length) {
        let hash = {};
        res.forEach((item) => {
          hash[item.worksType] = hash[item.worksType] || [];
          hash[item.worksType].push(item);
        });
        noCacheIndexList.forEach(function(i) {
          let worksType = typeList[i];
          let temp = hash[worksType];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('typeProfessionSort_' + worksType, CACHE_TIME, JSON.stringify(res));
          }
          else {
            app.redis.setex('typeProfessionSort_' + worksType, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 根据作品id获取作品信息以及职种排序规则
   * @param id:int 作品id
   * @returns Object{ info:Object, professionSort:Array<Object> }
   */
  async infoAndTypeProfessionSort(id) {
    if(!id) {
      return;
    }
    let info = await this.info(id);
    let professionSort = await this.typeProfessionSort(info.type);
    return [info, professionSort];
  }

  /**
   * 根据规则排序作者显示
   * @param list:Array<Object> 作者列表
   * @param rule:Array 规则列表
   * @returns Array<Array<Object>>
   */
  reorderAuthor(list, rule) {
    rule = rule || [];
    let res = [];
    // 先去重
    let exist = {};
    for(let i = list.length - 1; i >= 0; i--) {
      let item = list[i];
      let key = item.authorId + '_' + item.professionId;
      if(exist[key]) {
        list.splice(i, 1);
      }
      exist[key] = true;
    }
    // 相同职业合并，并存成hash
    let hash = {};
    list.forEach((item) => {
      hash[item.professionId] = hash[item.professionId] || [];
      hash[item.professionId].push(item);
    });
    // 遍历规则，如遇到则将对应职业的作者们存入
    let lastGroup = -1;
    let last;
    rule.forEach((item) => {
      let authors = hash[item.professionId];
      if(authors) {
        if(lastGroup !== item.group) {
          lastGroup = item.group;
          last = [];
          res.push(last);
        }
        let first = authors[0];
        last.push({
          id: first.professionId,
          name: first.professionName,
          list: authors.map(function(author) {
            return {
              id: author.authorId,
              name: author.name,
              headUrl: author.headUrl,
            };
          }),
        });
        delete hash[item.professionId];
      }
    });
    // 没有对应规则的剩余的存入末尾
    let temp = [];
    Object.keys(hash).forEach(function(key) {
      let authors = hash[key];
      let first = authors[0];
      temp.push({
        id: first.professionId,
        name: first.professionName,
        kind: first.kind,
        kindName: first.kindName,
        list: authors.map(function(author) {
          return {
            id: author.authorId,
            name: author.name,
            headUrl: author.headUrl,
          };
        }),
      });
    });
    res.push(temp);
    return res;
  }

  /**
   * 获取大作品数据，包括主要作者信息
   * @param worksIdList:Array<int> 大作品id列表
   * @returns Array<Object>
   */
  async infoListPlus(worksIdList) {
    if(!worksIdList) {
      return;
    }
    if(!worksIdList.length) {
      return [];
    }
    let [worksList, authorList] = await Promise.all([
      this.infoList(worksIdList),
      this.authorList(worksIdList)
    ]);
    return await this.infoListPlusByAuthor(worksList, authorList);
  }

  /**
   * 包装大作品数据，补上主要作者信息
   * @param worksList:Array<Object> 大作品基本信息
   * @returns Array<Object>
   */
  async infoListPlusByData(worksList) {
    if(!worksList) {
      return;
    }
    if(!worksList.length) {
      return [];
    }
    let authorIdList = worksList.map(function(item) {
      return item.id;
    });
    let authorList = await this.authorList(authorIdList);
    return await this.infoListPlusByAuthor(worksList, authorList);
  }

  /**
   * 包装大作品数据，补上主要作者信息
   * @param worksList:Array<Object> 大作品基本信息
   * @param authorList:Array<Object> 作者基本信息
   * @returns Array<Object>
   */
  async infoListPlusByAuthor(worksList, authorList) {
    if(!worksList) {
      return;
    }
    if(!worksList.length) {
      return [];
    }
    if(!authorList.length) {
      return worksList;
    }
    const { ctx } = this;
    let worksHash = {};
    let authorHash = {};
    let typeList = [];
    let typeHash = {};
    worksList.forEach((item) => {
      if(item) {
        let id = item.id;
        if(!worksHash[id]) {
          worksHash[id] = item;
        }
        if(!typeHash[id]) {
          typeHash[id] = true;
          typeList.push(item.type);
        }
      }
    });
    authorList.forEach((item) => {
      if(item && item.length) {
        if(!authorHash[item[0].worksId]) {
          authorHash[item[0].worksId] = item;
        }
      }
    });
    let professionSortHash = {};
    if(typeList) {
      let professionSortList = await this.typeListProfessionSort(typeList);
      professionSortList.forEach((item) => {
        if(item && item.length) {
          if(!professionSortHash[item[0].worksType]) {
            professionSortHash[item[0].worksType] = item;
          }
        }
      });
    }
    worksList.forEach((item) => {
      if(item) {
        let id = item.id;
        let author = authorHash[id];
        if(author) {
          if(item.type) {
            let professionSort = professionSortHash[item.type];
            if(professionSort) {
              item.professionSort = professionSort;
              item.author = this.reorderAuthor(author, professionSort)[0];
            }
            else {
              item.author = this.reorderAuthor(author)[0];
            }
          }
          else {
            item.author = this.reorderAuthor(author)[0];
            ctx.logger.error('miss type worksId:%s', id);
          }
        }
        else {
          ctx.logger.error('miss author worksId:%s', id);
        }
      }
    });
    return worksList;
  }
}

module.exports = Service;
