/**
 * Created by army8735 on 2018/3/26.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const CACHE_TIME = 10;

class Service extends egg.Service {
  /**
   * 根据评论id列表获取评论详情
   * @param idList:Array<int> 评论id列表
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
    let res = await app.model.comment.findAll({
      attributes: [
        'id',
        ['user_id', 'uid'],
        ['author_id', 'aid'],
        'content',
        ['parent_id', 'pid'],
        ['root_id', 'rid'],
        ['create_time', 'createTime']
      ],
      where: {
        id: idList,
        is_delete: false,
      },
      raw: true,
    });
    return res;
  }

  /**
   * 包装评论数据，补上用户信息
   * @param data:Object 评论基本信息
   * @returns Array<Object>
   */
  async plus(data) {
    if(!data) {
      return;
    }
    const { service } = this;
    if(data.aid) {
      delete data.uid;
      data.isAuthor = true;
      let author = await service.author.info(data.aid);
      data.name = author.name;
      data.headUrl = author.headUrl;
    }
    else {
      delete data.aid;
      let user = await service.user.info(data.uid);
      data.nickname = user.nickname;
      data.headUrl = user.headUrl;
    }
    return data;
  }

  /**
   * 包装评论数据，补上用户信息、点赞信息
   * @param dataList:Array<Object> 评论基本信息
   * @param uid:int 用户id
   * @returns Array<Object>
   */
  async plusList(dataList, uid) {
    if(!dataList) {
      return;
    }
    if(!dataList.length) {
      return [];
    }
    let [{ quoteHash, authorHash, userHash }, { countList, likeList }] = await Promise.all([
      this.plusListQuoteAndPerson(dataList),
      this.plusListLike(dataList, uid)
    ]);
    dataList.forEach(function(item, i) {
      if(item) {
        if(item.isAuthor) {
          let author = authorHash[item.aid];
          if(author) {
            item.name = author.name;
            item.headUrl = author.headUrl;
          }
        }
        else {
          let user = userHash[item.uid];
          if(user) {
            item.nickname = user.nickname;
            item.headUrl = user.headUrl;
          }
        }
        if(item.rid !== item.pid && item.rid !== 0 && quoteHash[item.pid]) {
          item.quote = quoteHash[item.pid];
        }
        if(countList) {
          item.likeCount = countList[i] || 0;
        }
        if(likeList) {
          item.isLike = likeList[i];
        }
      }
    });
    return dataList;
  }

  /**
   * 获取评论引用数据和用户数据
   * @param dataList:Array<Object> 评论基本信息
   * @returns Object{ userHash, authorHash, quoteHash }
   */
  async plusListQuoteAndPerson(dataList) {
    if(!dataList || !dataList.length) {
      return {};
    }
    const { service } = this;
    let userIdList = [];
    let userIdHash = {};
    let authorIdList = [];
    let authorIdHash = {};
    let quoteIdList = [];
    let quoteIdHash = {};
    dataList.forEach(function(item) {
      if(item) {
        if(item.aid) {
          if(!authorIdHash[item.aid]) {
            authorIdHash[item.aid] = true;
            authorIdList.push(item.aid);
          }
          delete item.uid;
          item.isAuthor = true;
        }
        else if(item.uid) {
          if(!userIdHash[item.uid]) {
            userIdHash[item.uid] = true;
            userIdList.push(item.uid);
          }
          delete item.aid;
        }
        if(item.rid !== item.pid && item.rid !== 0 && !quoteIdHash[item.pid]) {
          quoteIdList.push(item.pid);
        }
      }
    });
    let quoteList = await this.infoList(quoteIdList);
    let quoteHash = {};
    quoteList.forEach(function(item) {
      if(item) {
        if(item.aid) {
          if(!authorIdHash[item.aid]) {
            authorIdHash[item.aid] = true;
            authorIdList.push(item.aid);
          }
          delete item.uid;
          item.isAuthor = true;
        }
        else {
          if(!userIdHash[item.uid]) {
            userIdHash[item.uid] = true;
            userIdList.push(item.uid);
          }
          delete item.aid;
        }
        quoteHash[item.id] = item;
        if(item.content.length > 60) {
          item.slice = true;
          item.content = item.content.slice(0, 60) + '...';
        }
      }
    });
    let [userList, authorList] = await Promise.all([
      service.user.infoList(userIdList),
      service.author.infoList(authorIdList)
    ]);
    let userHash = {};
    userList.forEach(function(item) {
      if(item) {
        userHash[item.id] = item;
      }
    });
    let authorHash = {};
    authorList.forEach(function(item) {
      if(item) {
        authorHash[item.id] = item;
      }
    });
    quoteList.forEach(function(item) {
      if(item) {
        if(item.isAuthor) {
          item.name = authorHash[item.aid].name;
          item.headUrl = authorHash[item.aid].headUrl;
        }
        else {
          item.nickname = userHash[item.uid].nickname;
          item.headUrl = userHash[item.uid].headUrl;
        }
      }
    });
    return {
      quoteHash,
      authorHash,
      userHash,
    };
  }

  /**
   * 根据评论数据获取其点赞数和是否点赞
   * @param dataList:Array<Object> 评论列表
   * @param uid:int 用户id
   * @returns Object{ countList, likeList }
   */
  async plusListLike(dataList, uid) {
    if(!dataList || !uid) {
      return {};
    }
    let idList = dataList.map(function(item) {
      if(item) {
        return item.id;
      }
    });
    let [countList, likeList] = await Promise.all([
      this.likeCountList(idList),
      this.isLikeList(idList, uid)
    ]);
    return {
      countList,
      likeList,
    };
  }

  /**
   * 获取评论点赞数列表
   * @param idList:Array<int> 评论id列表
   * @returns Array<int>
   */
  async likeCountList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        return app.redis.get('commentCount_' + id + '_1');
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('commentCount_' + id + '_1', CACHE_TIME);
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
      let res = await app.model.userCommentRelation.findAll({
        attributes: [
          ['comment_id', 'commentId'],
          [Sequelize.fn('COUNT', '*'), 'num']
        ],
        where: {
          comment_id: idList,
          type: 1,
          is_delete: false,
        },
        group: 'commentId',
        raw: true,
      });
      if(res.length) {
        let hash = {};
        res.forEach((item) => {
          let id = item.commentId;
          hash[id] = item.num;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let item = hash[id];
          let num = item || 0;
          cache[i] = num;
          app.redis.setex('commentCount_' + id + '_1', CACHE_TIME, JSON.stringify(num));
        });
      }
    }
    return cache;
  }

  /**
   * 获取评论是否点赞列表
   * @param idList:Array<int> 评论id
   * @param uid:int 用户id
   * @returns Array<boolean>
   */
  async isLikeList(idList, uid) {
    if(!idList) {
      return;
    }
    if(!idList.length || !uid) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        return app.redis.get('userCommentRelation_' + uid + '_' + id + '_1');
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('userCommentRelation_' + uid + '_' + id + '_1', CACHE_TIME);
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
      let res = await app.model.userCommentRelation.findAll({
        attributes: [
          ['comment_id', 'commentId']
        ],
        where: {
          user_id: uid,
          type: 1,
          comment_id: idList,
          is_delete: false,
        },
        raw: true,
      });
      if(res.length) {
        let hash = {};
        res.forEach((item) => {
          let id = item.commentId;
          hash[id] = true;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let item = hash[id] || false;
          cache[i] = item;
          app.redis.setex('userCommentRelation_' + uid + '_' + id + '_1', CACHE_TIME, JSON.stringify(item));
        });
      }
    }
    return cache;
  }

  /**
   * 点赞留言
   * @param id:int 留言id
   * @param uid:int 用户id
   * @param state:boolean 状态
   * @returns Object{ state:boolean, count:int }
   */
  async like(id, uid, state) {
    return await this.operate(id, uid, 1, state);
  }

  /**
   * 操作留言
   * @param id:int 留言id
   * @param uid:int 用户id
   * @param type:int 类型
   * @param state:boolean 状态
   * @returns Object{ state:boolean, count:int }
   */
  async operate(id, uid, type, state) {
    if(!uid || !id || !type) {
      return;
    }
    state = !!state;
    const { app } = this;
    // 更新内存中用户对留言关系的状态
    let cache;
    if(state) {
      cache = app.redis.setex('userCommentRelation_' + uid + '_' + id + '_' + type, CACHE_TIME, 'true');
    }
    else {
      cache = app.redis.setex('userCommentRelation_' + uid + '_' + id + '_' + type, CACHE_TIME, 'false');
    }
    // 入库
    await Promise.all([
      cache,
      app.model.userCommentRelation.upsert({
        user_id: uid,
        comment_id: id,
        type,
        is_delete: !state,
        update_time: new Date(),
      }, {
        where: {
          user_id: uid,
          type,
          comment_id: id,
        },
        raw: true,
      })
    ]);
    // 更新计数，优先内存缓存
    let cacheKey = 'commentCount_' + id + '_' + type;
    let res = await app.redis.get(cacheKey);
    let count;
    if(res) {
      count = JSON.parse(res);
      if(state) {
        count++;
      }
      else {
        count--;
      }
      count = Math.max(count, 0);
      // 可能因为2次操作之间的延迟导致key过期设置超时失败，此时放弃操作内存防止数据不一致
      let expire = await app.redis.expire(cacheKey, CACHE_TIME);
      if(expire) {
        if(state) {
          app.redis.incr(cacheKey);
        }
        else {
          app.redis.decr(cacheKey);
        }
      }
    }
    else {
      res = await app.model.userCommentRelation.findOne({
        attributes: [
          [Sequelize.fn('COUNT', '*'), 'num']
        ],
        where: {
          comment_id: id,
          type,
          is_delete: false,
        },
        raw: true,
      });
      count = res.num || 0;
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(count));
    }
    return {
      state,
      count,
    };
  }
}

module.exports = Service;
