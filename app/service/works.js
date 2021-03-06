/**
 * Created by army8735 on 2018/3/19.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

class Service extends egg.Service {
  /**
   * 根据作品id获取作品信息
   * @param id:int 作品id
   * @returns Object
   */
  async info(id) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'worksInfo_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.works.findOne({
        attributes: [
          'id',
          'title',
          ['sub_title', 'subTitle'],
          'state',
          'cover',
          'type',
          'describe',
          ['is_authorize', 'isAuthorize'],
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
   * 根据作品id列表获取作品信息列表
   * @param idList:Array<int> 作品id列表
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
          return app.redis.get('worksInfo_' + id);
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
      let res = await app.model.works.findAll({
        attributes: [
          'id',
          'title',
          ['sub_title', 'subTitle'],
          'state',
          'cover',
          'type',
          'describe',
          ['is_authorize', 'isAuthorize'],
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
        app.redis.setex('worksInfo_' + id, app.config.redis.time, JSON.stringify(temp));
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
   * 根据大作品id获取小作品集合基本信息
   * @param id:int 大作品id
   * @returns Array<Object>
   */
  async collectionBase(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'worksCollectionBase_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.worksWorkRelation.findAll({
      attributes: [
        ['work_id', 'workId'],
        'kind',
        'tag',
      ],
      where: {
        works_id: id,
        is_work_delete: false,
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
   * 根据大作品id列表获取小作品集合基本信息
   * @param idList:Array<int> 大作品id列表
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
          return app.redis.get('worksCollectionBase_' + id);
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
      let res = await app.model.worksWorkRelation.findAll({
        attributes: [
          ['works_id', 'worksId'],
          ['work_id', 'workId'],
          'kind',
          'tag',
        ],
        where: {
          works_id: noCacheIdList,
          is_work_delete: false,
        },
        order: [
          ['weight', 'DESC'],
          'kind'
        ],
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.worksId;
          delete item.worksId;
          let temp = hash[id] = hash[id] || [];
          temp.push(item);
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || [];
        cache[i] = temp;
        app.redis.setex('worksCollectionBase_' + id, app.config.redis.time, JSON.stringify(temp));
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
    let workIdList = [];
    let videoIdList = [];
    let audioIdList = [];
    let imageIdList = [];
    let textIdList = [];
    res.forEach((item) => {
      workIdList.push(item.workId);
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
      videoList,
      audioList,
      imageList,
      textList,
      workRelationList
    ] = await Promise.all([
      service.work.infoListPlusFull(videoIdList, 1, uid),
      service.work.infoListPlusFull(audioIdList, 2, uid),
      service.work.infoListPlusFull(imageIdList, 3, uid),
      service.work.infoListPlusFull(textIdList, 4, uid),
      service.work.relationList(workIdList)
    ]);
    let hash = {};
    videoList.forEach((item) => {
      if(item) {
        if(showFirstAuthor) {
          item.author = this.firstAuthor(item.author);
        }
        hash[item.id] = item;
      }
    });
    audioList.forEach((item) => {
      if(item) {
        if(showFirstAuthor) {
          item.author = this.firstAuthor(item.author);
        }
        hash[item.id] = item;
      }
    });
    imageList.forEach((item) => {
      if(item) {
        if(showFirstAuthor) {
          item.author = this.firstAuthor(item.author);
        }
        hash[item.id] = item;
      }
    });
    textList.forEach((item) => {
      if(item) {
        if(showFirstAuthor) {
          item.author = this.firstAuthor(item.author);
        }
        hash[item.id] = item;
      }
    });
    workRelationList.forEach((item, i) => {
      let id = workIdList[i];
      let work = hash[id];
      if(work) {
        work.relation = item;
      }
    });
    return res.map((item) => {
      let temp = hash[item.workId];
      if(item) {
        temp.tag = item.tag;
      }
      return temp;
    });
  }

  /**
   * 根据大作品id列表获取小作品集合信息列表
   * @param idList:Array<int> 大作品id列表
   * @param uid:int 用户id
   * @param showFirstAuthor:bool 是否只显示第一行作者
   * @returns Array<Array<Object>>
   */
  async collectionListFull(idList, uid, showFirstAuthor) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { service } = this;
    let res = await this.collectionListBase(idList);
    let workIdList = [];
    let videoIdList = [];
    let audioIdList = [];
    let imageIdList = [];
    let textIdList = [];
    res.forEach((arr) => {
      (arr || []).forEach((item) => {
        workIdList.push(item.workId);
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
    });
    let [
      videoList,
      audioList,
      imageList,
      textList,
      workRelationList
    ] = await Promise.all([
      service.work.infoListPlusFull(videoIdList, 1, uid),
      service.work.infoListPlusFull(audioIdList, 2, uid),
      service.work.infoListPlusFull(imageIdList, 3, uid),
      service.work.infoListPlusFull(textIdList, 4, uid),
      service.work.relationList(workIdList)
    ]);
    let hash = {};
    videoList.forEach((item) => {
      if(item) {
        if(showFirstAuthor) {
          item.author = this.firstAuthor(item.author);
        }
        hash[item.id] = item;
      }
    });
    audioList.forEach((item) => {
      if(item) {
        if(showFirstAuthor) {
          item.author = this.firstAuthor(item.author);
        }
        hash[item.id] = item;
      }
    });
    imageList.forEach((item) => {
      if(item) {
        if(showFirstAuthor) {
          item.author = this.firstAuthor(item.author);
        }
        hash[item.id] = item;
      }
    });
    textList.forEach((item) => {
      if(item) {
        if(showFirstAuthor) {
          item.author = this.firstAuthor(item.author);
        }
        hash[item.id] = item;
      }
    });
    workRelationList.forEach((item, i) => {
      let id = workIdList[i];
      let work = hash[id];
      if(work) {
        work.relation = item;
      }
    });
    return res.map((arr) => {
      return arr.map((item) => {
        let temp = hash[item.workId];
        if(item) {
          temp.tag = item.tag;
        }
        return temp;
      });
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
      if(item) {
        return item.workId;
      }
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
   * 获取大作品下小作品列表包含统计数字
   * @param id:int 大作品id
   * @param uid:int 用户id
   * @returns Array<Object>
   */
  async collectionCount(id, uid) {
    if(!id) {
      return;
    }
    const { service } = this;
    let res = await this.collectionBase(id);
    let videoIdList = [];
    let audioIdList = [];
    let imageIdList = [];
    let textIdList = [];
    res.forEach((item) => {
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
      videoList,
      audioList,
      imageList,
      textList
    ] = await Promise.all([
      service.work.infoListPlusCount(videoIdList, 1, uid),
      service.work.infoListPlusCount(audioIdList, 2, uid),
      service.work.infoListPlusCount(imageIdList, 3, uid),
      service.work.infoListPlusCount(textIdList, 4, uid)
    ]);
    let hash = {};
    videoList.forEach((item) => {
      if(item) {
        hash[item.id] = item;
      }
    });
    audioList.forEach((item) => {
      if(item) {
        hash[item.id] = item;
      }
    });
    imageList.forEach((item) => {
      if(item) {
        hash[item.id] = item;
      }
    });
    textList.forEach((item) => {
      if(item) {
        hash[item.id] = item;
      }
    });
    return res.map((item) => {
      return hash[item.workId];
    });
  }

  /**
   * 获取大作品列表下小作品列表包含统计数字
   * @param idList:int 大作品id列表
   * @param uid:int 用户id
   * @returns Array<Array<Object>>
   */
  async collectionListCount(idList, uid) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { service } = this;
    let res = await this.collectionListBase(idList);
    let videoIdList = [];
    let audioIdList = [];
    let imageIdList = [];
    let textIdList = [];
    let hash = {};
    res.forEach((list) => {
      (list || []).forEach((item) => {
        if(!hash[item.workId]) {
          hash[item.workId] = true;
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
        }
      });
    });
    let [
      videoList,
      audioList,
      imageList,
      textList
    ] = await Promise.all([
      service.work.infoListPlusCount(videoIdList, 1, uid),
      service.work.infoListPlusCount(audioIdList, 2, uid),
      service.work.infoListPlusCount(imageIdList, 3, uid),
      service.work.infoListPlusCount(textIdList, 4, uid)
    ]);
    hash = {};
    videoList.forEach((item) => {
      if(item) {
        hash[item.id] = item;
      }
    });
    audioList.forEach((item) => {
      if(item) {
        hash[item.id] = item;
      }
    });
    imageList.forEach((item) => {
      if(item) {
        hash[item.id] = item;
      }
    });
    textList.forEach((item) => {
      if(item) {
        hash[item.id] = item;
      }
    });
    return res.map((list) => {
      return (list || []).map((item) => {
        return hash[item.workId];
      });
    });
  }

  /**
   * 获取作品的评论id
   * @param id:int 作品id
   * @returns int
   */
  async commentId(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'worksComment_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
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
      app.redis.setex(cacheKey, app.config.redis.mediumTime, JSON.stringify(res));
    }
    else {
      return;
    }
    return res;
  }

  /**
   * 获取大作品列表评论id列表
   * @param idList:Array<int> 大作品id列表
   * @returns Array<int>
   */
  async commentIdList(idList) {
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
          return app.redis.get('worksComment_' + id);
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
      let res = await app.model.worksCommentRelation.findAll({
        attributes: [
          ['works_id', 'worksId'],
          ['comment_id', 'commentId']
        ],
        where: {
          works_id: noCacheIdList,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.worksId;
          hash[id] = item.commentId;
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || null;
        cache[i] = temp;
        app.redis.setex('worksComment_' + id, app.config.redis.mediumTime, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 获取大作品对应言论的标签
   * id:int 大作品id
   * @returns Array<Object>
   */
  async tag(id) {
    if(!id) {
      return;
    }
    const { service } = this;
    let commentId = await this.commentId(id);
    if(!commentId) {
      return [];
    }
    let tagId = await service.comment.tagId(commentId, 1);
    return await service.tag.infoList(tagId);
  }

  /**
   * 获取大作品列表对应言论的标签
   * @param idList:Array<int> 大作品id列表
   * @returns Array<Array<Object>>
   */
  async tagList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { service } = this;
    let commentIdList = await this.commentIdList(idList);
    let tagId = await service.comment.tagIdList(commentIdList, 1);
    let tagIdList = [];
    let tagIdHash = {};
    tagId.forEach((list) => {
      if(list) {
        list.forEach((id) => {
          if(!tagIdHash[id]) {
            tagIdHash[id] = true;
            tagIdList.push(id);
          }
        });
      }
    });
    let tagList = await service.tag.infoList(tagIdList);
    let tagHash = {};
    tagList.forEach((item) => {
      tagHash[item.id] = item;
    });
    return tagId.map((list) => {
      if(list) {
        let temp = [];
        list.forEach((id) => {
          if(tagHash[id]) {
            temp.push(tagHash[id]);
          }
        });
        return temp;
      }
    });
  }

  /**
   * 获取大作品对应言论的圈子
   * id:int 大作品id
   * @returns Array<Object>
   */
  async circle(id) {
    if(!id) {
      return;
    }
    const { service } = this;
    let commentId = await this.commentId(id);
    if(!commentId) {
      return [];
    }
    return await service.comment.circle(commentId);
  }

  /**
   * 获取大作品列表对应言论的圈子
   * @param idList:Array<int> 大作品id列表
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
    let commentIdList = await this.commentIdList(idList);
    return service.comment.circleList(commentIdList);
  }

  /**
   * 获取大作品评论数量
   * @param id:int 大作品id
   * @returns int
   */
  async commentCount(id) {
    if(!id) {
      return;
    }
    const { service } = this;
    let commentId = await this.commentId(id);
    return await service.post.commentCount(commentId);
  }

  /**
   * 获取大作品列表评论数量
   * @param idList:int 大作品id
   * @returns Array<int>
   */
  async commentCountList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { service } = this;
    let commentIdList = await this.commentIdList(idList);
    return await service.post.commentCountList(commentIdList);
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
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { service } = this;
    let commentId = await this.commentId(id);
    return await service.post.commentList(commentId, uid, offset, limit);
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
    let cacheKey = 'worksAuthor_' + id;
    if(type) {
      cacheKey += '_' + type;
    }
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      let where = {
        works_id: id,
      };
      if(type) {
        where.type = type;
      }
      res = await app.model.worksAuthorRelation.findAll({
        attributes: [
          ['author_id', 'id'],
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
    res.forEach((item) => {
      if(item) {
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
      }
    });
    return res;
  }

  /**
   * 获取作品id列表的作者列表
   * @param idList:Array<int> 作品id列表
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
          let cacheKey = 'worksAuthor_' + id;
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
        works_id: noCacheIdList,
      };
      if(type) {
        where.type = type;
      }
      let res = await app.model.worksAuthorRelation.findAll({
        attributes: [
          ['works_id', 'worksId'],
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
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.worksId;
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
        let cacheKey = 'worksAuthor_' + id;
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
        if(item) {
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
        }
      });
    });
    return cache;
  }

  /**
   * 根据作品类型获取职种排序规则
   * @param type:int 作品类型
   * @returns Array<Object>
   */
  async typeProfessionSort(type) {
    if(!type) {
      return;
    }
    const { app } = this;
    let cacheKey = 'worksTypeProfessionSort_' + type;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.worksTypeProfessionSort.findAll({
      attributes: [
        ['profession_id', 'professionId'],
        'group',
        'weight'
      ],
      where: {
        works_type: type,
      },
      order: [
        'group',
        ['weight', 'DESC']
      ],
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 根据作品类型列表获取职种排序规则列表
   * @param typeList:int 作品类型列表
   * @returns Array<Array<Object>>
   */
  async typeListProfessionSort(typeList) {
    if(!typeList) {
      return;
    }
    if(!typeList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      typeList.map((type) => {
        return app.redis.get('worksTypeProfessionSort_' + type);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let type = typeList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        }
      else if(type !== null && type !== undefined) {
        if(!noCacheIdHash[type]) {
          noCacheIdHash[type] = true;
          noCacheIdList.push(type);
        }
        noCacheIndexList.push(i);
      }
    });
    if(noCacheIdList.length) {
      let res = await app.model.worksTypeProfessionSort.findAll({
        attributes: [
          ['works_type', 'worksType'],
          'group',
          'weight',
          ['profession_id', 'professionId']
        ],
        where: {
          works_type: noCacheIdList,
        },
        order: [
          'group',
          ['weight', 'DESC']
        ],
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let temp = hash[item.worksType] = hash[item.worksType] || [];
          temp.push({
            group: item.group,
            professionId: item.professionId,
          });
        });
      }
      noCacheIndexList.forEach((i) => {
        let type = typeList[i];
        let temp = hash[type] || [];
        cache[i] = temp;
        app.redis.setex('worksTypeProfessionSort_' + type, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 根据作品id获取作品信息以及职种排序规则
   * @param id:int 作品id
   * @returns Object{ info:Object, professionSort:Array<Object> }
   */
  async infoAndProfessionSort(id) {
    if(!id) {
      return [];
    }
    let info = await this.info(id);
    if(!info) {
      return [];
    }
    let professionSort = await this.typeProfessionSort(info.type);
    return [info, professionSort];
  }

  /**
   * 根据作品id列表获取作品信息以及职种排序规则
   * @param idList:Array<int> 作品id列表
   * @returns Object{ info:Object, professionSort:Array<Object> }
   */
  async infoListAndProfessionSort(idList) {
    if(!idList) {
      return [];
    }
    if(!idList.length) {
      return [[], []];
    }
    let infoList = await this.infoList(idList);
    let typeList = [];
    let typeHash = {};
    infoList.forEach((item) => {
      if(item && !typeHash[item.type]) {
        typeHash[item.type] = true;
        typeList.push(item.type);
      }
    });
    let list = await this.typeListProfessionSort(typeList);
    let professionSortHash = {};
    list.forEach((item, i) => {
      let type = typeList[i];
      professionSortHash[type] = item;
    });
    let professionSortList = infoList.map((item) => {
      if(item) {
        return professionSortHash[item.type];
      }
    });
    return [infoList, professionSortList];
  }

  /**
   * 根据规则排序作者显示
   * @param list:Array<Object> 作者列表
   * @param rule:Array 规则列表
   * @returns Array<Array<Object>>
   */
  reorderAuthor(list, rule) {
    list = list || [];
    rule = rule || [];
    let res = [];
    // 先去重
    let exist = {};
    for(let i = 0; i < list.length; i++) {
      let item = list[i];
      let key = item.id + '_' + item.professionId;
      if(exist[key]) {
        list.splice(i, 1);
        i--;
      }
      exist[key] = true;
    }
    // 相同职业合并，并存成hash
    let hash = {};
    list.forEach((item) => {
      hash[item.professionId] = hash[item.professionId] || [];
      hash[item.professionId].push(item);
    });
    // 遍历规则，如遇到则将对应职业的作者们存入
    let lastGroup = -1;
    let last;
    rule.forEach((item) => {
      let authors = hash[item.professionId];
      if(authors) {
        if(lastGroup !== item.group) {
          lastGroup = item.group;
          last = [];
          res.push(last);
        }
        let first = authors[0];
        last.push({
          id: first.professionId,
          name: first.professionName,
          list: authors.map((author) => {
            return {
              id: author.id,
              name: author.name,
              headUrl: author.headUrl,
              isSettle: author.isSettle,
              tag: author.tag,
              type: author.type,
            };
          }),
        });
        delete hash[item.professionId];
      }
    });
    // 没有对应规则的剩余的存入末尾
    let temp = [];
    Object.keys(hash).forEach((key) => {
      let authors = hash[key];
      let first = authors[0];
      temp.push({
        id: first.professionId,
        name: first.professionName,
        list: authors.map((author) => {
          return {
            id: author.id,
            name: author.name,
            headUrl: author.headUrl,
            isSettle: author.isSettle,
            tag: author.tag,
            type: author.type,
          };
        }),
      });
    });
    if(temp.length) {
      res.push(temp);
    }
    return res;
  }

  /**
   * 根据全部作者取出优先作者
   * 优先显示入住的，没有入住的话查找后面的组顺延
   * 同种类作者有一个入住即全部显示
   * @param author:Array<Array<Object>>
   */
  firstAuthor(author) {
    if(!author) {
      return;
    }
    if(!author.length) {
      return [];
    }
    let res = [];
    for(let i = 0, len = author.length; i < len; i++) {
      let group = author[i];
      for(let j = 0, len2 = group.length; j < len2; j++) {
        let item = group[j];
        for(let k = 0, len3 = item.list.length; k < len3; k++) {
          if(item.list[k].isSettle) {
            res.push(item);
            break;
          }
        }
      }
      if(res.length) {
        break;
      }
    }
    return res;
  }

  /**
   * 获取大作品信息和作者信息
   * @param id:int 大作品id
   * @returns Object
   */
  async infoPlusAuthor(id) {
    if(!id) {
      return;
    }
    let [
      [info, professionSort],
      author
    ] = await Promise.all([
      this.infoAndProfessionSort(id),
      this.author(id, 1)
    ]);
    if(!info) {
      return;
    }
    info.author = this.reorderAuthor(author, professionSort);
    return info;
  }

  /**
   * 获取大作品信息和作者信息列表
   * @param idList:int 大作品id列表
   * @returns Array<Object>
   */
  async infoListPlusAuthor(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    let [
      [infoList, professionSortList],
      authorList
    ] = await Promise.all([
      this.infoListAndProfessionSort(idList),
      this.authorList(idList, 1)
    ]);
    infoList.forEach((item, i) => {
      if(item) {
        item.author = this.reorderAuthor(authorList[i], professionSortList[i]);
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
    let [
      [info, professionSort],
      author
    ] = await Promise.all([
      this.infoAndProfessionSort(id),
      this.author(id)
    ]);
    if(!info) {
      return;
    }
    info.author = this.reorderAuthor(author, professionSort);
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
    let [
      [infoList, professionSortList],
      authorList
    ] = await Promise.all([
      this.infoListAndProfessionSort(idList),
      this.authorList(idList)
    ]);
    infoList.forEach((item, i) => {
      if(item) {
        item.author = this.reorderAuthor(authorList[i], professionSortList[i]);
      }
    });
    return infoList;
  }

  /**
   * 获取大作品信息和统计数字信息
   * @param id:int 大作品id列表
   * @returns Object
   */
  async infoPlusCount(id) {
    if(!id) {
      return;
    }
    let [
      info,
      popular,
      commentCount
    ] = await Promise.all([
      this.info(id),
      this.numCount(id, 1),
      this.commentCount(id)
    ]);
    if(info) {
      info.popular = popular;
      info.commentCount = commentCount;
    }
    return info;
  }

  /**
   * 获取大作品信息和统计数字信息列表
   * @param idList:Array<int> 大作品id列表
   * @returns Array<Object>
   */
  async infoListPlusCount(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    let [
      list,
      popularList,
      commentCountList
    ] = await Promise.all([
      this.infoList(idList),
      this.numCountList(idList, 1),
      this.commentCountList(idList)
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
    let [
      info,
      popular,
      commentCount
    ] = await Promise.all([
      this.infoPlusAllAuthor(id),
      this.numCount(id, 1),
      this.commentCount(id)
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
    let [
      list,
      popularList,
      commentCountList
    ] = await Promise.all([
      this.infoListPlusAllAuthor(idList),
      this.numCountList(idList, 1),
      this.commentCountList(idList)
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
   * 获取类似名字的作品
   * @param name:String 名字
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{data: Array<Object>, count: int}
   */
  async listByName(name, offset, limit) {
    if(!name) {
      return;
    }
    let [idList, count] = await Promise.all([
      this.idListByName(name, offset, limit),
      this.countByName(name)
    ]);
    let data = await this.infoList(idList);
    return {
      data,
      count,
    };
  }

  async idListByName(name, offset, limit) {
    if(!name) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'worksIdListByName_' + name;
    let res;
    if(offset === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        res = JSON.parse(res);
      }
    }
    if(!res) {
      res = await app.model.works.findAll({
        attributes: [
          'id'
        ],
        where: {
          title: {
            $like: '%' + name + '%',
          },
          is_delete: false,
        },
        offset,
        limit,
        raw: true,
      });
      res = res.map((item) => {
        return item.id;
      });
      if(offset === 0) {
        app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
      }
    }
    return res;
  }

  async countByName(name) {
    if(!name) {
      return;
    }
    const { app } = this;
    let cacheKey = 'worksCountByName_' + name;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.works.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        title: {
          $like: '%' + name + '%',
        },
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
   * 获取统计数字
   * @param id:int 作品id
   * @param type:int 类型
   * @returns int
   */
  async numCount(id, type) {
    if(!id || !type) {
      return;
    }
    const { app } = this;
    let cacheKey = 'worksNumCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.worksNum.findOne({
      attributes: [
        'num'
      ],
      where: {
        works_id: id,
        type,
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
   * 获取统计数字列表
   * @param idList:Array<int> 作品id列表
   * @param type:int 类型
   * @returns Array<int>
   */
  async numCountList(idList, type) {
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
          return app.redis.get('worksNumCount_' + id + '_' + type);
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
      let res = await app.model.worksNum.findAll({
        attributes: [
          ['works_id', 'worksId'],
          'num'
        ],
        where: {
          works_id: noCacheIdList,
          type,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.worksId;
          hash[id] = item.num;
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || 0;
        cache[i] = temp;
        app.redis.setex('worksNumCount_' + id + '_' + type, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 检查此大作品下是否有小作品
   * @param id:int 大作品id
   * @param workId:int 小作品id
   */
  async checkWork(id, workId) {
    if(!id || !workId) {
      return;
    }
    let collectionBase = await this.collectionBase(id);
    if(collectionBase) {
      for (let i = 0; i < collectionBase.length; i++) {
        if(collectionBase[i].workId === workId) {
          return true;
        }
      }
    }
  }

  /**
   * 修改作品
   * @param id:int 作品id
   * @param attributes:Object 作品属性
   */
  async update(id, attributes) {
    if(!id) {
      return {
        success: false,
      };
    }
    if(!attributes) {
      return {
        success: false,
      };
    }
    const { app } = this;
    let attr = {};
    let hash = {
      title: 'title',
      subTitle: 'sub_title',
      describe: 'describe',
      type: 'type',
      cover: 'cover',
      isAuthorize: 'is_authorize',
      state: 'state',
    };
    Object.keys(attributes).forEach((key) => {
      if(hash[key]) {
        attr[hash[key]] = attributes[key];
      }
    });
    attr.update_time = new Date();
    await app.model.works.update(attr, {
      where: {
        id,
      },
    });
    return {
      success: true,
    };
  }

  /**
   * 删除作品
   * @param id:int 作品id
   */
  async delete(id) {
    if(!id) {
      return {
        success: false,
      };
    }
    const { app } = this;
    let now = new Date();
    let query = [
      app.model.worksWorkRelation.update({
        is_works_delete: true,
        update_time: now,
      }, {
        where: {
          works_id: id,
          is_works_delete: false,
        },
      }),
      app.model.works.update({
        is_delete: true,
        update_time: now,
      }, {
        where: {
          id,
          is_delete: false,
        },
      })
    ];
    await Promise.all(query);
    return {
      success: true,
    };
  }

  /**
   * 恢复删除作品
   * @param id:int 作品id
   */
  async unDelete(id) {
    if(!id) {
      return {
        success: false,
      };
    }
    const { app } = this;
    let now = new Date();
    let query = [
      app.model.worksWorkRelation.update({
        is_works_delete: false,
        update_time: now,
      }, {
        where: {
          works_id: id,
          is_works_delete: true,
        },
      }),
      app.model.works.update({
        is_delete: false,
        update_time: now,
      }, {
        where: {
          id,
          is_delete: true,
        },
      })
    ];
    await Promise.all(query);
    return {
      success: true,
    };
  }

  /**
   * 添加作者
   * @param id:int 作品id
   * @param authorList:Array<Object> 作者
   */
  async addAuthor(id, authorList) {
    if(!id || !authorList) {
      return {
        success: false,
      };
    }
    const { app } = this;
    if(!Array.isArray(authorList)) {
      authorList = [authorList];
    }
    let transaction = await app.sequelizeCircling.transaction();
    let query = authorList.map((item) => {
      return app.model.worksAuthorRelation.create({
        works_id: id,
        author_id: item.id,
        profession_id: item.professionId,
        type: item.type,
        tag: item.tag,
      }, {
        transaction,
        raw: true,
      });
    });
    try {
      await Promise.all(query);
      await transaction.commit();
      return {
        success: true,
      };
    }
    catch(e) {
      await transaction.rollback();
      return {
        success: false,
        message: e.toString(),
      };
    }
  }

  /**
   * 删除作者
   * @param id:int 作品id
   * @param authorList:Array<Object> 作者
   */
  async removeAuthor(id, authorList) {
    if(!id || !authorList) {
      return {
        success: false,
      };
    }
    const { app } = this;
    if(!Array.isArray(authorList)) {
      authorList = [authorList];
    }
    let transaction = await app.sequelizeCircling.transaction();
    let query = authorList.map((item) => {
      return app.model.worksAuthorRelation.destroy({
        where: {
          works_id: id,
          author_id: item.id,
          profession_id: item.professionId,
        },
        transaction,
      });
    });
    try {
      await Promise.all(query);
      await transaction.commit();
      return {
        success: true,
      };
    }
    catch(e) {
      await transaction.rollback();
      return {
        success: false,
        message: e.toString(),
      };
    }
  }

  /**
   * 获取最新的大作品列表
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{ count:int, data: Array<Object> }
   */
  async newest(uid, offset, limit) {
    let [data, count] = await Promise.all([
      this.newestData(uid, offset, limit),
      this.newestCount()
    ]);
    return { data, count };
  }

  async newestData(uid, offset, limit) {
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'worksNewest_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.works.findAll({
        attributes: [
          'id'
        ],
        where: {
          is_delete: false,
          state: 1,
        },
        order: [
          ['id', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      res = res.map((item) => {
        return item.id;
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let [works, collection] = await Promise.all([
      this.infoListPlusFull(res),
      this.collectionListFull(res, uid, true)
    ]);
    works.forEach((item, i) => {
      if(item) {
        item.collection = collection[i];
      }
    });
    return works;
  }

  async newestCount() {
    const { app } = this;
    let cacheKey = 'newestCount';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.works.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
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
   * 获取最热的大作品列表
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{ count:int, data: Array<Object> }
   */
  async hottest(uid, offset, limit) {
    let [data, count] = await Promise.all([
      this.hottestData(uid, offset, limit),
      this.hottestCount()
    ]);
    return { data, count };
  }

  async hottestData(uid, offset, limit) {
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'worksHottest_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.worksNum.findAll({
        attributes: [
          ['works_id', 'worksId']
        ],
        order: [
          ['num', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      res = res.map((item) => {
        return item.worksId;
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let [works, collection] = await Promise.all([
      this.infoListPlusFull(res),
      this.collectionListFull(res, uid, true)
    ]);
    works.forEach((item, i) => {
      if(item) {
        // item.author = service.works.firstAuthor(item.author);
        item.collection = collection[i];
      }
    });
    return works;
  }

  async hottestCount() {
    const { app } = this;
    let cacheKey = 'hottestCount';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.worksNum.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
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
}

module.exports = Service;
