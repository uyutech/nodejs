/**
 * Created by army8735 on 2018/5/22.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

class Service extends egg.Service {
  /**
   * 获取私信信息
   * @param id:int 私信id
   * @returns Object
   */
  async info(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'letter_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.letter.findOne({
      attributes: [
        'id',
        'content',
        ['user_id', 'userId'],
        ['target_id', 'targetId'],
        ['is_read', 'isRead'],
        ['is_delete', 'isDelete'],
        ['create_time', 'createTime']
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
   * 获取私信信息
   * @param idList:int 私信id列表
   * @returns Object
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
        return app.redis.get('letter_' + id);
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
      let res = await app.model.letter.findAll({
        attributes: [
          'id',
          'content',
          ['user_id', 'userId'],
          ['target_id', 'targetId'],
          ['is_read', 'isRead'],
          ['is_delete', 'isDelete'],
          ['create_time', 'createTime']
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
        app.redis.setex('letter_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }
}

module.exports = Service;
