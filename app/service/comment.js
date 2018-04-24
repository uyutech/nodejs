/**
 * Created by army8735 on 2018/3/26.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

class Service extends egg.Service {
  /**
   * 根据言论id列取言论详情
   * @param id:int 言论id
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
      return JSON.parse(res);
    }
    res = await app.model.comment.findOne({
      attributes: [
        'id',
        ['user_id', 'userId'],
        ['author_id', 'authorId'],
        'content',
        ['parent_id', 'parentId'],
        ['root_id', 'rootId'],
        ['create_time', 'createTime'],
        ['is_delete', 'isDelete']
      ],
      where: {
        id,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 根据言论id列表获取言论详情
   * @param idList:Array<int> 言论id列表
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
        return app.redis.get('comment_' + id);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
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
          ['user_id', 'userId'],
          ['author_id', 'authorId'],
          'content',
          ['parent_id', 'parentId'],
          ['root_id', 'rootId'],
          ['create_time', 'createTime'],
          ['is_delete', 'isDelete']
        ],
        where: {
          id: idList,
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
        app.redis.setex('comment_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 返回言论id的媒体信息
   * @param id:int 言论id
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
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 返回言论id列表的媒体信息
   * @param idList:int 言论id
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
      idList.map((id) => {
        if(id !== undefined && id !== null) {
          return app.redis.get('commentMedia_' + id);
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
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.commentId;
          let temp = hash[id] = hash[id] || [];
          temp.push(item);
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let item = hash[id] || [];
        cache[i] = item;
        app.redis.setex('commentMedia_' + id, app.config.redis.time, JSON.stringify(item));
      });
    }
    return cache;
  }

  /**
   * 获取言论下附带的作品
   * @param id:int 言论id
   * @returns Array<Object>
   */
  async work(id, uid) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'commentWork_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.commentWork.findAll({
        attributes: [
          ['works_id', 'worksId'],
          ['work_id', 'workId'],
          'kind'
        ],
        where: {
          comment_id: id,
          is_delete: false,
        },
        raw: true,
      });
    }
    let videoIdList = [];
    let videoIdHash = {};
    let audioIdList = [];
    let audioIdHash = {};
    let worksIdList = [];
    let worksIdHash = {};
    res.forEach((item) => {
      let id = item.workId;
      if(item.kind === 1) {
        if(!videoIdHash[id]) {
          videoIdHash[id] = true;
          videoIdList.push(id);
        }
      }
      else if(item.kind === 2) {
        if(!audioIdHash[id]) {
          audioIdHash[id] = true;
          audioIdList.push(id);
        }
      }
      let worksId = item.worksId;
      if(!worksIdHash[worksId]) {
        worksIdHash[worksId] = true;
        worksIdList.push(worksId);
      }
    });
    let [videoList, audioList, worksList] = await Promise.all([
      service.work.infoListPlusFull(videoIdList, 1),
      service.work.infoListPlusFull(audioIdList, 2),
      service.works.infoListPlusFull(worksIdList, uid)
    ]);
    let hash = {};
    videoList.forEach((item) => {
      if(item) {
        item.author = service.works.firstAuthor(item.author);
        hash[item.id] = item;
      }
    });
    audioList.forEach((item) => {
      if(item) {
        item.author = service.works.firstAuthor(item.author);
        hash[item.id] = item;
      }
    });
    worksList.forEach((item) => {
      if(item) {
        item.author = service.works.firstAuthor(item.author);
        hash[item.id] = item;
      }
    });
    return res.map((item) => {
      if(item) {
        let works = hash[item.worksId];
        let work = hash[item.workId];
        if(works && work) {
          let copy = Object.assign({}, works);
          copy.work = work;
          return copy;
        }
      }
    });
  }

  /**
   * 获取言论列表下附带的作品
   * @param idList:int 言论id列表
   * @param uid:int 用户id
   * @returns Array<Array<Object>>
   */
  async workList(idList, uid) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app, service } = this;
    let cache = await Promise.all(
      idList.map((id) => {
        if(id !== null && id !== undefined) {
          return app.redis.get('commentWork_' + id);
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
      let res = await app.model.commentWork.findAll({
        attributes: [
          ['comment_id', 'commentId'],
          ['works_id', 'worksId'],
          ['work_id', 'workId'],
          'kind'
        ],
        where: {
          comment_id: noCacheIdList,
          is_delete: false,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.commentId;
          let temp = hash[id] = hash[id] || [];
          temp.push({
            worksId: item.worksId,
            workId: item.workId,
            kind: item.kind,
          });
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || [];
        cache[i] = temp;
        app.redis.setex('commentWork_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    let videoIdList = [];
    let videoIdHash = {};
    let audioIdList = [];
    let audioIdHash = {};
    let worksIdList = [];
    let worksIdHash = {};
    cache.forEach((arr) => {
      if(arr) {
        arr.forEach((item) => {
          let id = item.workId;
          if(item.kind === 1) {
            if(!videoIdHash[id]) {
              videoIdHash[id] = true;
              videoIdList.push(id);
            }
          }
          else if(item.kind === 2) {
            if(!audioIdHash[id]) {
              audioIdHash[id] = true;
              audioIdList.push(id);
            }
          }
          let worksId = item.worksId;
          if(!worksIdHash[worksId]) {
            worksIdHash[worksId] = true;
            worksIdList.push(worksId);
          }
        });
      }
    });
    let [videoList, audioList, worksList] = await Promise.all([
      service.work.infoListPlusFull(videoIdList, 1, uid),
      service.work.infoListPlusFull(audioIdList, 2, uid),
      service.works.infoListPlusFull(worksIdList, uid)
    ]);
    let hash = {};
    videoList.forEach((item) => {
      if(item) {
        item.author = service.works.firstAuthor(item.author);
        hash[item.id] = item;
      }
    });
    audioList.forEach((item) => {
      if(item) {
        item.author = service.works.firstAuthor(item.author);
        hash[item.id] = item;
      }
    });
    worksList.forEach((item) => {
      if(item) {
        item.author = service.works.firstAuthor(item.author);
        hash[item.id] = item;
      }
    });
    return cache.map((arr) => {
      if(arr) {
        return arr.map((item) => {
          if(item) {
            let works = hash[item.worksId];
            let work = hash[item.workId];
            if(works && work) {
              let copy = Object.assign({}, works);
              copy.work = work;
              return copy;
            }
          }
        });
      }
      return [];
    });
  }

  /**
   * 包装言论数据，补上用户信息、点赞信息
   * @param data:Object 言论基本信息
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
      this.quoteAndPerson(data, uid),
      this.operateRelation(data.id, uid, 1)
    ]);
    if(data.isAuthor) {
      let author = authorHash[data.authorId];
      if(author) {
        data.name = author.name;
        data.headUrl = author.headUrl;
      }
    }
    else {
      let user = userHash[data.userId];
      if(user) {
        data.nickname = user.nickname;
        data.headUrl = user.headUrl;
      }
    }
    if(data.rootId !== data.parentId && data.rootId !== 0 && quote) {
      data.quote = quote;
    }
    data.likeCount = likeCount || 0;
    data.isLike = isLike;
    return data;
  }

  /**
   * 包装言论数据，补上用户信息、点赞信息、收藏信息、回复数量、画圈关系、附件媒体
   * @param data:Object 言论基本信息
   * @param uid:int 用户id
   * @returns Object
   */
  async plusFull(data, uid) {
    if(!data) {
      return;
    }
    const { service } = this;
    let id = data.id;
    let worksIdList = [];
    let workIdList = [];
    let authorIdList = [];
    let userIdList = [];
    let hash = {};
    let matches = data.content.match(/@\/(\w+)\/(\d+)\/?(\d+)?(\s|$)/g);
    if(matches) {
      matches.forEach((item) => {
        let match = item.match(/@\/(\w+)\/(\d+)\/?(\d+)?(\s|$)/);
        if(match) {
          let type = match[1];
          let id = match[2];
          if(hash[id]) {
            return;
          }
          hash[id] = true;
          switch(type) {
            case 'works':
              worksIdList.push(id);
              break;
            case 'work':
              workIdList.push(id);
              break;
            case 'author':
              authorIdList.push(id);
              break;
            case 'user':
              userIdList.push(id);
              break;
          }
        }
      });
    }
    hash = {};
    let nameList = [];
    matches = data.content.match(/#[^#\n\s]+?#/g);
    if(matches) {
      matches.forEach((item) => {
        let name = item.slice(1, -1);
        if(hash[name]) {
          return;
        }
        hash[name] = true;
        nameList.push(name);
      });
    }
    let [
      { quote, authorHash, userHash },
      [ likeCount, isLike ],
      [ favorCount, isFavor ],
      replyCount,
      circle,
      media,
      work,
      worksList,
      workList,
      authorList,
      userList,
      tagCircleList
    ] = await Promise.all([
      this.quoteAndPerson(data, uid),
      this.operateRelation(id, uid, 1),
      this.operateRelation(id, uid, 2),
      this.replyCount(id),
      this.circle(id),
      this.media(id),
      this.work(id, uid),
      service.works.infoList(worksIdList),
      service.work.infoList(workIdList),
      service.author.infoList(authorIdList),
      service.user.infoList(userIdList),
      service.tag.circleIdListByName(nameList, 1)
    ]);
    if(data.isAuthor) {
      let author = authorHash[data.authorId];
      if(author) {
        data.name = author.name;
        data.headUrl = author.headUrl;
      }
    }
    else {
      let user = userHash[data.userId];
      if(user) {
        data.nickname = user.nickname;
        data.headUrl = user.headUrl;
      }
    }
    if(data.rootId !== data.parentId && data.rootId !== 0 && quote) {
      data.quote = quote;
    }
    data.likeCount = likeCount || 0;
    data.isLike = isLike;
    data.favorCount = favorCount || 0;
    data.isFavor = isFavor;
    data.replyCount = replyCount || 0;
    data.circle = circle;
    media.forEach((item) => {
      delete item.commentId;
    });
    data.media = media;
    data.work = work;
    let refHash = data.refHash = {};
    let tagCircleHash = data.tagCircleHash = {};
    worksList.forEach((item) => {
      if(item) {
        refHash[item.id] = item;
      }
    });
    workList.forEach((item) => {
      if(item) {
        refHash[item.id] = item;
      }
    });
    authorList.forEach((item) => {
      if(item) {
        refHash[item.id] = item;
      }
    });
    userList.forEach((item) => {
      if(item) {
        refHash[item.id] = item;
      }
    });
    tagCircleList.forEach((item, i) => {
      if(item && item.length) {
        tagCircleHash[nameList[i]] = item[0];
      }
    });
    return data;
  }

  /**
   * 获取言论引用数据和用户数据
   * @param data:Object 言论基本信息
   * @param uid:int 登录id
   * @returns Object{ userHash, authorHash, quote }
   */
  async quoteAndPerson(data, uid) {
    if(!data) {
      return;
    }
    const { service } = this;
    let userIdList = [];
    let userIdHash = {};
    let authorIdList = [];
    let authorIdHash = {};
    let quoteId;
    data.isOwn = data.userId === uid;
    if(data.authorId) {
      if(!authorIdHash[data.authorId]) {
        authorIdHash[data.authorId] = true;
        authorIdList.push(data.authorId);
      }
      delete data.userId;
      data.isAuthor = true;
    }
    else if(data.userId) {
      if(!userIdHash[data.userId]) {
        userIdHash[data.userId] = true;
        userIdList.push(data.userId);
      }
      delete data.authorId;
    }
    if(data.rootId !== data.parentId && data.rootId !== 0) {
      quoteId = data.parentId;
    }
    let quote = await this.info(quoteId);
    if(quote) {
      if(quote.authorId) {
        if(!authorIdHash[quote.authorId]) {
          authorIdHash[quote.authorId] = true;
          authorIdList.push(quote.authorId);
        }
        delete quote.userId;
        quote.isAuthor = true;
      }
      else {
        if(!userIdHash[quote.userId]) {
          userIdHash[quote.userId] = true;
          userIdList.push(quote.userId);
        }
        delete quote.authorId;
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
    userList.forEach((item) => {
      if(item) {
        userHash[item.id] = item;
      }
    });
    let authorHash = {};
    authorList.forEach((item) => {
      if(item) {
        authorHash[item.id] = item;
      }
    });
    if(quote) {
      if(quote.isDelete) {
        delete quote.content;
      }
      if(quote.isAuthor) {
        if(authorHash[quote.authorId]) {
          quote.name = authorHash[quote.authorId].name;
          quote.headUrl = authorHash[quote.authorId].headUrl;
        }
      }
      else if(userHash[quote.userId]) {
        quote.nickname = userHash[quote.userId].nickname;
        quote.headUrl = userHash[quote.userId].headUrl;
      }
    }
    return {
      quote,
      authorHash,
      userHash,
    };
  }

  /**
   * 包装言论数据，补上用户信息、点赞信息、收藏信息、回复数、媒体信息
   * @param dataList:Array<Object> 言论基本信息
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
    const { service } = this;
    let worksIdList = [];
    let workIdList = [];
    let authorIdList = [];
    let userIdList = [];
    let matchList = [];
    let tagMatchList = [];
    let hash = {};
    let nameList = [];
    let tagHash = {};
    let idList = dataList.map((item, i) => {
      if(item) {
        let matches = item.content.match(/@\/(\w+)\/(\d+)\/?(\d+)?(\s|$)/g);
        matchList[i] = [];
        if(matches) {
          matches.forEach((item) => {
            let match = item.match(/@\/(\w+)\/(\d+)\/?(?:\d+)?(?:\s|$)/);
            if(match) {
              let type = match[1];
              let id = match[2];
              matchList[i].push(id);
              if(hash[id]) {
                return;
              }
              hash[id] = true;
              switch(type) {
                case 'works':
                  worksIdList.push(id);
                  break;
                case 'work':
                  workIdList.push(id);
                  break;
                case 'author':
                  authorIdList.push(id);
                  break;
                case 'user':
                  userIdList.push(id);
                  break;
              }
            }
          });
        }
        tagMatchList[i] = [];
        matches = item.content.match(/#[^#\n\s]+?#/g);
        if(matches) {
          matches.forEach((item) => {
            let name = item.slice(1, -1);
            tagMatchList[i].push(name);
            if(tagHash[name]) {
              return;
            }
            tagHash[name] = true;
            nameList.push(name);
          });
        }
        return item.id;
      }
    });
    let [
      { quoteHash, authorHash, userHash },
      [ likeCountList, likeList ],
      [ favorCountList, favorList ],
      replyCountList,
      circleList,
      mediaList,
      workList,
      worksList,
      workList2,
      authorList,
      userList,
      tagCircleList
    ] = await Promise.all([
      this.quoteAndPersonList(dataList, uid),
      this.operateRelationList(idList, uid, 1),
      this.operateRelationList(idList, uid, 2),
      this.replyCountList(idList),
      this.circleList(idList),
      this.mediaList(idList),
      this.workList(idList, uid),
      service.works.infoList(worksIdList),
      service.work.infoList(workIdList),
      service.author.infoList(authorIdList),
      service.user.infoList(userIdList),
      service.tag.circleIdListByName(nameList, 1)
    ]);
    let allRefHash = {};
    worksList.forEach((item) => {
      if(item) {
        allRefHash[item.id] = item;
      }
    });
    workList2.forEach((item) => {
      if(item) {
        allRefHash[item.id] = item;
      }
    });
    authorList.forEach((item) => {
      if(item) {
        allRefHash[item.id] = item;
      }
    });
    userList.forEach((item) => {
      if(item) {
        allRefHash[item.id] = item;
      }
    });
    let allTagCircleHash = {};
    tagCircleList.forEach((item, i) => {
      if(item && item.length) {
        allTagCircleHash[nameList[i]] = item[0];
      }
    });
    dataList.forEach((item, i) => {
      if(item) {
        let refHash = item.refHash = {};
        let tagCircleHash = item.tagCircleHash = {};
        matchList[i].forEach((id) => {
          refHash[id] = allRefHash[id];
        });
        tagMatchList[i].forEach((name) => {
          tagCircleHash[name] = allTagCircleHash[name];
        });
        if(item.isAuthor) {
          let author = authorHash[item.authorId];
          if(author) {
            item.name = author.name;
            item.headUrl = author.headUrl;
          }
        }
        else {
          let user = userHash[item.userId];
          if(user) {
            item.nickname = user.nickname;
            item.headUrl = user.headUrl;
          }
        }
        if(item.rootId !== item.parentId && item.rootId !== 0 && quoteHash[item.parentId]) {
          item.quote = quoteHash[item.parentId];
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
        if(circleList) {
          item.circle = circleList[i];
        }
        let media = mediaList[i];
        media.forEach((item) => {
          delete item.commentId;
        });
        item.media = media;
        item.work = workList[i];
      }
    });
    return dataList;
  }

  /**
   * 包装言论数据，补上用户信息、点赞信息
   * @param dataList:Array<Object> 言论基本信息
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
    let idList = dataList.map((item) => {
      return item.id;
    });
    let [
      { quoteHash, authorHash, userHash },
      [ likeCountList, likeList ]
    ] = await Promise.all([
      this.quoteAndPersonList(dataList, uid),
      this.operateRelationList(idList, uid, 1)
    ]);
    dataList.forEach((item, i) => {
      if(item) {
        if(item.isAuthor) {
          let author = authorHash[item.authorId];
          if(author) {
            item.name = author.name;
            item.headUrl = author.headUrl;
          }
        }
        else {
          let user = userHash[item.userId];
          if(user) {
            item.nickname = user.nickname;
            item.headUrl = user.headUrl;
          }
        }
        if(item.rootId !== item.parentId && item.rootId !== 0 && quoteHash[item.parentId]) {
          item.quote = quoteHash[item.parentId];
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
   * 获取言论引用数据和用户数据
   * @param dataList:Array<Object> 言论基本信息
   * @param uid:int 登录id
   * @returns Object{ userHash, authorHash, quoteHash }
   */
  async quoteAndPersonList(dataList, uid) {
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
    dataList.forEach((item) => {
      if(item) {
        item.isOwn = item.userId === uid;
        if(item.authorId) {
          if(!authorIdHash[item.authorId]) {
            authorIdHash[item.authorId] = true;
            authorIdList.push(item.authorId);
          }
          delete item.userId;
          item.isAuthor = true;
        }
        else if(item.userId) {
          if(!userIdHash[item.userId]) {
            userIdHash[item.userId] = true;
            userIdList.push(item.userId);
          }
          delete item.authorId;
        }
        if(item.rootId !== item.parentId && item.rootId !== 0 && !quoteIdHash[item.parentId]) {
          quoteIdHash[item.parentId] = true;
          quoteIdList.push(item.parentId);
        }
      }
    });
    let quoteList = await this.infoList(quoteIdList);
    let quoteHash = {};
    quoteList.forEach((item) => {
      if(item) {
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
      }
    });
    let [userList, authorList] = await Promise.all([
      service.user.infoList(userIdList),
      service.author.infoList(authorIdList)
    ]);
    let userHash = {};
    userList.forEach((item) => {
      if(item) {
        userHash[item.id] = item;
      }
    });
    let authorHash = {};
    authorList.forEach((item) => {
      if(item) {
        authorHash[item.id] = item;
      }
    });
    quoteList.forEach((item) => {
      if(item) {
        if(item.isDelete) {
          delete item.content;
        }
        if(item.isAuthor) {
          if(authorHash[item.authorId]) {
            item.name = authorHash[item.authorId].name;
            item.headUrl = authorHash[item.authorId].headUrl;
          }
        }
        else if(userHash[item.userId]) {
          item.nickname = userHash[item.userId].nickname;
          item.headUrl = userHash[item.userId].headUrl;
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
   * 根据言论id获取其点赞数和是否点赞
   * @param id:int 言论id
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
   * 根据言论id列表获取其点赞数和是否点赞
   * @param idList:Array<int> 言论列表id
   * @param uid:int 用户id
   * @param type:int 类型
   * @returns Array{ countList:Array, stateList:Array }
   */
  async operateRelationList(idList, uid, type) {
    if(!idList || !idList.length || !uid || !type) {
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
   * 获取言论是否点赞/收藏
   * @param id: 言论id
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
      },
      raw: true,
    });
    res = !!res;
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 获取言论是否点赞/收藏
   * @param idList:Array<int> 言论id列表
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
      idList.map((id) => {
        if(id !== undefined && id !== null) {
          return app.redis.get('userCommentRelation_' + uid + '_' + id + '_' + type);
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
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.commentId;
          hash[id] = true;
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let item = hash[id] || false;
        cache[i] = item;
        app.redis.setex('userCommentRelation_' + uid + '_' + id + '_' + type, app.config.redis.time, JSON.stringify(item));
      });
    }
    return cache;
  }

  /**
   * 获取言论点赞/收藏数
   * @param id:int 言论id
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
      return JSON.parse(res);
    }
    res = await app.model.userCommentRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        comment_id: id,
        type,
      },
      raw: true,
    });
    res = res.num || 0;
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 获取言论列表点赞/收藏数
   * @param idList:Array<int> 言论id列表
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
      idList.map((id) => {
        return app.redis.get('commentCount_' + id + '_' + type);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
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
          comment_id: noCacheIdList,
          type,
        },
        group: 'commentId',
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.commentId;
          hash[id] = item.num;
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let num = hash[id] || 0;
        cache[i] = num;
        app.redis.setex('commentCount_' + id + '_' + type, app.config.redis.time, JSON.stringify(num));
      });
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
    let [now, count] = await Promise.all([
      this.isRelation(id, uid, type),
      this.relationCount(id, type)
    ]);
    if(now === state) {
      return {
        state,
        count,
      };
    }
    const { app } = this;
    // 更新内存中用户对留言关系的状态，同时入库
    let cacheKey = 'userCommentRelation_' + uid + '_' + id + '_' + type;
    if(state) {
      await Promise.all([
        app.redis.setex(cacheKey, app.config.redis.time, 'true'),
        app.model.userCommentRelation.create({
          user_id: uid,
          comment_id: id,
          type,
        }, {
          raw: true,
        })
      ]);
    }
    else {
      await Promise.all([
        app.redis.setex(cacheKey, app.config.redis.time, 'false'),
        app.model.userCommentRelation.destroy({
          where: {
            user_id: uid,
            comment_id: id,
            type,
          },
        })
      ]);
    }
    // 更新计数，优先内存缓存
    cacheKey = 'commentCount_' + id + '_' + type;
    if(state) {
      count = await app.redis.incr(cacheKey);
    }
    else {
      count = await app.redis.decr(cacheKey);
    }
    return {
      state,
      count,
    };
  }

  /**
   * 根据言论id获取回复数量
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
      return JSON.parse(res);
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
    if(res) {
      res = res.num || 0;
    }
    else {
      res = 0;
    }
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }
  
  /**
   * 根据言论id列表获取回复数量
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
      idList.map((id) => {
        if(id !== null && id !== undefined) {
          return app.redis.get('commentReplyCount_' + id);
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
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.rootId;
          hash[id] = item.num || 0;
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || 0;
        cache[i] = temp;
        app.redis.setex('commentReplyCount_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 获取言论对应的tagId
   * @param id:int 言论id
   * @param type:int 类型
   * @returns Array<int>
   */
  async tag(id, type) {
    if(!id || !type) {
      return;
    }
    const { app } = this;
    let cacheKey = 'commentTag_' + id + '_' + type;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.tagCommentRelation.findAll({
      attributes: [
        ['tag_id', 'tagId'],
      ],
      where: {
        comment_id: id,
        type,
        is_delete: false,
      },
      raw: true,
    });
    res = res.map((item) => {
      return item.tagId;
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 获取言论列表对应的tagId
   * @param idList:Array<int> 言论id列表
   * @param type:int 类型
   * @returns Array<Array<int>>
   */
  async tagList(idList, type) {
    if(!idList || !type) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map((id) => {
        if(id !== null && id !== undefined) {
          return app.redis.get('commentTag_' + id + '_' + type);
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
      let res = await app.model.tagCommentRelation.findAll({
        attributes: [
          ['comment_id', 'commentId'],
          ['tag_id', 'tagId']
        ],
        where: {
          comment_id: noCacheIdList,
          type,
          is_delete: false,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.commentId;
          let temp = hash[id] = hash[id] || [];
          temp.push(item.tagId);
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let item = hash[id] || [];
        cache[i] = item;
        app.redis.setex('commentTag_' + id + '_' + type, app.config.redis.time, JSON.stringify(item));
      });
    }
    return cache;
  }

  /**
   * 获取言论所属画圈信息
   * @param id:int 言论id
   * @returns Array<Object>
   */
  async circle(id) {
    if(!id) {
      return;
    }
    const { service } = this;
    let tagIdList = await this.tag(id, 1);
    let circleIdList = await service.tag.circleIdList(tagIdList, 1);
    let list = [];
    let hash = {};
    circleIdList.forEach((arr) => {
      arr.forEach((id) => {
        if(!hash[id]) {
          hash[id] = true;
          list.push(id);
        }
      });
    });
    let res = await service.circle.infoList(list);
    return res.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });
  }

  /**
   * 获取言论列表所属画圈信息
   * @param idList:int 言论id列表
   * @returns Array<Array<Object>>
   */
  async circleList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { service } = this;
    let tagIdList = await this.tagList(idList, 1);
    let list = [];
    let hash = {};
    tagIdList.forEach((arr) => {
      if(arr) {
        arr.forEach((tagId) => {
          if(!hash[tagId]) {
            hash[tagId] = true;
            list.push(tagId);
          }
        });
      }
    });
    let circleIdList = await service.tag.circleIdList(list, 1);
    let list2 = [];
    let hash2 = {};
    circleIdList.forEach((arr) => {
      arr.forEach((id) => {
        if(!hash2[id]) {
          hash2[id] = true;
          list2.push(id);
        }
      });
    });
    let res = await service.circle.infoList(list2);
    let circleHash = {};
    list2.forEach((id, i) => {
      circleHash[id] = {
        id,
        name: res[i].name,
      };
    });
    let tagCircleHash = {};
    list.forEach((tagId, i) => {
      if(tagId) {
        let temp = tagCircleHash[tagId] = [];
        let hash = {};
        circleIdList[i].forEach((circleId) => {
          if(!hash[circleId]) {
            hash[circleId] = true;
            temp.push(circleHash[circleId]);
          }
        });
      }
    });
    return tagIdList.map((arr) => {
      if(arr) {
        let temp = [];
        let hash = {};
        arr.forEach((tagId) => {
          let circleList = tagCircleHash[tagId];
          circleList.forEach((circle) => {
            if(!hash[circle.id]) {
              hash[circle.id] = true;
              temp.push(circle);
            }
          });
        });
        return temp;
      }
    });
  }

  /**
   * 添加回复
   * @param uid:int 用户id
   * @param rootId:int 根id
   * @param parentId:int 父id
   * @param content:int 内容
   * @param authorId:Object 作者id
   */
  async add(uid, rootId, parentId, content, authorId) {
    if(!uid || !rootId || !parentId) {
      return;
    }
    const { app, service } = this;
    if(authorId) {
      let check = await service.author.isUser(authorId, uid);
      if(!check) {
        return;
      }
    }
    let now = new Date();
    let create = await app.model.comment.create({
      user_id: uid,
      author_id: authorId || 0,
      content: content,
      is_delete: false,
      review: 0,
      state: 0,
      parent_id: parentId,
      root_id: rootId,
      create_time: now,
      update_time: now,
    });
    let res = await this.info(create.id);
    return this.plusFull(res, uid);
  }

  /**
   * 举报言论
   * @param id:int 言论id
   * @param uid:int 用户id
   */
  async report(id, uid) {
    if(!id) {
      return;
    }
    const { app } = this;
    await app.model.userReport.create({
      target_id: id,
      type: 5,
      user_id: uid,
    });
  }

  /**
   * 屏蔽言论
   * @param id:int 言论id
   * @param uid:int 用户id
   */
  async block(id, uid) {
    if(!id || !uid) {
      return {
        success: false,
      };
    }
    const { app } = this;
    let exist = await app.model.userCommentRelation.findOne({
      attributes: [
        'id'
      ],
      where: {
        user_id: uid,
        comment_id: id,
        type: 3,
      },
      raw: true,
    });
    if(exist) {
      return {
        success: false,
        message: '已经屏蔽过无需重复屏蔽',
      };
    }
    await app.model.userCommentRelation.create({
      user_id: uid,
      comment_id: id,
      type: 3,
    });
    return {
      success: true,
    };
  }

  /**
   * 删除言论
   * @param id:int 言论id
   * @param uid:int 用户id
   */
  async del(id, uid) {
    if(!id || !uid) {
      return {
        success: false,
      };
    }
    const { app } = this;
    let exist = await app.model.comment.findOne({
      attributes: [
        ['user_id', 'userId'],
        ['is_delete', 'isDelete']
      ],
      where: {
        id,
      },
      raw: true,
    });
    if(!exist) {
      return {
        success: false,
        message: '言论不存在~',
      };
    }
    if(exist.isDelete) {
      return {
        success: false,
        message: '已经删除过了，无需重复删除~',
      };
    }
    if(exist.userId !== uid) {
      return {
        success: false,
        message: '没有权限~',
      };
    }
    let now = new Date();
    await Promise.all([
      app.model.comment.update({
        is_delete: true,
      }, {
        where: {
          id,
        },
      }),
      app.model.tagCommentRelation.update({
        is_comment_delete: true,
        update_time: now,
      }, {
        where: {
          comment_id: id,
        },
      }),
      app.model.circleCommentRelation.update({
        is_comment_delete: true,
        update_time: now,
      }, {
        where: {
          comment_id: id,
        },
      })
    ]);
    return {
      success: true,
    };
  }
}

module.exports = Service;
