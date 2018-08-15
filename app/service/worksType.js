/**
 * Created by army8735 on 2018/4/13.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Service extends egg.Service {
  /**
   * 获取种类信息
   * @param id:int 种类id
   * @returns Object
   */
  async info(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'worksType_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.worksType.findOne({
      attributes: [
        'id',
        'name',
        'status'
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
   * 获取种类信息列表
   * @param idList:Array<int> 种类id列表
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
          return app.redis.get('worksType_' + id);
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
      let res = await app.model.worksType.findAll({
        attributes: [
          'id',
          'name',
          'status'
        ],
        where: {
          id: noCacheIdList,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          hash[item.id] = item;
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || null;
        cache[i] = temp;
        app.redis.setex('worksType_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 获取可约稿的大作品类型
   * @returns Array<Object>
   */
  async allArticleType() {
    const { app } = this;
    let cacheKey = 'allArticle';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.worksType.findAll({
      attributes: [
        'id',
        'name'
      ],
      where: {
        status: true,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 获取worksType下对应的workType
   * @returns Array<Object>
   */
  async includeWorkType(id) {
    const { app, service } = this;
    let cacheKey = 'includeWorkType_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.worksTypeWorkTypeRelation.findAll({
        attributes: [
          ['work_type', 'workType'],
          'upload'
        ],
        where: {
          works_type: id,
        },
        order: [
          'upload'
        ],
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let idList = res.map((item) => {
      return item.workType;
    });
    let workTypeList = await service.workType.infoList(idList);
    return workTypeList.map((item, i) => {
      if(item) {
        item.upload = res[i].upload;
      }
      return item;
    }).filter((item) => {
      return item;
    });
  }

  /**
   * 获取对应状态的list
   * status: int
   */
  async status(n) {
    const { app } = this;
    let cacheKey = 'worksTypeStatus_' + n;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.worksType.findAll({
        attributes: [
          'id'
        ],
        where: {
          status: n,
        },
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let idList = res.map((item) => {
      return item.id;
    });
    return this.infoList(idList);
  }

  /**
   * 根据大作品类型列表获取小作品类型列表
   * @param idList:Array<int>
   * @returns Array<Array<Object>>
   */
  async workTypeList(idList) {
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
          return app.redis.get('worksTypeWorkTypeList_' + id);
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
      let res = await app.model.worksTypeWorkTypeRelation.findAll({
        attributes: [
          ['works_type', 'worksType'],
          ['work_type', 'workType'],
          'upload'
        ],
        where: {
          works_type: noCacheIdList,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let temp = hash[item.worksType] = hash[item.worksType] || [];
          temp.push(item);
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || [];
        cache[i] = temp;
        app.redis.setex('worksTypeWorkTypeList_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }
}

module.exports = Service;
