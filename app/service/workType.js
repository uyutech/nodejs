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
    let cacheKey = 'workType_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.workType.findOne({
      attributes: [
        'id',
        'name'
      ],
      where: {
        id,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.longTime, JSON.stringify(res));
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
          return app.redis.get('workType_' + id);
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
      let res = await app.model.workType.findAll({
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
          hash[item.id] = item;
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || null;
        cache[i] = temp;
        app.redis.setex('workType_' + id, app.config.redis.longTime, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 获取小作品类型对应的职种列表
   * @param id:Array<int> 种类id
   * @returns Array<Object>
   */
  async profession(id) {
    const { app, service } = this;
    let cacheKey = 'workTypeProfession_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.workTypeProfessionRelation.findAll({
        attributes: [
          ['work_type', 'workType'],
          'show',
          'required',
          ['profession_id', 'professionId']
        ],
        where: {
          work_type: id,
        },
        order: [
          ['weight', 'DESC']
        ],
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let idList= res.map((item) => {
      return item.professionId;
    });
    let professionList = await service.profession.infoList(idList);
    return professionList.map((item, i) => {
      if(item) {
        item.show = res[i].show;
        item.required = res[i].required;
      }
      return item;
    }).filter((item) => {
      return item;
    });
  }

  /**
   * 获取小作品类型列表对应的职种列表
   * @param idList:Array<int> 种类id列表
   * @returns Array<Array<Object>>
   */
  async professionList(idList) {
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
          return app.redis.get('workTypeProfession_' + id);
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
      let res = await app.model.workTypeProfessionRelation.findAll({
        attributes: [
          ['work_type', 'workType'],
          'show',
          'required',
          ['profession_id', 'professionId']
        ],
        where: {
          work_type: noCacheIdList,
        },
        order: [
          ['weight', 'DESC']
        ],
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let temp = hash[item.workType] = hash[item.workType] || [];
          temp.push(item);
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || [];
        cache[i] = temp;
        app.redis.setex('workTypeProfession_' + id, app.config.redis.longTime, JSON.stringify(temp));
      });
    }
    let professionIdHash = {};
    let professionIdList = [];
    cache.forEach((item) => {
      item.forEach((rel) => {
        if(!professionIdHash[rel.professionId]) {
          professionIdHash[rel.professionId] = true;
          professionIdList.push(rel.professionId);
        }
      });
    });
    let professionList = await service.profession.infoList(professionIdList);
    let professionHash = {};
    professionList.forEach((item) => {
      professionHash[item.id] = item;
    });
    return cache.map((item) => {
      let list = [];
      item.forEach((rel, i) => {
        let profession = professionHash[rel.professionId];
        if(profession) {
          profession.show = rel.show;
          profession.required = rel.required;
          list.push(profession);
        }
      });
      return list;
    });
  }
}

module.exports = Service;
