/**
 * Created by army8735 on 2018/3/30.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

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
          ['is_delete', 'isDelete']
        ],
        where: {
          id,
        },
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
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
          ['is_delete', 'isDelete']
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
        app.redis.setex('musicAlbumInfo_' + id, app.config.redis.time, JSON.stringify(temp));
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
      if(item) {
        typeHash[item.id] = item;
      }
    });
    cache.forEach((item) => {
      if(item) {
        item.typeName = typeHash[item.type].name;
      }
    });
    return cache;
  }

  /**
   * 根据专辑id获取小作品集合基本信息
   * @param id:int 专辑id
   * @returns Array<Object>
   */
  async collectionBase(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'musicAlbumCollectionBase_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
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
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 根据专辑id列表获取小作品集合基本信息
   * @param idList:Array<int> 专辑id列表
   * @returns Array<Array<Object>>
   */
  async collectionListBase(idList) {
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
          return app.redis.get('musicAlbumCollectionBase_' + id);
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
      let res = await app.model.musicAlbumWorkRelation.findAll({
        attributes: [
          ['album_id', 'albumId'],
          ['works_id', 'worksId'],
          ['work_id', 'workId'],
          'kind'
        ],
        where: {
          album_id: noCacheIdList,
          is_delete: false,
        },
        order: [
          ['weight', 'DESC'],
          'kind'
        ],
        raw: true,
      });
      let hash = {};
      res.forEach((item) => {
        let id = item.albumId;
        delete item.albumId;
        let temp = hash[id] = hash[id] || [];
        temp.push(item);
      });
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || [];
        cache[i] = temp;
        app.redis.setex('musicAlbumCollectionBase_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 根据大作品id获取小作品集合信息
   * @param id:int 大作品id
   * @param uid:int 用户id
   * @param showFirstAuthor:bool 是否只显示第一行作者
   * @returns Array<Object>
   */
  async collectionFull(id, uid, showFirstAuthor) {
    if(!id) {
      return;
    }
    const { service } = this;
    let res = await this.collectionBase(id);
    let videoIdList = [];
    let audioIdList = [];
    let imageIdList = [];
    let textIdList = [];
    let worksIdList = [];
    let worksIdHash = {};
    res.forEach((item) => {
      if(!worksIdHash[item.worksId]) {
        worksIdHash[item.worksId] = true;
        worksIdList.push(item.worksId);
      }
      switch(item.kind) {
        case 1:
          videoIdList.push(item.workId);
          break;
        case 2:
          audioIdList.push(item.workId);
          break;
        case 3:
          imageIdList.push(item.workId);
          break;
        case 4:
          textIdList.push(item.workId);
          break;
      }
    });
    let [
      worksList,
      videoList,
      audioList,
      imageList,
      textList,
    ] = await Promise.all([
      service.works.infoListPlusCount(worksIdList),
      service.work.infoListPlusFull(videoIdList, 1, uid),
      service.work.infoListPlusFull(audioIdList, 2, uid),
      service.work.infoListPlusFull(imageIdList, 3, uid),
      service.work.infoListPlusFull(textIdList, 4, uid)
    ]);
    let worksHash = {};
    worksList.forEach((item) => {
      if(item) {
        worksHash[item.id] = item;
      }
    });
    let hash = {};
    videoList.forEach((item) => {
      if(item) {
        if(showFirstAuthor) {
          item.author = service.works.firstAuthor(item.author);
        }
        hash[item.id] = item;
      }
    });
    audioList.forEach((item) => {
      if(item) {
        if(showFirstAuthor) {
          item.author = service.works.firstAuthor(item.author);
        }
        hash[item.id] = item;
      }
    });
    imageList.forEach((item) => {
      if(item) {
        if(showFirstAuthor) {
          item.author = service.works.firstAuthor(item.author);
        }
        hash[item.id] = item;
      }
    });
    textList.forEach((item) => {
      if(item) {
        if(showFirstAuthor) {
          item.author = service.works.firstAuthor(item.author);
        }
        hash[item.id] = item;
      }
    });
    return res.map((item) => {
      let worksId = item.worksId;
      let copy = Object.assign({}, worksHash[worksId] || {});
      let work = hash[item.workId];
      copy.work = work;
      return copy;
    });
  }

  /**
   * 根据大作品id获取小作品集合作者信息
   * @param id:int 大作品id列表
   * @returns Array<Object>
   */
  async collectionAuthor(id) {
    if(!id) {
      return;
    }
    const { service } = this;
    let res = await this.collectionBase(id);
    let idList = res.map((item) => {
      return item.workId;
    });
    return await service.work.authorList(idList);
  }

  /**
   * 根据大作品id列表获取小作品集合作者信息
   * @param idList:int 大作品id列表
   * @returns Array<Array<Object>>
   */
  async collectionListAuthor(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { service } = this;
    let res = await this.collectionListBase(idList);
    let workIdList = [];
    let workIdHash = {};
    res.forEach((arr) => {
      arr.forEach((item) => {
        if(!workIdHash[item.workId]) {
          workIdHash[item.workId] = true;
          workIdList.push(item.workId);
        }
      });
    });
    let authorList = await service.work.authorList(workIdList);
    let hash = {};
    workIdList.forEach((item, i) => {
      hash[item] = authorList[i];
    });
    return res.map((arr) => {
      return arr.map((item) => {
        return hash[item.workId];
      });
    });
  }

  /**
   * 获取作品作者列表
   * @param id:int 作品id
   * @param type:int 类型
   * @returns Array<Object>
   */
  async author(id, type) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'musicAlbumAuthor_' + id;
    if(type) {
      cacheKey += '_' + type;
    }
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      let where ={
        album_id: id,
      };
      if(type) {
        where.type = type;
      }
      res = await app.model.musicAlbumAuthorRelation.findAll({
        attributes: [
          ['author_id', 'authorId'],
          ['profession_id', 'professionId'],
          'tag',
          'type'
        ],
        where,
        order: [
          'type'
        ],
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
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
   * @param type:int 类型
   * @returns Array:<Array<Object>>
   */
  async authorList(idList, type) {
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
          let cacheKey = 'musicAlbumAuthor_' + id;
          if(type) {
            cacheKey += '_' + type;
          }
          return app.redis.get(cacheKey);
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
      let where = {
        album_id: noCacheIdList,
      };
      if(type) {
        where.type = type;
      }
      let res = await app.model.musicAlbumAuthorRelation.findAll({
        attributes: [
          ['album_id', 'albumId'],
          ['author_id', 'authorId'],
          ['profession_id', 'professionId'],
          'type',
          'tag'
        ],
        where,
        order: [
          'type'
        ],
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
            tag: item.tag,
            type: item.type,
          });
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let item = hash[id] || [];
        cache[i] = item;
        let cacheKey = 'musicAlbumAuthor_' + id;
        if(type) {
          cacheKey += '_' + type;
        }
        app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(item));
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
      if(item) {
        authorHash[item.id] = item;
      }
    });
    let professionHash = {};
    professionList.forEach((item) => {
      if(item) {
        professionHash[item.id] = item;
      }
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
    let commentId = await service.works.commentId(id);
    return await service.post.commentList(commentId, uid, offset, limit);
  }

  /**
   * 根据作品id获取作品信息以及职种排序规则
   * @param id:int 作品id
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
      this.author(id, 1),
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
      this.authorList(idList, 1),
    ]);
    infoList.forEach((item, i) => {
      if(item) {
        item.author = service.works.reorderAuthor(authorList[i], professionSortList[i]);
      }
    });
    return infoList;
  }

  /**
   * 获取大作品信息和全部作者信息
   * @param id:int 大作品id
   * @returns Object
   */
  async infoPlusAllAuthor(id) {
    if(!id) {
      return;
    }
    const { service } = this;
    let [
      [info, professionSort],
      author
    ] = await Promise.all([
      this.infoAndProfessionSort(id),
      this.author(id)
    ]);
    info.author = service.works.reorderAuthor(author, professionSort);
    return info;
  }

  /**
   * 获取大作品信息和全部作者信息
   * @param idList:Array<int> 大作品id列表
   * @returns Array<Object>
   */
  async infoListPlusAllAuthor(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { service } = this;
    let [
      [infoList, professionSortList],
      authorList
    ] = await Promise.all([
      this.infoListAndProfessionSort(idList),
      this.authorList(idList)
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
   * @param id:int 专辑id列表
   * @returns Object
   */
  async infoPlusCount(id) {
    if(!id) {
      return;
    }
    const { service } = this;
    let [
      info,
      popular,
      commentCount
    ] = await Promise.all([
      this.info(id),
      service.works.numCount(id, 1),
      service.works.commentCount(id)
    ]);
    if(info) {
      info.popular = popular;
      info.commentCount = commentCount;
    }
    return info;
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
      if(item) {
        item.popular = popularList[i];
        item.commentCount = commentCountList[i];
      }
    });
    return list;
  }

  /**
   * 获取大作品信息、统计数字和全部作者信息
   * @param id:int 大作品id列表
   * @returns Object
   */
  async infoPlusFull(id) {
    if(!id) {
      return;
    }
    const { service } = this;
    let [
      info,
      popular,
      commentCount
    ] = await Promise.all([
      this.infoPlusAllAuthor(id),
      service.works.numCount(id, 1),
      service.works.commentCount(id)
    ]);
    if(info) {
      info.popular = popular;
      info.commentCount = commentCount;
    }
    return info;
  }

  /**
   * 获取大作品信息、统计数字和全部作者信息列表
   * @param idList:Array<int> 大作品id列表
   * @returns Array<Object>
   */
  async infoListPlusFull(idList) {
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
      this.infoListPlusAllAuthor(idList),
      service.works.numCountList(idList, 1),
      service.works.commentCountList(idList)
    ]);
    list.forEach((item, i) => {
      if(item) {
        item.popular = popularList[i];
        item.commentCount = commentCountList[i];
      }
    });
    return list;
  }
}

module.exports = Service;
