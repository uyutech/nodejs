/**
 * Created by army8735 on 2018/4/5.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

class Service extends egg.Service {
  async banner(tag) {
    if(!tag) {
      return;
    }
    const { app } = this;
    let cacheKey = 'findBanner_' + tag;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.findBanner.findAll({
      attributes: [
        'title',
        'url',
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
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
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
    }
    else {
      res = await app.model.findList.findAll({
        attributes: [
          'type',
          'cover',
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
      app.redis.setex(cacheKey, app.config.redis.mediumTime, JSON.stringify(res));
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
        case 6:
          item.content = item.content.trim();
      }
    });
    let [
      worksList,
      musicAlbumList,
      imageAlbumList,
      authorList
    ] = await Promise.all([
      service.works.infoListPlusAllAuthor(worksIdList),
      service.musicAlbum.infoListPlusAllAuthor(musicAlbumIdList),
      service.imageAlbum.infoListPlusAllAuthor(imageAlbumIdList),
      service.author.infoListPlusFans(authorIdList)
    ]);
    let worksHash = {};
    worksList.forEach((item) => {
      if(item) {
        worksHash[item.id] = item;
        item.author = service.works.firstAuthor(item.author);
      }
    });
    let musicAlbumHash = {};
    musicAlbumList.forEach((item) => {
      if(item) {
        musicAlbumHash[item.id] = item;
        item.author = service.works.firstAuthor(item.author);
      }
    });
    let imageAlbumHash = {};
    imageAlbumList.forEach((item) => {
      if(item) {
        imageAlbumHash[item.id] = item;
        item.author = service.works.firstAuthor(item.author);
      }
    });
    let authorHash = {};
    authorList.forEach((item)=> {
      if(item) {
        authorHash[item.id] = item;
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
      return JSON.parse(res);
    }
    res = await app.model.findList.findOne({
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
    app.redis.setex(cacheKey, app.config.redis.mediumTime, JSON.stringify(res));
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
      res = JSON.parse(res);
    }
    else if(kind === 3) {
      res = await app.model.imageAlbumWorkRelation.findAll({
        attributes: [
          ['album_id', 'albumId'],
          ['work_id', 'workId']
        ],
        where: {
          kind,
          is_delete: false,
        },
        order: [
          ['id', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.mediumTime, JSON.stringify(res));
    }
    else {
      res = await app.model.worksWorkRelation.findAll({
        attributes: [
          ['works_id', 'worksId'],
          ['work_id', 'workId']
        ],
        where: {
          kind,
          is_works_delete: false,
          is_work_delete: false,
          works_review: 3,
          work_review: 3,
        },
        order: [
          ['id', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.mediumTime, JSON.stringify(res));
    }
    let worksIdList = [];
    let worksIdHash = {};
    let albumIdList = [];
    let albumIdHash = {};
    let workIdList = [];
    let workIdHash = {};
    res.forEach((item) => {
      if(!worksIdHash[item.worksId]) {
        worksIdList.push(item.worksId);
      }
      if(!albumIdHash[item.albumId]) {
        albumIdList.push(item.albumId);
      }
      if(!workIdHash[item.workId]) {
        workIdList.push(item.workId);
      }
    });
    let [worksList, albumList, workList] = await Promise.all([
      service.works.infoListPlusCount(worksIdList),
      service.imageAlbum.infoListPlusCount(albumIdList),
      service.work.infoListPlusFull(workIdList, kind, uid)
    ]);
    let worksHash = {};
    worksList.forEach((item) => {
      if(item) {
        worksHash[item.id] = item;
      }
    });
    let albumHash = {};
    albumList.forEach((item) => {
      if(item) {
        albumHash[item.id] = item;
      }
    });
    return workList.map((item, i) => {
      if(item) {
        item.author = service.works.firstAuthor(item.author);
        if(kind === 3) {
          let album = albumHash[albumIdList[i]];
          if(album) {
            let copy = Object.assign({}, album);
            copy.work = item;
            return copy;
          }
        }
        else {
          let works = worksHash[worksIdList[i]];
          if(works) {
            let copy = Object.assign({}, works);
            copy.work = item;
            return copy;
          }
        }
      }
    });
  }

  async kindCount(kind) {
    if(!kind) {
      return;
    }
    const { app } = this;
    let cacheKey = 'findKindCount_' + kind;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    if(kind === 3) {
      res = await app.model.imageAlbumWorkRelation.findOne({
        attributes: [
          [Sequelize.fn('COUNT', '*'), 'num']
        ],
        where: {
          kind,
          is_delete: false,
        },
        raw: true,
      });
    }
    else {
      res = await app.model.worksWorkRelation.findOne({
        attributes: [
          [Sequelize.fn('COUNT', '*'), 'num']
        ],
        where: {
          kind,
          is_works_delete: false,
          is_work_delete: false,
          works_review: 3,
          work_review: 3,
        },
        raw: true,
      });
    }
    if(res) {
      res = res.num || 0;
    }
    else {
      res = 0;
    }
    app.redis.setex(cacheKey, app.config.redis.mediumTime, JSON.stringify(res));
    return res;
  }
}

module.exports = Service;
