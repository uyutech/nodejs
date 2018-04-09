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
    const { app } = this;
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
      let sql = squel.select()
        .from('image_album')
        .from('works_type')
        .field('image_album.id')
        .field('image_album.title')
        .field('image_album.sub_title', 'subTitle')
        .field('image_album.state')
        .field('image_album.cover')
        .field('image_album.type')
        .field('works_type.name', 'typeName')
        .where('image_album.id IN ?', noCacheIdList)
        .where('image_album.type=works_type.id')
        .toString();
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach((item) => {
          let id = item.id;
          hash[id] = item;
        });
        noCacheIndexList.forEach((i) => {
          let id = idList[i];
          let temp = hash[id] || null;
          cache[i] = temp;
          app.redis.setex('imageAlbumInfo_' + id, CACHE_TIME, JSON.stringify(temp));
        });
      }
    }
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
    let cacheKey = 'imageAlbumAuthors_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
      app.redis.expire(cacheKey, CACHE_TIME);
    }
    else {
      let sql = squel.select()
        .from('image_album_author_profession_relation')
        .from('profession')
        .field('image_album_author_profession_relation.album_id', 'albumId')
        .field('image_album_author_profession_relation.work_id', 'workId')
        .field('image_album_author_profession_relation.author_id', 'authorId')
        .field('image_album_author_profession_relation.profession_id', 'professionId')
        .field('profession.name', 'professionName')
        .where('image_album_author_profession_relation.album_id=?', id)
        .where('image_album_author_profession_relation.is_delete=false')
        .where('image_album_author_profession_relation.profession_id=profession.id')
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
      idList.map((id) => {
        return app.redis.get('imageAlbumAuthors_' + id);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
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
        .from('image_album_author_profession_relation')
        .from('profession')
        .field('image_album_author_profession_relation.album_id', 'albumId')
        .field('image_album_author_profession_relation.work_id', 'workId')
        .field('image_album_author_profession_relation.author_id', 'authorId')
        .field('image_album_author_profession_relation.profession_id', 'professionId')
        .field('profession.name', 'professionName')
        .where('image_album_author_profession_relation.album_id IN ?', noCacheIdList)
        .where('image_album_author_profession_relation.is_delete=false')
        .where('image_album_author_profession_relation.profession_id=profession.id')
        .toString();
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let worksId = item.worksId;
          let temp = hash[worksId] = hash[worksId] || [];
          temp.push(item);
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || null;
        cache[i] = temp;
        app.redis.setex('imageAlbumAuthors_' + id, CACHE_TIME, JSON.stringify(temp));
      });
    }
    let authorIdList = [];
    let authorIdHash = {};
    cache.forEach((list) => {
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
      cache.forEach((list) => {
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
}

module.exports = Service;
