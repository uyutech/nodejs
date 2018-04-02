/**
 * Created by army8735 on 2018/3/19.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const CACHE_TIME = 10;

class Service extends egg.Service {
  async info(id) {
    /**
     * 根据id获取画圈信息
     * @param id
     * @returns Object
     */
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'postInfo_' + id;
    let res = await this.app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    let sql = `SELECT
      comment.id,
      comment.user_id AS userId,
      comment.author_id AS authorId,
      comment.content,
      comment.parent_id AS parentId,
      comment.root_id AS rootId,
      comment.create_time AS createTime,
      comment.update_time AS updateTime
      FROM comment
      WHERE comment.id=${id}`;
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(res.length) {
      res = res[0];
      res = await service.comment.plus(res);
    }
    else {
      res = null;
    }
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }

  /**
   * 获取画圈下的言论
   * @param id:int 画圈id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ size:int, data:Array<Object> }
   */
  async comment(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    let [data, size] = await Promise.all([
      this.commentData(id, offset, limit),
      this.commentSize(id)
    ]);
    return { data, size };
  }

  /**
   * 获取画圈下留言
   * @param id:int 画圈的id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns int 留言数量
   */
  async commentData(id, offset, limit) {
    if(!id) {
      return;
    }
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
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
      FROM comment
      WHERE comment.root_id=${id}
      AND comment.is_delete=false
      ORDER BY comment.id DESC
      LIMIT ${offset},${limit};`;
    let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    res = await service.comment.plusList(res);
    return res;
  }

  /**
   * 获取画圈下留言数量
   * @param id:int 画圈的id
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
      FROM comment
      WHERE comment.root_id=${id}
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
