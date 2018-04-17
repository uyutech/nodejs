/**
 * Created by army8735 on 2018/3/30.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

const CACHE_TIME = 10;

class Service extends egg.Service {
  /**
   * 根据专辑id获取专辑信息
   * @param id:int 专辑id
   * @returns Object
   */
  async info(id) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'musicAlbumInfo_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      res = JSON.parse(res);
    }
    else {
      res = await app.model.musicAlbum.findOne({
        attributes: [
          'id',
          'title',
          ['sub_title', 'subTitle'],
          'state',
          'cover',
          'type',
        ],
        where: {
          id,
        },
        raw: true,
      });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    if(res) {
      let type = await service.worksType.info(res.type);
      if(type) {
        res.typeName = type.name;
      }
    }
    return res;
  }

  /**
   * 根据专辑id列表获取专辑信息
   * @param idList:Array<int> 专辑id列表
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
      idList.map((id) => {
        if(id !== null && id !== undefined) {
          return app.redis.get('musicAlbumInfo_' + id);
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
        app.redis.expire('musicAlbumInfo_' + id, CACHE_TIME);
      }
      else if(id !== null && id !== undefined) {
        if(!noCacheIdHash[id]) {
          noCacheIdList.push(id);
        }
        noCacheIndexList.push(i);
      }
    });
    if(noCacheIdList.length) {
      let res = await app.model.musicAlbum.findAll({
        attributes: [
          'id',
          'title',
          ['sub_title', 'subTitle'],
          'state',
          'cover',
          'type',
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
        app.redis.setex('musicAlbumInfo_' + id, CACHE_TIME, JSON.stringify(temp));
      });
    }
    let typeIdList = [];
    let typeIdHash = {};
    cache.forEach((item) => {
      if(item && !typeIdHash[item.type]) {
        typeIdHash[item.type] = true;
        typeIdList.push(item.type);
      }
    });
    let typeList = await service.worksType.infoList(typeIdList);
    let typeHash = {};
    typeList.forEach((item) => {
      typeHash[item.id] = item;
    });
    cache.forEach((item) => {
      if(item) {
        item.typeName = typeHash[item.type].name;
      }
    });
    return cache;
  }

  /**
   * 根据专辑id获取小作品集合信息
   * @param id:int 专辑id
   * @param uid:int 用户id
   * @returns Array<Object>
   */
  async collection(id, uid) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'musicAlbumCollection_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      res = JSON.parse(res);
    }
    else {
      res = await app.model.musicAlbumWorkRelation.findAll({
        attributes: [
          ['works_id', 'worksId'],
          ['work_id', 'workId'],
          'kind'
        ],
        where: {
          album_id: id,
          is_delete: false,
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
    let worksIdList = [];
    let worksIdHash = {};
    let workIdList = [];
    res.forEach((item) => {
      switch(item.kind) {
        case 1:
          videoIdList.push(item.workId);
          break;
        case 2:
          audioIdList.push(item.workId);
          break;
      }
      workIdList.push(item.workId);
      if(item.worksId && !worksIdHash[item.worksId]) {
        worksIdList.push(item.worksId);
      }
    });
    let [
      videoList,
      audioList,
      userLikeList,
      userFavorList,
      likeCountList,
      favorCountList,
      worksList
    ] = await Promise.all([
      service.work.videoList(videoIdList),
      service.work.audioList(audioIdList),
      service.work.isLikeList(workIdList, uid),
      service.work.isFavorList(workIdList, uid),
      service.work.likeCountList(workIdList),
      service.work.favorCountList(workIdList),
      service.works.infoList(worksIdList)
    ]);
    let videoHash = {};
    let audioHash = {};
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
    let userLikeHash = {};
    let userFavorHash = {};
    userLikeList.forEach((item, i) => {
      if(item) {
        let id = workIdList[i];
        userLikeHash[id] = item;
      }
    });
    userFavorList.forEach((item, i) => {
      if(item) {
        let id = workIdList[i];
        userFavorHash[id] = item;
      }
    });
    let likeCountHash = {};
    let favorCountHash = {};
    likeCountList.forEach((item, i) => {
      if(item !== null && item !== undefined) {
        let id = workIdList[i];
        likeCountHash[id] = item;
      }
    });
    favorCountList.forEach((item, i) => {
      if(item !== null && item !== undefined) {
        let id = workIdList[i];
        favorCountHash[id] = item;
      }
    });
    let worksHash = {};
    worksList.forEach((item) => {
      worksHash[item.id] = item;
    });
    return res.map((item) => {
      let temp = {
        id: item.workId,
        kind: item.kind,
      };
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
      }
      if(worksHash[item.worksId]) {
        temp.works = worksHash[item.worksId];
      }
      return temp;
    });
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
    let cacheKey = 'musicAlbumAuthor_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
      app.redis.expire(cacheKey, CACHE_TIME);
    }
    else {
      res = await app.model.musicAlbumAuthorRelation.findAll({
        attributes: [
          ['author_id', 'authorId'],
          ['profession_id', 'professionId']
        ],
        where: {
          album_id: id,
          is_delete: false,
        },
        raw: true,
      });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    let authorIdList = [];
    let authorIdHash = {};
    let professionIdList = [];
    let professionIdHash = {};
    res.forEach((item) => {
      let authorId = item.authorId;
      if(!authorIdHash[authorId]) {
        authorIdHash[authorId] = true;
        authorIdList.push(authorId);
      }
      let professionId = item.professionId;
      if(!professionIdHash[professionId]) {
        professionIdHash[professionId] = true;
        professionIdList.push(professionId);
      }
    });
    let [authorList, professionList] = await Promise.all([
      service.author.infoList(authorIdList),
      service.profession.infoList(professionIdList)
    ]);
    let authorHash = {};
    let professionHash = {};
    authorList.forEach((item) => {
      if(item) {
        authorHash[item.id] = item;
      }
    });
    professionList.forEach((item) => {
      if(item) {
        professionHash[item.id] = item;
      }
    });
    res.forEach((item) => {
      let authorInfo = authorHash[item.authorId];
      if(authorInfo) {
        item.headUrl = authorInfo.headUrl;
        item.name = authorInfo.name;
        item.isSettle = authorInfo.isSettle;
      }
      let professionInfo = professionHash[item.professionId];
      if(professionInfo) {
        item.professionName = professionInfo.name;
      }
    });
    return res;
  }

  /**
   * 获取专辑的评论id
   * @param id:int 专辑id
   * @returns int
   */
  async commentId(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'musicAlbumComment_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.worksCommentRelation.findOne({
      attributes: [
        ['comment_id', 'commentId']
      ],
      where: {
        works_id: id,
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
   * 获取评论全部信息
   * @param id:int 作品id
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ data:Array<Object>, count:int }
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
   * 根据专辑id列表获取专辑信息以及职种排序规则
   * @param idList:Array<int> 专辑id列表
   * @returns Object{ info:Object, professionSort:Array<Object> }
   */
  async infoListAndProfessionSort(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [[], []];
    }
    const { service } = this;
    let infoList = await this.infoList(idList);
    let typeList = [];
    let typeHash = {};
    infoList.forEach((item) => {
      if(item && !typeHash[item.type]) {
        typeHash[item.type] = true;
        typeList.push(item.type);
      }
    });
    let list = await service.works.typeListProfessionSort(typeList);
    let professionSortHash = {};
    list.forEach((item, i) => {
      let type = typeList[i];
      professionSortHash[type] = item;
    });
    let professionSortList = infoList.map((item) => {
      return professionSortHash[item.type];
    });
    return [infoList, professionSortList];
  }

  /**
   * 获取专辑信息，包括作者信息
   * @param idList:Array<int> 专辑id列表
   * @returns Array<Object>
   */
  async infoListPlusAuthor(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { service } = this;
    let [[infoList, professionSortList], authorList] = await Promise.all([
      this.infoListAndProfessionSort(idList),
      this.authorList(idList),
    ]);
    authorList.forEach((author, i) => {
      authorList[i] = service.works.reorderAuthor(author, professionSortList[i]);
    });
    infoList.forEach((item, i) => {
      item.author = authorList[i];
    });
    return infoList;
  }

  /**
   * 获取专辑信息和统计数字信息
   * @param idList:Array<int> 专辑id列表
   * @returns Array<Object>
   */
  async infoListPlusCount(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { service } = this;
    let [
      list,
      popularList,
      commentCountList
    ] = await Promise.all([
      this.infoList(idList),
      service.works.numCountList(idList, 1),
      service.works.commentCountList(idList)
    ]);
    list.forEach((item, i) => {
      item.popular = popularList[i];
      item.commentCount = commentCountList[i];
    });
    return list;
  }

  /**
   * 获取专辑id列表的作者列表
   * @param idList:Array<int> 专辑id列表
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
      idList.map((id) => {
        if(id !== null && id !== undefined) {
          return app.redis.get('musicAlbumAuthor_' + id);
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
        app.redis.expire('musicAlbumAuthor_' + id, CACHE_TIME);
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
      let res = await app.model.musicAlbumAuthorRelation.findAll({
        attributes: [
          ['album_id', 'albumId'],
          ['author_id', 'authorId'],
          ['profession_id', 'professionId']
        ],
        where: {
          album_id: noCacheIdList,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.albumId;
          let temp = hash[id] = hash[id] || [];
          temp.push({
            id: item.authorId,
            professionId: item.professionId,
          });
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let item = hash[id] || [];
        if(item) {
          cache[i] = item;
          app.redis.setex('musicAlbumAuthor_' + id, CACHE_TIME, JSON.stringify(item));
        }
      });
    }
    let authorIdList = [];
    let authorIdHash = {};
    let professionIdList = [];
    let professionIdHash = {};
    cache.forEach((list) => {
      list.forEach((item) => {
        let authorId = item.id;
        if(!authorIdHash[authorId]) {
          authorIdHash[authorId] = true;
          authorIdList.push(authorId);
        }
        let professionId = item.professionId;
        if(!professionIdHash[professionId]) {
          professionIdHash[professionId] = true;
          professionIdList.push(professionId);
        }
      });
    });
    let [authorList, professionList] = await Promise.all([
      service.author.infoList(authorIdList),
      service.profession.infoList(professionIdList)
    ]);
    let authorHash = {};
    authorList.forEach((item) => {
      authorHash[item.id] = item;
    });
    let professionHash = {};
    professionList.forEach((item) => {
      professionHash[item.id] = item;
    });
    cache.forEach((list) => {
      list.forEach((item) => {
        let authorInfo = authorHash[item.id];
        if(authorInfo) {
          item.headUrl = authorInfo.headUrl;
          item.name = authorInfo.name;
          item.isSettle = authorInfo.isSettle;
        }
        let professionInfo = professionHash[item.professionId];
        if(professionInfo) {
          item.professionName = professionInfo.name;
        }
      });
    });
    return cache;
  }
}

module.exports = Service;
