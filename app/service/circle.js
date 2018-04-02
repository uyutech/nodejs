/**
 * Created by army8735 on 2018/4/2.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const CACHE_TIME = 10;

class Service extends egg.Service {
  /**
   * 根据id获取圈子信息
   * @param id
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
    let sql = `SELECT
      circle.id,
      circle.name,
      circle.describe,
      circle.banner,
      circle.cover,
      circle.is_public AS isPublic,
      circle.type AS type,
      circle_type.name AS typeName
      FROM circle, circle_type
      WHERE circle.id=${id}
      AND is_delete=false
      AND circle.type=circle_type.id;`;
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
   * 获取圈子下的言论
   * @param id:int 圈子id
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns Object{ size:int, data:Array<Object> }
   */
  async comment(id, skip, take) {
    if(!id) {
      return;
    }
    skip = parseInt(skip) || 0;
    take = parseInt(take) || 1;
    if(skip < 0 || take < 1) {
      return;
    }
    let [data, size] = await Promise.all([
      this.commentData(id, skip, take),
      this.commentSize(id)
    ]);
    return { data, size };
  }

  /**
   * 获取圈子下留言
   * @param id:int 圈子的id
   * @param skip:int 分页开始
   * @param take:int 分页数量
   * @returns int 留言数量
   */
  async commentData(id, skip, take) {
    if(!id) {
      return;
    }
    skip = parseInt(skip) || 0;
    take = parseInt(take) || 1;
    if(skip < 0 || take < 1) {
      return;
    }
    const { app, service } = this;
    let sql = `SELECT
      comment.id,
      comment.user_id AS userId,
      comment.author_id AS authorId,
      comment.content,
      comment.parent_id AS parentId,
      comment.root_id AS rootId,
      comment.create_time AS createTime,
      comment.update_time AS updateTime
      FROM circle_comment_relation, comment
      WHERE circle_comment_relation.circle_id=${id}
      AND circle_comment_relation.comment_id=comment.id
      AND comment.is_delete=false
      ORDER BY circle_comment_relation.id DESC
      LIMIT ${skip},${take};`;
    let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    res = await service.comment.plusList(res);
    return res;
  }

  /**
   * 获取圈子下留言数量
   * @param id:int 圈子的id
   * @returns int 留言数量
   */
  async commentSize(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'circleCommentSize_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = `SELECT
      COUNT(*) AS num
      FROM circle_comment_relation, comment
      WHERE circle_comment_relation.circle_id=${id}
      AND circle_comment_relation.comment_id=comment.id
      AND comment.is_delete=false;`;
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
}

module.exports = Service;
