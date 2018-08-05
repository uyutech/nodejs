/**
 * Created by army8735 on 2018/4/9.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

class Service extends egg.Service {
  /**
   * 获取标签信息
   * @param id:int 标签id
   * @returns Object
   */
  async info(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'tag_' + id;
    let res = await this.app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.tag.findOne({
      attributes: [
        'id',
        'name'
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
   * 获取标签列表信息
   * @param idList:Array<int> 标签id列表
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
        return app.redis.get('tag_' + id);
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
      let res = await app.model.tag.findAll({
        attributes: [
          'id',
          'name'
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
        app.redis.setex('tag_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 根据名字获取标签列表信息
   * @param nameList:Array<int> 标签名字列表
   * @returns Array<Object>
   */
  async infoListByName(nameList) {
    if(!nameList) {
      return;
    }
    if(!nameList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      nameList.map((name) => {
        return app.redis.get('tagName_' + name);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let name = nameList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        }
      else if(name) {
        if(!noCacheIdHash[name]) {
          noCacheIdHash[name] = true;
          noCacheIdList.push(name);
        }
        noCacheIndexList.push(i);
      }
    });
    if(noCacheIdList.length) {
      let res = await app.model.tag.findAll({
        attributes: [
          'id',
          'name'
        ],
        where: {
          name: noCacheIdList,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let name = item.name;
          hash[name] = item;
        });
      }
      noCacheIndexList.forEach((i) => {
        let name = nameList[i];
        let temp = hash[name] || null;
        cache[i] = temp;
        app.redis.setex('tagName_' + name, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 根据名字获取id
   * @param name:String tag名
   * @returns int
   */
  async idByName(name) {
    if(!name) {
      return;
    }
    const { app } = this;
    let cacheKey = 'tagNameId_' + name;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.tag.findOne({
      attributes: [
        'id'
      ],
      where: {
        name,
      },
      raw: true,
    });
    if(res) {
      res = res.id;
    }
    else {
      res = app.model.tag.create({
        name,
      }, {
        raw: true,
      });
      res = res.id;
    }
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 根据名字列表获取id列表
   * @param nameList:String tag名列表
   * @param create:boolean 空是否创建
   * @returns Array<int>
   */
  async idListByName(nameList, create) {
    if(!nameList) {
      return;
    }
    if(!nameList.length) {
      return [];
    }
    const { app, ctx } = this;
    let cache = await Promise.all(
      nameList.map((item) => {
        if(item) {
          return app.redis.get('tagNameId_' + item.toLowerCase());
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let name = nameList[i];
      if(item) {
        cache[i] = JSON.parse(item);
      }
      else if(name) {
        name = name.toLowerCase();
        if(!noCacheIdHash[name]) {
          noCacheIdHash[name] = true;
          noCacheIdList.push(name);
        }
        noCacheIndexList.push(i);
      }
    });
    if(noCacheIdList.length) {
      let res = await app.model.tag.findAll({
        attributes: [
          'id',
          'name'
        ],
        where: {
          name: noCacheIdList,
        },
        raw: true,
      });
      let hash = {};
      let createList = [];
      res.forEach((item) => {
        let name = item.name.toLowerCase();
        hash[name] = item.id;
      });
      noCacheIndexList.forEach((i) => {
        let name = nameList[i].toLowerCase();
        let item = hash[name];
        if(item) {
          cache[i] = item;
          app.redis.setex('tagNameId_' + name, app.config.redis.time, JSON.stringify(item));
        }
        else if(name) {
          createList.push(app.model.tag.create({
            name,
          }, {
            raw: true,
          }));
        }
      });
      if(create && createList.length) {
        let temp = await Promise.all(createList);
        temp.forEach((item) => {
          hash[item.name] = item.id;
        });
      }
      noCacheIndexList.forEach((i) => {
        if(!cache[i]) {
          let name = nameList[i].toLowerCase();
          let item = hash[name];
          if(item) {
            cache[i] = item;
            app.redis.setex('tagNameId_' + name, app.config.redis.time, JSON.stringify(item));
          }
        }
      });
    }
    return cache;
  }

  /**
   * 获取标签id下的画圈
   * @param id:int 标签id
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ count:int, data:Array<Object> }
   */
  async postList(id, uid, offset, limit) {
    if(!id) {
      return;
    }
    let [data, count] = await Promise.all([
      this.postData(id, uid, offset, limit),
      this.postCount(id)
    ]);
    return { data, count };
  }

  /**
   * 获取标签id下画圈数据
   * @param id:int 标签id
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async postData(id, uid, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let res = await app.model.tagCommentRelation.findAll({
      attributes: [
        ['comment_id', 'commentId']
      ],
      where: {
        tag_id: id,
        is_comment_delete: false,
      },
      order: [
        ['id', 'DESC']
      ],
      offset,
      limit,
      raw: true,
    });
    let commentIdList = res.map((item) => {
      return item.commentId;
    });
    return await service.post.infoList(commentIdList, uid);
  }

  /**
   * 获取标签id下画圈数量
   * @param id:int 标签id
   * @returns int
   */
  async postCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'tagCommentCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.tagCommentRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        tag_id: id,
        is_comment_delete: false,
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
   * 获取类似名字的标签
   * @param name:String 名字
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{data: Array<Object>, count: int}
   */
  async listByName(name, offset, limit) {
    if(!name) {
      return;
    }
    let [data, count] = await Promise.all([
      this.listByNameDetail(name, offset, limit),
      this.countByName(name)
    ]);
    return {
      data,
      count,
    };
  }

  async listByNameDetail(name, offset, limit) {
    if(!name) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'tagListByName_' + name;
    let res;
    if(offset === 0) {
      res = await app.redis.get(cacheKey);
      if(res) {
        res = JSON.parse(res);
      }
    }
    if(!res) {
      res = await app.model.tag.findAll({
        attributes: [
          'id',
          'name'
        ],
        where: {
          name: {
            $like: '%' + name + '%',
          },
          is_delete: false,
        },
        offset,
        limit,
        raw: true,
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
    let cacheKey = 'tagCountByName_' + name;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.tag.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        name: {
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
   * 获取标签对应的圈子id
   * @param id:int 标签id
   * @param type:int 类型，不传为所有
   * @returns Array<int>
   */
  async circleId(id, type) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'tagCircle_' + id;
    if(type) {
      cacheKey += '_' + type
    }
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    let where = {
      tag_id: id,
      is_delete: false,
    };
    if(type) {
      where.type = type;
    }
    res = await app.model.circleTagRelation.findAll({
      attributes: [
        ['circle_id', 'circleId']
      ],
      where,
      raw: true,
    });
    res = res.map((item) => {
      return item.tagId;
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 获取标签列表对应的圈子id列表
   * @param idList:Array<int> 标签id列表
   * @param type:int 类型，不传为所有
   * @returns Array<Array<int>>
   */
  async circleIdList(idList, type) {
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
          let cacheKey = 'tagCircle_' + id;
          if(type) {
            cacheKey += '_' + type
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
        tag_id: noCacheIdList,
        is_delete: false,
      };
      if(type) {
        where.type = type;
      }
      let res = await app.model.circleTagRelation.findAll({
        attributes: [
          ['circle_id', 'circleId'],
          ['tag_id', 'tagId']
        ],
        where,
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.tagId;
          let temp = hash[id] = hash[id] || [];
          temp.push(item.circleId);
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let item = hash[id] || [];
        cache[i] = item;
        let cacheKey = 'tagCircle_' + id;
        if(type) {
          cacheKey += '_' + type;
        }
        app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(item));
      });
    }
    return cache;
  }

  /**
   * 获取标签对应的圈子id列表
   * @param name:String 标签名
   * @param type:int 类型，不传为所有
   * @returns Array<int>
   */
  async circleIdByName(name, type) {
    if(!name) {
      return;
    }
    let id = await this.idByName(name);
    return await this.circle(id, type);
  }

  /**
   * 获取标签列表对应的圈子id列表
   * @param nameList:Array<String> 标签名
   * @param type:int 类型，不传为所有
   * @returns Array<int>
   */
  async circleIdListByName(nameList, type) {
    if(!nameList) {
      return;
    }
    if(!nameList.length) {
      return [];
    }
    let idList = await this.idListByName(nameList);
    return await this.circleIdList(idList, type);
  }

  /**
   * 获取全部话题
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Object{ count:int, data:Array<Object> }
   */
  async all(offset, limit) {
    let [data, count] = await Promise.all([
      this.allData(offset, limit),
      this.allCount()
    ]);
    return { data, count };
  }

  async allData(offset, limit) {
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'allTag_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.tag.findAll({
      attributes: [
        'id',
        'name'
      ],
      where: {
        is_delete: false,
      },
      order: [
        ['create_time', 'DESC']
      ],
      offset,
      limit,
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  async allCount() {
    const { app } = this;
    let cacheKey = 'allTagCount';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.author.findOne({
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
}

module.exports = Service;
