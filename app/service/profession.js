/**
 * Created by army8735 on 2018/3/30.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const CACHE_TIME = 10;

class Service extends egg.Service {
  async info(id) {}
  async infoList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map(function(id) {
        if(id !== null && id !== undefined) {
          return app.redis.get('profession_' + id);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach(function(item, i) {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('profession_' + id, CACHE_TIME);
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
      });
      if(res.length) {
        let hash = {};
        res.forEach(function(item) {
          item = item.toJSON();
          hash[item.id] = item;
        });
        noCacheIndexList.forEach(function(i) {
          let id = idList[i];
          let temp = hash[id];
          if(temp) {
            cache[i] = temp;
            app.redis.setex('profession_' + id, CACHE_TIME, JSON.stringify(temp));
          }
          else {
            app.redis.setex('profession_' + id, CACHE_TIME, 'null');
          }
        });
      }
    }
    return cache;
  }
}

module.exports = Service;
