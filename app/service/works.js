/**
 * Created by army8735 on 2018/3/19.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
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
    let sql = `SELECT
      works.id,
      works.title,
      works.sub_title AS subTitle,
      works.state,
      works.cover,
      works.type,
      works_type.name AS typeName
      FROM works, works_type
      WHERE works.id=${id}
      AND works.is_authorize=true
      AND works.type=works_type.id;`;
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
      let sql = `SELECT
        works.id,
        works.title,
        works.sub_title AS subTitle,
        works.state,
        works.cover,
        works.type,
        works_type.name AS typeName
        FROM works, works_type
        WHERE works.id IN (${noCacheIdList.join(', ')})
        AND works.is_authorize=true
        AND works.type=works_type.id;`;
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
          'work_id',
          'kind',
          'tag'
        ],
        where: {
          works_id: id,
          is_deleted: false,
        },
        order: [
          ['weight', 'DESC'],
          'kind'
        ],
      });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    let videoIdList = [];
    let audioIdList = [];
    let imageIdList = [];
    let textIdList = [];
    res.forEach(function(item) {
      switch(item.kind) {
        case 1:
          videoIdList.push(item.work_id);
          break;
        case 2:
          audioIdList.push(item.work_id);
          break;
        case 3:
          imageIdList.push(item.work_id);
          break;
        case 4:
          textIdList.push(item.work_id);
          break;
      }
    });
    let [
      videoList,
      audioList,
      imageList,
      textList,
      userVideoRelationList,
      userAudioRelationList,
      userImageRelationList
    ] = await Promise.all([
      service.work.videoList(videoIdList),
      service.work.audioList(audioIdList),
      service.work.imageList(imageIdList),
      service.work.textList(textIdList),
      service.work.userVideoRelationList(uid, videoIdList),
      service.work.userAudioRelationList(uid, videoIdList),
      service.work.userImageRelationList(uid, videoIdList)
    ]);console.log(userVideoRelationList, userAudioRelationList, userImageRelationList);
    let videoHash = {};
    let audioHash = {};
    let imageHash = {};
    let textHash = {};
    videoList.forEach(function(item) {
      if(item) {
        videoHash[item.id] = item;
      }
    });
    audioList.forEach(function(item) {
      if(item) {
        audioHash[item.id] = item;
      }
    });
    imageList.forEach(function(item) {
      if(item) {
        imageHash[item.id] = item;
      }
    });
    textList.forEach(function(item) {
      if(item) {
        textHash[item.id] = item;
      }
    });
    let userVideoRelationHash = {};
    let userAudioRelationHash = {};
    let userImageRelationHash = {};
    userVideoRelationList.forEach(function(item, i) {
      if(item) {
        let id = videoIdList[i];
        userVideoRelationHash[id] = item;
      }
    });
    userAudioRelationList.forEach(function(item, i) {
      if(item) {
        let id = audioIdList[i];
        userAudioRelationHash[id] = item;
      }
    });
    userImageRelationList.forEach(function(item, i) {
      if(item) {
        let id = imageIdList[i];
        userImageRelationHash[id] = item;
      }
    });
    return res.map(function(item) {
      let temp = {
        id: item.work_id,
        kind: item.kind,
      };
      if(item.tag) {
        temp.tag = item.tag;
      }
      switch(temp.kind) {
        case 1:
          if(videoHash[temp.id]) {
            Object.assign(temp, videoHash[temp.id]);
            let userVideoRelation = userVideoRelationHash[temp.id];
            if(userVideoRelation) {
              if(userVideoRelation[0]) {
                temp.isLiked = userVideoRelation[0];
              }
              if(userVideoRelation[1]) {
                temp.isFavored = userVideoRelation[1];
              }
            }
          }
          break;
        case 2:
          if(audioHash[temp.id]) {
            Object.assign(temp, audioHash[temp.id]);
            let userAudioRelation = userAudioRelationHash[temp.id];
            if(userAudioRelation) {
              if(userAudioRelation[0]) {
                temp.isLiked = userAudioRelation[0];
              }
              if(userAudioRelation[1]) {
                temp.isFavored = userAudioRelation[1];
              }
            }
          }
          break;
        case 3:
          if(imageHash[temp.id]) {
            Object.assign(temp, imageHash[temp.id]);
            let userImageRelation = userImageRelationHash[temp.id];
            if(userImageRelation) {
              if(userImageRelation[0]) {
                temp.isLiked = userImageRelation[0];
              }
              if(userImageRelation[1]) {
                temp.isFavored = userImageRelation[1];
              }
            }
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
   * @param skip:int
   * @param take:int
   * @returns Object<{ data:Array<Object>, size }>
   */
  async comment(id, skip, take) {
    let [data, size] = await Promise.all([
      this.commentData(id, skip, take),
      this.commentSize(id)
    ]);
    return { data, size };
  }

  /**
   * 获取评论数据
   * @param id:int 作品id
   * @param skip
   * @param take
   * @returns Array<Object>
   */
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
      FROM comment, works_comment_relation
      WHERE works_comment_relation.works_id=${id}
      AND works_comment_relation.comment_id=comment.root_id
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
   * 获取评论size
   * @param id:int 作品id
   * @returns int
   */
  async commentSize(id) {
    const { app } = this;
    let cacheKey = 'worksCommentSize_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = `SELECT
      num
      FROM works_comment_relation, comment_num
      WHERE works_comment_relation.works_id=${id}
      AND works_comment_relation.comment_id=comment_num.comment_id
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
  async authorList(id) {
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
      let sql = `SELECT
        works_author_profession_relation.works_id AS worksId,
        works_author_profession_relation.work_id AS workId,
        works_author_profession_relation.author_id AS authorId,
        works_author_profession_relation.profession_id AS professionId,
        profession.name AS professionName
        FROM works_author_profession_relation, profession
        WHERE works_author_profession_relation.works_id=${id}
        AND works_author_profession_relation.is_deleted=false
        AND works_author_profession_relation.profession_id=profession.id;`;
      res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    let authorIdList = [];
    let hash = {};
    res.forEach(function(item) {
      let authorId = item.authorId;
      if(!hash[authorId]) {
        hash[authorId] = true;
        authorIdList.push(authorId);
      }
    });
    if(authorIdList.length) {
      let list = await service.author.infoList(authorIdList);
      let hash = {};
      list.forEach(function(item) {
        hash[item.id] = item;
      });
      res.forEach(function(item) {
        let authorInfo = hash[item.authorId];
        if(authorInfo) {
          item.headUrl = authorInfo.headUrl;
          item.name = authorInfo.name;
          item.isSettled = authorInfo.isSettled;
        }
      });
    }
    return res;
  }
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
    let sql = `SELECT
      works_type AS worksType,
      \`group\`,
      weight,
      profession_id AS professionId
      FROM works_type_profession_sort
      WHERE works_type=${type}
      ORDER BY \`group\`, weight DESC`;
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }
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
      let sql = `SELECT
        works_type AS worksType,
        \`group\`,
        weight,
        profession_id AS professionId
        FROM works_type_profession_sort
        WHERE works_type IN (${noCacheIdList.join(', ')})
        ORDER BY \`group\`, weight DESC`;
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
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
  async infoAndTypeProfessionSort(id) {
    if(!id) {
      return;
    }
    let info = await this.info(id);
    let professionSort = await this.typeProfessionSort(info.type);
    return [info, professionSort];
  }
  reorderAuthor(authorList, rule) {
    rule = rule || [];
    let res = [];
    // 先去重
    let exist = {};
    for(let i = authorList.length - 1; i >= 0; i--) {
      let item = authorList[i];
      let key = item.authorId + '_' + item.professionId;
      if(exist[key]) {
        authorList.splice(i, 1);
      }
      exist[key] = true;
    }
    // 相同职业合并，并存成hash
    let hash = {};
    authorList.forEach(function(item) {
      hash[item.professionId] = hash[item.professionId] || [];
      hash[item.professionId].push(item);
    });
    // 遍历规则，如遇到则将对应职业的作者们存入
    let lastGroup = -1;
    let last;
    rule.forEach(function(item) {
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
}

module.exports = Service;
