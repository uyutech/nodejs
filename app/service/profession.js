/**
 * Created by army8735 on 2018/3/30.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Service extends egg.Service {
  /**
   * 获取职种信息
   * @param id:int 职种id
   * @returns Object
   */
  async info(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'profession_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.profession.findOne({
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
   * 获取职种信息列表
   * @param idList:Array<int> 职种id列表
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
          return app.redis.get('profession_' + id);
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
      let res = await app.model.profession.findAll({
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
        let temp = hash[id] || [];
        cache[i] = temp;
        app.redis.setex('profession_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  async skill(id) {}

  /**
   * 获取职种列表所对应的技能列表
   * @param idList:Array<int> 职种id
   * @returns Array<Array<int>>
   */
  async skillList(idList) {
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
          return app.redis.get('professionSkill_' + id);
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
          profession_id: noCacheIdList,
        },
        raw: true,
      });
      let hash = {};
      res.forEach((item) => {
        let temp = hash[item.professionId] = hash[item.professionId] || [];
        temp.push({
          skillId: item.skillId,
          point: item.point,
        });
      });
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || [];
        cache[i] = temp;
        app.redis.setex('professionSkill_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    let skillIdList = [];
    let skillIdHash = {};
    cache.forEach((item) => {
      item.forEach((rel) => {
        if(!skillIdHash[rel.skillId]) {
          skillIdHash[rel.skillId] = true;
          skillIdList.push(rel.skillId);
        }
      });
    });
    let skillList = await service.skill.infoList(skillIdList);
    let skillHash = {};
    skillList.forEach((item) => {
      skillHash[item.id] = item;
    });
    return cache.map((item) => {
      return item.map((rel) => {
        let skill = skillHash[rel.skillId];
        if(skill) {
          skill.point = rel.point;
        }
        return skill;
      });
    });
  }
}

module.exports = Service;
