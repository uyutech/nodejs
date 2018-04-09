/**
 * Created by army8735 on 2018/4/2.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

const CACHE_TIME = 10;

class Service extends egg.Service {
  /**
   * 根据id获取圈子信息
   * @param id:int 圈子id
   * @returns Object
   */
  async info(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'circleInfo_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = squel.select()
      .from('circle')
      .from('circle_type')
      .field('circle.id')
      .field('circle.name')
      .field('circle.describe')
      .field('circle.banner')
      .field('circle.type')
      .field('circle_type.name', 'typeName')
      .where('circle.id=?', id)
      .where('circle.type=circle_type.id')
      .toString();
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(res.length) {
      res = res[0];
    }
    else {
      res = null;
    }
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 根据id列表获取圈子信息列表
   * @param idList:Array<int> 圈子id列表
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
        return app.redis.get('circleInfo_' + id);
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        app.redis.expire('circleInfo_' + id, CACHE_TIME);
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
        .from('circle')
        .from('circle_type')
        .field('circle.id')
        .field('circle.name')
        .field('circle.describe')
        .field('circle.banner')
        .field('circle.cover')
        .field('circle.type')
        .field('circle_type.name', 'typeName')
        .where('circle.id IN ?', noCacheIdList)
        .where('circle.type=circle_type.id')
        .toString();
      let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
      if(res.length) {
        let hash = {};
        res.forEach((item) => {
          hash[item.id] = item;
        });
        noCacheIndexList.forEach((i) => {
          let id = idList[i];
          let temp = hash[id] || null;
          cache[i] = temp;
          app.redis.setex('circleInfo_' + id, CACHE_TIME, JSON.stringify(temp));
        });
      }
    }
    return cache;
  }

  /**
   * 获取圈子下的画圈
   * @param id:int 圈子id
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ count:int, data:Array<Object> }
   */
  async postList(id, uid, offset, limit) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'circleTag_' + id;
    let tagList = await app.redis.get(cacheKey);
    if(tagList) {
      app.redis.expire(cacheKey, CACHE_TIME);
      tagList = JSON.parse(tagList);
    }
    else {
      tagList = await app.model.circleTagRelation.findAll({
        attributes: [
          ['tag_id', 'tagId']
        ],
        where: {
          circle_id: id,
          is_delete: false,
        },
        raw: true,
      });
      tagList = tagList.map((item) => {
        return item.tagId;
      });
      app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(tagList));
    }
    let [data, count] = await Promise.all([
      this.postData(tagList, uid, offset, limit),
      this.postCount(tagList)
    ]);
    return { data, count };
  }

  /**
   * 获取圈子下画圈数据
   * @param tagList:Array<int> 圈子关联的标签id列表
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Array<Object>
   */
  async postData(tagList, uid, offset, limit) {
    if(!tagList || !tagList.length) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let sql = squel.select()
      .from('tag_comment_relation FORCE INDEX (tag_id_is_delete_comment_id)')
      .from('comment')
      .field('comment.id')
      .field('comment.user_id', 'uid')
      .field('comment.author_id', 'aid')
      .field('comment.content')
      .field('comment.parent_id', 'pid')
      .field('comment.root_id', 'rid')
      .field('comment.create_time', 'createTime')
      .where('tag_comment_relation.tag_id IN ?', tagList)
      .where('tag_comment_relation.is_delete=false')
      .where('tag_comment_relation.comment_id=comment.id')
      .order('tag_comment_relation.comment_id', false)
      .offset(offset)
      .limit(limit)
      .toString();
    let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    res = await service.comment.plusListFull(res, uid);
    return res;
  }

  /**
   * 获取圈子下画圈数量
   * @param tagList:Array<int> 圈子关联的标签id列表
   * @returns int
   */
  async postCount(tagList) {
    if(!tagList || !tagList.length) {
      return;
    }
    const { app } = this;
    let cacheKey = 'tagListCommentCount_' + tagList.join(',');
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = squel.select()
      .from('tag_comment_relation FORCE INDEX (tag_id_is_delete_comment_id)')
      .field('COUNT(*)', 'num')
      .where('tag_id IN ?', tagList)
      .where('is_delete=false')
      .toString();
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(res.length) {
      res = res[0].num || 0;
    }
    else {
      res = 0;
    }
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 获取全部圈子
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

  /**
   * 获取全部圈子信息
   * @param offset:int 分页开始
   * @param limit:int 分页尺寸
   * @returns Array<Object>
   */
  async allData(offset, limit) {
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app } = this;
    let cacheKey = 'allCircle_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.circle.findAll({
      attributes: [
        'id',
        'name'
      ],
      where: {
        is_delete: false,
      },
      offset,
      limit,
      raw: true,
    });
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 获取全部圈子数量
   * @returns int
   */
  async allCount() {
    const { app } = this;
    let cacheKey = 'allCircleCount';
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.circle.findOne({
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
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 是否关注了圈子
   * @param id:int 圈子id
   * @param uid:int 当前登录用户id
   * @returns boolean
   */
  async isFollow(id, uid) {
    if(!id) {
      return;
    }
    if(!uid) {
      return false;
    }
    const { app } = this;
    let cacheKey = 'userCircleRelation_' + uid + '_' + id + '_' + 1;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.userCircleRelation.findOne({
      where: {
        user_id: uid,
        type: 1,
        circle_id: id,
        is_delete: false,
      },
    });
    if(res) {
      res = true;
    }
    else {
      res = false;
    }
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 获得粉丝数量
   * @param id:int 用户id
   * @returns int
   */
  async fansCount(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'circleFansCount_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    res = await app.model.userCircleRelation.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        circle_id: id,
        type: 1,
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
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }
}

module.exports = Service;
