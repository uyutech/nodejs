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
      let res = await app.model.imageAlbum.findOne({
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
    let imageIdList = res.map((item) => {
      return item.workId;
    });
    let [imageList, isLikeList, likeCountList, authorList] = await Promise.all([
      service.work.imageList(imageIdList),
      service.work.isLikeList(imageIdList, uid),
      service.work.likeCountList(imageIdList),
      service.work.authorList(imageIdList)
    ]);
    imageList.forEach((item, i) => {
      item.isLike = isLikeList[i];
      item.likeCount = likeCountList[i];
      item.author = authorList[i];
    });
    return imageList;
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
}

module.exports = Service;
