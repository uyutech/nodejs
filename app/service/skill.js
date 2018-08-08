/**
 * Created by army8735 on 2018/4/19.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Service extends egg.Service {
  /**
   * 获取技能信息
   * @param id:int 技能id
   * @returns Object
   */
  async info(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'skill_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.skill.findOne({
      attributes: [
        'id',
        'name',
        'code'
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
   * 获取技能信息列表
   * @param idList:Array<int> 技能id列表
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
          return app.redis.get('skill_' + id);
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
      let res = await app.model.skill.findAll({
        attributes: [
          'id',
          'name',
          'code'
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
        let temp = hash[id] || [];
        cache[i] = temp;
        app.redis.setex('skill_' + id, app.config.redis.longTime, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 获取技能所对应的职种列表
   * @param id:int 技能id
   * @returns Array<int>
   */
  async profession(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'skillProfession_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.professionSkillRelation.findAll({
      attributes: [
        ['profession_id', 'professionId'],
        ['skill_id', 'skillId'],
        'point'
      ],
      where: {
        skill_id: id,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.longTime, JSON.stringify(res));
    return res;
  }

  /**
   * 获取技能列表所对应的职种列表
   * @param idList:Array<int> 技能id
   * @returns Array<Array<int>>
   */
  async professionList(idList) {
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
          return app.redis.get('skillProfession_' + id);
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
      let res = await app.model.professionSkillRelation.findAll({
        attributes: [
          ['profession_id', 'professionId'],
          ['skill_id', 'skillId'],
          'point'
        ],
        where: {
          skill_id: noCacheIdList,
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
        let temp = hash[id] || [];
        cache[i] = temp;
        app.redis.setex('skillProfession_' + id, app.config.redis.longTime, JSON.stringify(temp));
      });
    }
    return cache;
  }

  async allSkills() {
    const { app } = this;
    let cacheKey = 'allSkills';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.skill.findAll({
      attributes: [
        'id',
        'name',
        'code'
      ],
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.longTime, JSON.stringify(res));
    return res;
  }
}

module.exports = Service;
