/**
 * Created by army8735 on 2018/3/19.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const CACHE_TIME = 10;

const WORKS_STATE_NAME = {
  0: '已删除',
  1: '已完成',
  2: '未完成', // 公开
  3: '未完成', // 保密
};

class Service extends egg.Service {
  async info(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'worksInfo_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = `SELECT
      works.id AS worksId,
      works.title AS worksTitle,
      works.sub_title AS worksSubTitle,
      works.state AS worksState,
      works.cover AS worksCover,
      works.type AS worksType,
      works_type.name AS worksTypeName
      FROM works, works_type
      WHERE works.id=${id}
      AND works.is_authorize=true
      AND works.state>0
      AND works.type=works_type.id;`;
    res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(res.length) {
      res = res[0];
      res.worksStateName = WORKS_STATE_NAME[res.worksState];
    }
    else {
      res = null;
    }
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    return res;
  }
  async children(id) {
    if(!id) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'worksChildren_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      res = JSON.parse(res);
    }
    else {
      let sql = `SELECT
      works_work_relation.work_id AS workId,
      works_work_relation.describe,
      work.title AS workTitle,
      work.class AS workClass,
      work.type AS workType,
      work_type.name AS workTypeName
      FROM works_work_relation, work, work_type
      WHERE works_work_relation.works_id=${id}
      AND works_work_relation.is_deleted=false
      AND works_work_relation.work_id=work.id
      AND work.state>0
      AND work.type=work_type.id`;
      res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    }
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(res));
    if(res.length) {
      let workList = await service.work.infoList(res);
      res.forEach(function(item, i) {
        Object.assign(item, workList[i]);
      });
    }
    return res;
  }
  async comment(id, index, length) {
    let [data, size] = await Promise.all([
      this.commentData(id, index, length),
      this.commentSize(id)
    ]);
    return { data, size };
  }
  async commentData(id, index = 0, length = 1) {
    if(!id) {
      return;
    }
    index = parseInt(index) || 0;
    length = parseInt(length) || 1;
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
      FROM comment, works_comment_relation
      WHERE works_comment_relation.works_id=${id}
      AND works_comment_relation.comment_id=comment.root_id
      AND comment.is_deleted=false
      ORDER BY comment.id DESC
      LIMIT ${index},${length};`;
    let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    if(res.length) {
      let userIdHash = {};
      let userIdList = [];
      let authorIdHash = {};
      let authorIdList = [];
      let quoteIdList = [];
      res.forEach(function(item) {
        if(item.authorId) {
          if(!authorIdHash[item.authorId]) {
            authorIdHash[item.authorId] = true;
            authorIdList.push(item.authorId);
          }
          delete item.userId;
          item.isAuthor = true;
        }
        else {
          if(!userIdHash[item.userId]) {
            userIdHash[item.userId] = true;
            userIdList.push(item.userId);
          }
          delete item.authorId;
        }
        if(item.rootId !== item.parentId && item.rootId !== 0) {
          quoteIdList.push(item.parentId);
        }
      });
      let quotes = await service.comment.infoList(quoteIdList);
      let quoteHash = {};
      quotes.forEach(function(item) {
        if(item.authorId) {
          if(!authorIdHash[item.authorId]) {
            authorIdHash[item.authorId] = true;
            authorIdList.push(item.authorId);
          }
          delete item.userId;
          item.isAuthor = true;
        }
        else {
          if(!userIdHash[item.userId]) {
            userIdHash[item.userId] = true;
            userIdList.push(item.userId);
          }
          delete item.authorId;
        }
        quoteHash[item.id] = item;
        if(item.content.length > 60) {
          item.slice = true;
          item.content = item.content.slice(0, 60) + '...';
        }
      });
      let [userList, authorList] = await Promise.all([
        service.user.infoList(userIdList),
        service.author.infoList(authorIdList)
      ]);
      userIdHash = {};
      userList.forEach(function(item) {
        userIdHash[item.userId] = item;
      });
      authorIdHash = {};
      authorList.forEach(function(item) {
        authorIdHash[item.authorId] = item;
      });
      quotes.forEach(function(item) {
        if(item.isAuthor) {
          item.authorName = authorIdHash[item.authorId].authorName;
          item.authorHead = authorIdHash[item.authorId].authorHead;
        }
        else {
          item.nickname = userIdHash[item.userId].nickname;
          item.userHead = userIdHash[item.userId].userHead;
        }
      });
      res.forEach(function(item) {
        if(item.isAuthor) {
          item.authorName = authorIdHash[item.authorId].authorName;
          item.authorHead = authorIdHash[item.authorId].authorHead;
        }
        else {
          item.nickname = userIdHash[item.userId].nickname;
          item.userHead = userIdHash[item.userId].userHead;
        }
        if(item.rootId !== item.parentId && item.rootId !== 0) {
          item.quote = quoteHash[item.parentId];
        }
      });
    }
    return res;
  }
  async commentSize(id) {
    const { app } = this;
    let cacheKey = 'worksCommentSize_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      app.redis.expire(cacheKey, CACHE_TIME);
      return JSON.parse(res);
    }
    let sql = `SELECT
      num
      FROM works_comment_relation, comment_num
      WHERE works_comment_relation.works_id=${id}
      AND works_comment_relation.comment_id=comment_num.comment_id
      AND type=0;`;
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
