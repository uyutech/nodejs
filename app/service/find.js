/**
 * Created by army8735 on 2018/4/5.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

const CACHE_TIME = 10;

class Service extends egg.Service {
  async banner(tag) {
    if(!tag) {
      return;
    }
    const { app } = this;
    let cacheKey = 'recommendBanner_' + tag;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.recommendBanner.findAll({
      attributes: [
        'title',
        'pic',
        ['target_id', 'targetId'],
        'type'
      ],
      where: {
        tag,
        is_delete: false,
      },
      order: [
        ['weight', 'DESC']
      ],
      raw: true,
    });
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  async list(tag, offset, limit) {
    if(!tag) {
      return;
    }
    let [data, count] = await Promise.all([
      this.listData(tag, offset, limit),
      this.listCount(tag)
    ]);
    return { data, count };
  }

  async listData(tag, offset, limit) {
    if(!tag) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'find_' + tag + '_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
      app.redis.expire(cacheKey, CACHE_TIME);
    }
    else {
      res = await app.model.recommend.findAll({
        attributes: [
          'type',
          'title',
          'content',
          'describe'
        ],
        where: {
          tag,
          is_delete: false,
        },
        order: [
          ['weight', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    let worksIdList = [];
    let worksIdHash = {};
    let authorIdList = [];
    let authorIdHash = {};
    let musicAlbumIdList = [];
    let musicAlbumIdHash = {};
    let imageAlbumIdList = [];
    let imageAlbumIdHash = {};
    res.forEach((item) => {
      switch(item.type) {
        case 1:
          item.content = item.content.trim();
          if(!worksIdHash[item.content]) {
            worksIdHash[item.content] = true;
            worksIdList.push(item.content);
          }
          break;
        case 2:
          item.content = item.content.trim();
          if(!musicAlbumIdHash[item.content]) {
            musicAlbumIdHash[item.content] = true;
            musicAlbumIdList.push(item.content);
          }
          break;
        case 3:
          item.content = item.content.trim();
          if(!imageAlbumIdHash[item.content]) {
            imageAlbumIdHash[item.content] = true;
            imageAlbumIdList.push(item.content);
          }
          break;
        case 4:
          item.content = item.content.trim().split(',');
          item.content.forEach((item) => {
            if(!authorIdHash[item.trim()]) {
              authorIdHash[item.trim()] = true;
              authorIdList.push(item.trim());
            }
          });
          break;
        case 5:
          item.content = item.content.trim().split(',');
          item.content.forEach((item) => {
            if(!worksIdHash[item.trim()]) {
              worksIdHash[item.trim()] = true;
              worksIdList.push(item.trim());
            }
          });
          break;
      }
    });
    let [
      [worksList, worksAuthorList],
      [musicAlbumList, musicAlbumAuthorList],
      [imageAlbumList, imageAlbumAuthorList],
      authorList,
      fansCountList
    ] = await Promise.all([
      service.works.infoListPlus(worksIdList),
      service.musicAlbum.infoListPlus(musicAlbumIdList),
      service.imageAlbum.infoListPlus(imageAlbumIdList),
      service.author.infoList(authorIdList),
      service.author.fansCountList(authorIdList)
    ]);
    let worksHash = {};
    worksList.forEach((item, i) => {
      if(item) {
        worksHash[item.id] = item;
        item.author = service.works.firstAuthor(worksAuthorList[i]);
      }
    });
    let authorHash = {};
    authorList.forEach((item, i)=> {
      if(item) {
        authorHash[item.id] = item;
        item.fansCount = fansCountList[i];
      }
    });
    let musicAlbumHash = {};
    musicAlbumList.forEach((item, i) => {
      if(item) {
        musicAlbumHash[item.id] = item;
        item.author = musicAlbumAuthorList[i][0];
      }
    });
    let imageAlbumHash = {};
    imageAlbumList.forEach((item, i) => {
      if(item) {
        imageAlbumHash[item.id] = item;
        item.author = imageAlbumAuthorList[i][0];
      }
    });
    res.forEach((item) => {
      switch(item.type) {
        case 1:
          item.content = worksHash[item.content];
          break;
        case 2:
          item.content = musicAlbumHash[item.content];
          break;
        case 3:
          item.content = imageAlbumHash[item.content];
          break;
        case 4:
          item.content = item.content.map((item) => {
            return authorHash[item];
          }).filter((item) => {
            return item;
          });
          break;
        case 5:
          item.content = item.content.map((item) => {
            return worksHash[item];
          }).filter((item) => {
            return item;
          });
          break;
      }
    });
    return res;
  }
  async listCount(tag) {
    if(!tag) {
      return;
    }
    const { app } = this;
    let cacheKey = 'findCount_' + tag;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.recommend.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        tag,
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
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 根据kind类型获取推荐列表
   * @param kind:int 类型
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{ count:int, data:Array<Object> }
   */
  async kindList(kind, uid, offset, limit) {
    if(!kind) {
      return;
    }
    let [data, count] = await Promise.all([
      this.kindData(kind, uid, offset, limit),
      this.kindCount(kind)
    ]);
    return { data, count };
  }

  async kindData(kind, uid, offset, limit) {
    if(!kind) {
      return;
    }
    kind = parseInt(kind) || 1;
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'findKind_' + kind + '_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      res = JSON.parse(res);
    }
    else {
      res = await app.model.recommendList.findAll({
        attributes: [
          ['works_id', 'worksId'],
          ['work_id', 'workId']
        ],
        where: {
          kind,
          is_delete: false,
        },
        order: [
          ['weight', 'DESC'],
          ['id', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    }
    let worksIdList = [];
    let worksIdHash = {};
    let workIdList = [];
    let workIdHash = {};
    res.forEach((item) => {
      if(!worksIdHash[item.worksId]) {
        worksIdList.push(item.worksId);
      }
      if(!workIdHash[item.workId]) {
        workIdList.push(item.workId);
      }
    });
    if(kind === 1) {
      let [
        worksList,
        [workList, authorList],
        likeCountList,
        isLikeList,
        commentCountList
      ] = await Promise.all([
        service.works.infoList(worksIdList),
        service.work.infoListPlus(workIdList, kind),
        service.work.likeCountList(workIdList),
        service.work.isLikeList(workIdList, uid),
        service.works.commentCountList(worksIdList)
      ]);
      let worksHash = {};
      worksList.forEach((item, i) => {
        if(item) {
          item.commentCount = commentCountList[i];
          worksHash[item.id] = item;
        }
      });
      workList.forEach((item, i) => {
        if(item) {
          item.likeCount = likeCountList[i] || 0;
          item.isLike = isLikeList[i] || false;
          item.author = service.works.firstAuthor(authorList[i]);
        }
      });
      return res.map((item, i) => {
        let works = worksHash[item.worksId];
        if(works) {
          let copy = Object.assign({}, works);
          let work = workList[i];
          if(work) {
            copy.work = work;
          }
          return copy;
        }
      });
    }
    else if(kind === 2) {
      let [worksList, [workList, authorList]] = await Promise.all([
        service.works.infoList(worksIdList),
        service.work.infoListPlus(workIdList, kind)
      ]);
      let worksHash = {};
      worksList.forEach((item) => {
        worksHash[item.id] = item;
      });
      return res.map((item, i) => {
        let works = worksHash[item.worksId];
        if(works) {
          let copy = Object.assign({}, works);
          let work = workList[i];
          work.author = service.works.firstAuthor(authorList[i]);
          if(work) {
            copy.work = work;
          }
          return copy;
        }
      });
    }
    else if(kind === 3) {
      let [
        workList,
        authorList,
        likeCountList,
        isLikeList
      ] = await Promise.all([
        service.work.imageList(workIdList),
        service.work.authorList(workIdList),
        service.work.likeCountList(workIdList),
        service.work.isLikeList(workIdList, uid)
      ]);
      workList.forEach((item, i) => {
        if(item) {
          item.likeCount = likeCountList[i] || 0;
          item.isLike = isLikeList[i] || false;
          item.author = authorList[i];
        }
      });
      return workList;
    }
  }

  async kindCount(kind) {
    if(!kind) {
      return;
    }
    const { app } = this;
    let cacheKey = 'findKindCount_' + kind;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.recommendList.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        kind,
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
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }
}

module.exports = Service;
