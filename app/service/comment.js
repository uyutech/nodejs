/**
 * Created by army8735 on 2018/3/26.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const CACHE_TIME = 10;

class Service extends egg.Service {
  /**
   * 根据评论id列取评论详情
   * @param id:int 评论id
   * @returns Object
   */
  async info(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'comment_' + id;
    let res = await this.app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.comment.findOne({
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
        id,
        is_delete: false,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

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
    const { app, service } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        return app.redis.get('comment_' + id);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('comment_' + id, CACHE_TIME);
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
            app.redis.setex('comment_' + id, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('comment_' + id, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }

  /**
   * 返回评论id的媒体信息
   * @param id:int 评论id
   * @returns Array<Object>
   */
  async media(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'commentMedia_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME)
      return JSON.parse(res);
    }
    res = await app.model.commentMedia.findAll({
      attributes: [
        ['comment_id', 'commentId'],
        'kind',
        'url',
        'width',
        'height',
        'duration'
      ],
      where: {
        comment_id: id,
        is_delete: false,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 返回评论id列表的媒体信息
   * @param idList:int 评论id
   * @returns Array<Object>
   */
  async mediaList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        return app.redis.get('commentMedia_' + id);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('commentMedia_' + id, CACHE_TIME);
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
      let res = await app.model.commentMedia.findAll({
        attributes: [
          ['comment_id', 'commentId'],
          'kind',
          'url',
          'width',
          'height',
          'duration'
        ],
        where: {
          comment_id: noCacheIdList,
          is_delete: false,
        },
        raw: true,
      });
      if(res.length) {
        let hash = {};
        res.forEach((item) => {
          let id = item.commentId;
          let temp = hash[id] = hash[id] || [];
          temp.push(item);
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let item = hash[id];
          cache[i] = item;
          app.redis.setex('commentMedia_' + id, CACHE_TIME, JSON.stringify(item));
        });
      }
    }
    return cache;
  }

  /**
   * 包装评论数据，补上用户信息、点赞信息
   * @param data:Object 评论基本信息
   * @param uid:int 用户id
   * @returns Object
   */
  async plus(data, uid) {
    if(!data) {
      return;
    }
    let [
      { quote, authorHash, userHash },
      [ likeCount, isLike ]
    ] = await Promise.all([
      this.quoteAndPerson(data),
      this.operateRelation(data.id, uid, 1)
    ]);
    if(data.isAuthor) {
      let author = authorHash[data.aid];
      if(author) {
        data.name = author.name;
        data.headUrl = author.headUrl;
      }
    }
    else {
      let user = userHash[data.uid];
      if(user) {
        data.nickname = user.nickname;
        data.headUrl = user.headUrl;
      }
    }
    if(data.rid !== data.pid && data.rid !== 0 && quote) {
      data.quote = quote;
    }
    data.likeCount = likeCount || 0;
    data.isLike = isLike;
    return data;
  }

  /**
   * 包装评论数据，补上用户信息、点赞信息、收藏信息、回复数量，附件媒体
   * @param data:Object 评论基本信息
   * @param uid:int 用户id
   * @returns Object
   */
  async plusFull(data, uid) {
    if(!data) {
      return;
    }
    let [
      { quote, authorHash, userHash },
      [ likeCount, isLike ],
      [ favorCount, isFavor ],
      replyCount,
      media
    ] = await Promise.all([
      this.quoteAndPerson(data),
      this.operateRelation(data.id, uid, 1),
      this.operateRelation(data.id, uid, 2),
      this.replyCount(data.id),
      this.media(data.id)
    ]);
    if(data.isAuthor) {
      let author = authorHash[data.aid];
      if(author) {
        data.name = author.name;
        data.headUrl = author.headUrl;
      }
    }
    else {
      let user = userHash[data.uid];
      if(user) {
        data.nickname = user.nickname;
        data.headUrl = user.headUrl;
      }
    }
    if(data.rid !== data.pid && data.rid !== 0 && quote) {
      data.quote = quote;
    }
    data.likeCount = likeCount || 0;
    data.isLike = isLike;
    data.favorCount = favorCount || 0;
    data.isFavor = isFavor;
    data.replyCount = replyCount || 0;
    if(media) {
      media.forEach(function(item) {
        delete item.commentId;
      });
      data.media = media;
    }
    return data;
  }

  /**
   * 获取评论引用数据和用户数据
   * @param data:Object 评论基本信息
   * @returns Object{ userHash, authorHash, quote }
   */
  async quoteAndPerson(data) {
    if(!data) {
      return;
    }
    const { service } = this;
    let userIdList = [];
    let userIdHash = {};
    let authorIdList = [];
    let authorIdHash = {};
    let quoteId;
    if(data.aid) {
      if(!authorIdHash[data.aid]) {
        authorIdHash[data.aid] = true;
        authorIdList.push(data.aid);
      }
      delete data.uid;
      data.isAuthor = true;
    }
    else if(data.uid) {
      if(!userIdHash[data.uid]) {
        userIdHash[data.uid] = true;
        userIdList.push(data.uid);
      }
      delete data.aid;
    }
    if(data.rid !== data.pid && data.rid !== 0) {
      quoteId = data.pid;
    }
    let quote = await this.info(quoteId);
    if(quote) {
      if(quote.aid) {
        if(!authorIdHash[quote.aid]) {
          authorIdHash[quote.aid] = true;
          authorIdList.push(quote.aid);
        }
        delete quote.uid;
        quote.isAuthor = true;
      }
      else {
        if(!userIdHash[quote.uid]) {
          userIdHash[quote.uid] = true;
          userIdList.push(quote.uid);
        }
        delete quote.aid;
      }
      if(quote.content.length > 60) {
        quote.slice = true;
        quote.content = quote.content.slice(0, 60) + '...';
      }
    }
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
    if(quote) {
      if(quote.isAuthor) {
        quote.name = authorHash[quote.aid].name;
        quote.headUrl = authorHash[quote.aid].headUrl;
      }
      else {
        quote.nickname = userHash[quote.uid].nickname;
        quote.headUrl = userHash[quote.uid].headUrl;
      }
    }
    return {
      quote,
      authorHash,
      userHash,
    };
  }

  /**
   * 包装评论数据，补上用户信息、点赞信息、收藏信息、回复数、媒体信息
   * @param dataList:Array<Object> 评论基本信息
   * @param uid:int 用户id
   * @returns Array<Object>
   */
  async plusListFull(dataList, uid) {
    if(!dataList) {
      return;
    }
    if(!dataList.length) {
      return [];
    }
    let idList = dataList.map(function(item) {
      return item.id;
    });
    let [
      { quoteHash, authorHash, userHash },
      [ likeCountList, likeList ],
      [ favorCountList, favorList ],
      replyCountList,
      mediaList
    ] = await Promise.all([
      this.quoteAndPersonList(dataList),
      this.operateRelationList(idList, uid, 1),
      this.operateRelationList(idList, uid, 2),
      this.replyCountList(idList),
      this.mediaList(idList)
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
        if(likeCountList) {
          item.likeCount = likeCountList[i] || 0;
        }
        if(likeList) {
          item.isLike = likeList[i];
        }
        if(favorCountList) {
          item.favorCount = favorCountList[i] || 0;
        }
        if(favorList) {
          item.isFavor = favorList[i];
        }
        if(replyCountList) {
          item.replyCount = replyCountList[i] || 0;
        }
        if(mediaList) {
          let media = mediaList[i];
          if(media) {
            media.forEach(function(item) {
              delete item.commentId;
            });
            item.media = media;
          }
        }
      }
    });
    return dataList;
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
    let [
      { quoteHash, authorHash, userHash },
      [ likeCountList, likeList ]
    ] = await Promise.all([
      this.quoteAndPersonList(dataList),
      this.operateRelationList(dataList, uid, 1)
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
        if(likeCountList) {
          item.likeCount = likeCountList[i] || 0;
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
  async quoteAndPersonList(dataList) {
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
   * 根据评论id获取其点赞数和是否点赞
   * @param id:int 评论id
   * @param uid:int 用户id
   * @param type:int 类型
   * @returns Array{ count, state }
   */
  async operateRelation(id, uid, type) {
    if(!id || !uid || !type) {
      return [];
    }
    let [count, state] = await Promise.all([
      this.relationCount(id, type),
      this.isRelation(id, uid, type)
    ]);
    return [
      count,
      state,
    ];
  }

  /**
   * 根据评论id列表获取其点赞数和是否点赞
   * @param idList:Array<int> 评论列表id
   * @param uid:int 用户id
   * @param type:int 类型
   * @returns Array{ countList:Array, stateList:Array }
   */
  async operateRelationList(idList, uid, type) {
    if(!idList || !uid || !type) {
      return [];
    }
    let [countList, stateList] = await Promise.all([
      this.relationCountList(idList, type),
      this.isRelationList(idList, uid, type)
    ]);
    return [
      countList,
      stateList,
    ];
  }

  /**
   * 获取评论是否点赞/收藏
   * @param id: 评论id
   * @param uid:int 用户id
   * @param type:int 类型
   * @returns boolean
   */
  async isRelation(id, uid, type) {
    if(!id || !uid || !type) {
      return;
    }
    const { app } = this;
    let cacheKey = 'userCommentRelation_' + uid + '_' + id + '_' + type;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME)
      return JSON.parse(res);
    }
    res = await app.model.userCommentRelation.findOne({
      attributes: [
        ['comment_id', 'commentId']
      ],
      where: {
        user_id: uid,
        type,
        comment_id: id,
        is_delete: false,
      },
      raw: true,
    });
    res = !!res;
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 获取评论是否点赞/收藏
   * @param idList:Array<int> 评论id列表
   * @param uid:int 用户id
   * @param type:int 类型
   * @returns boolean
   */
  async isRelationList(idList, uid, type) {
    if(!idList || !type) {
      return;
    }
    if(!idList.length || !uid) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        return app.redis.get('userCommentRelation_' + uid + '_' + id + '_' + type);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('userCommentRelation_' + uid + '_' + id + '_' + type, CACHE_TIME);
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
          type,
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
          app.redis.setex('userCommentRelation_' + uid + '_' + id + '_' + type, CACHE_TIME, JSON.stringify(item));
        });
      }
    }
    return cache;
  }

  /**
   * 获取评论点赞/收藏数
   * @param id:int 评论id
   * @param type:int 类型
   * @returns int
   */
  async relationCount(id, type) {
    if(!id || !type) {
      return;
    }
    const { app } = this;
    let cacheKey = 'commentCount_' + id + '_' + type;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
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
    res = res.num || 0;
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 获取评论列表点赞/收藏数
   * @param idList:Array<int> 评论id列表
   * @param type:int 类型
   * @returns int
   */
  async relationCountList(idList, type) {
    if(!idList || !type) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        return app.redis.get('commentCount_' + id + '_' + type);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('commentCount_' + id + '_' + type, CACHE_TIME);
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
          type,
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
          app.redis.setex('commentCount_' + id + '_' + type, CACHE_TIME, JSON.stringify(num));
        });
      }
    }
    return cache;
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

  /**
   * 根据评论id获取回复数量
   * @param id:int
   * @returns Array<int>
   */
  async replyCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'commentReplyCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.reids.expire(cacheKey, CACHE_TIME);
      return JSON.stringify(res);
    }
    res = await app.model.comment.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        root_id: id,
        is_delete: false,
      },
      raw: true,
    });
    res = res.num || 0;
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }
  
  /**
   * 根据评论id列表获取回复数量
   * @param idList:Array<int>
   * @returns Array<int>
   */
  async replyCountList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        return app.redis.get('commentReplyCount_' + id);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('commentReplyCount_' + id, CACHE_TIME);
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
      let res = await app.model.comment.findAll({
        attributes: [
          ['root_id', 'rootId'],
          [Sequelize.fn('COUNT', '*'), 'num']
        ],
        where: {
          root_id: noCacheIdList,
          is_delete: false,
        },
        group: 'rootId',
        raw: true,
      });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          let id = item.rootId;
          hash[id] = item.num;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let temp = hash[id] || 0;
          cache[i] = temp;
          app.redis.setex('comment_' + id, CACHE_TIME, JSON.stringify(temp));
        });
      }
    }
    return cache;
  }
}

module.exports = Service;
