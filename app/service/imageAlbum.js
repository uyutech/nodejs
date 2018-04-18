/**
 * Created by army8735 on 2018/4/4.
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
    let cacheKey = 'imageAlbumInfo_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      res = JSON.parse(res);
    }
    else {
      res = await app.model.imageAlbum.findOne({
        attributes: [
          'id',
          'title',
          ['sub_title', 'subTitle'],
          'state',
          'cover',
          'type'
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
          return app.redis.get('imageAlbumInfo_' + id);
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
        app.redis.expire('imageAlbumInfo_' + id, CACHE_TIME);
      }
      else if(id !== null && id !== undefined) {
        if(!noCacheIdHash[id]) {
          noCacheIdList.push(id);
        }
        noCacheIndexList.push(i);
      }
    });
    if(noCacheIdList.length) {
      let res = await app.model.imageAlbum.findAll({
        attributes: [
          'id',
          'title',
          ['sub_title', 'subTitle'],
          'state',
          'cover',
          'type'
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
        app.redis.setex('imageAlbumInfo_' + id, CACHE_TIME, JSON.stringify(temp));
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
   * 获取作品作者列表
   * @param id:int 作品id
   * @returns Array<Object>
   */
  async author(id) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'imageAlbumAuthor_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
      app.redis.expire(cacheKey, CACHE_TIME);
    }
    else {
      res = await app.model.imageAlbumAuthorRelation.findAll({
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
          return app.redis.get('imageAlbumAuthor_' + id);
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
        app.redis.expire('imageAlbumAuthor_' + id, CACHE_TIME);
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
      let res = await app.model.imageAlbumAuthorRelation.findAll({
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
          app.redis.setex('imageAlbumAuthor_' + id, CACHE_TIME, JSON.stringify(item));
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
    let cacheKey = 'imageAlbumComment_' + id;
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
   * 获取图片列表数据
   * @param id:int 相册id
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Array<Object>
   */
  async imageList(id, uid, offset, limit) {
    if(!id) {
      return;
    }
    let [data, count] = await Promise.all([
      this.imageData(id, uid, offset, limit),
      this.imageCount(id)
    ]);
    return { data, count };
  }

  /**
   * 获取图片列表数据
   * @param id:int 相册id
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Array<Object>
   */
  async imageData(id, uid, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let res = await app.model.imageAlbumWorkRelation.findAll({
      attributes: [
        ['works_id', 'worksId'],
        ['work_id', 'workId']
      ],
      where: {
        album_id: id,
        kind: 3,
        is_delete: false,
      },
      order: [
        ['weight', 'DESC']
      ],
      offset,
      limit,
      raw: true,
    });
    let worksIdList = [];
    let workIdList = [];
    res.forEach((item) => {
      worksIdList.push(item.worksId);
      workIdList.push(item.workId);
    });
    let workList = await service.work.infoListPlusFull(workIdList, 3, uid);
    return workList.map((item, i) => {
      let copy = {
        id: worksIdList[i],
      };
      copy.work = item;
      return copy;
    });
  }

  /**
   * 获取图片数量
   * @param id:int 相册id
   * @returns int
   */
  async imageCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'imageAlbumCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.imageAlbumWorkRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        album_id: id,
        kind: 3,
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
    app.redis.setex(cacheKey, CACHE_TIME, res);
    return res;
  }

  /**
   * 根据作品id获取作品信息以及职种排序规则
   * @param id:int 专辑id
   * @returns Object{ info:Object, professionSort:Array<Object> }
   */
  async infoAndProfessionSort(id) {
    if(!id) {
      return;
    }
    const { service } = this;
    let info = await this.info(id);
    let professionSort = await service.works.typeProfessionSort(info.type);
    return [info, professionSort];
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
   * @param id:int 专辑id
   * @returns Array<Object>
   */
  async infoPlusAuthor(id) {
    if(!id) {
      return;
    }
    const { service } = this;
    let [[info, professionSort], author] = await Promise.all([
      this.infoAndProfessionSort(id),
      this.author(id),
    ]);
    author = service.works.reorderAuthor(author, professionSort);
    info.author = author;
    return info;
  }

  /**
   * 获取专辑信息，包括作者信息
   * @param idList:Array<int> 专辑id列表
   * @returns Array<Object>
   */
  async infoListPlusAuthor(albumIdList) {
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
    infoList.forEach((item, i) => {
      if(item) {
        item.author = service.works.reorderAuthor(authorList[i], professionSortList[i]);
      }
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
}

module.exports = Service;
