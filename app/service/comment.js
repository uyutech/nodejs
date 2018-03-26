/**
 * Created by army8735 on 2018/3/26.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const CACHE_TIME = 10;

class Service extends egg.Service {
  async info(id) {
    if(!id) {
      return;
    }
  }
  async infoList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
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
      WHERE id IN(${idList})
      AND comment.is_deleted=false;`;
    let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    return res;
  }
}

module.exports = Service;
