/**
 * Created by army8735 on 2018/3/26.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const CACHE_TIME = 10;

class Service extends egg.Service {
  /**
   * 根据评论id列表获取评论详情
   * @param idList:Array<int> 评论id列表
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
      AND comment.is_delete=false;`;
    let res = await app.sequelizeCircling.query(sql, { type: Sequelize.QueryTypes.SELECT });
    return res;
  }

  /**
   * 包装评论数据，补上用户信息
   * @param data:Object 评论基本信息
   * @returns Array<Object>
   */
  async plus(data) {
    if(!data) {
      return;
    }
    const { service } = this;
    if(data.isAuthor) {
      delete data.userId;
      let author = await service.author.info(data.authorId);
      data.name = author.name;
      data.headUrl = author.headUrl;
    }
    else {
      delete data.authorId;
      let user = await service.user.info(data.userId);
      data.nickname = user.nickname;
      data.headUrl = user.headUrl;
    }
    return data;
  }

  /**
   * 包装评论数据，补上用户信息
   * @param dataList:Array<Object> 评论基本信息
   * @returns Array<Object>
   */
  async plusList(dataList) {
    if(!dataList) {
      return;
    }
    if(!dataList.length) {
      return [];
    }
    const { service } = this;
    let userIdHash = {};
    let userIdList = [];
    let authorIdHash = {};
    let authorIdList = [];
    let quoteIdList = [];
    let quoteIdHash = {};
    dataList.forEach(function(item) {
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
      if(item.rootId !== item.parentId && item.rootId !== 0 && !quoteIdHash[item.parentId]) {
        quoteIdList.push(item.parentId);
      }
    });
    let quotes = await this.infoList(quoteIdList);
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
      userIdHash[item.id] = item;
    });
    authorIdHash = {};
    authorList.forEach(function(item) {
      authorIdHash[item.id] = item;
    });
    quotes.forEach(function(item) {
      if(item.isAuthor) {
        item.name = authorIdHash[item.authorId].name;
        item.headUrl = authorIdHash[item.authorId].headUrl;
      }
      else {
        item.nickname = userIdHash[item.userId].nickname;
        item.headUrl = userIdHash[item.userId].headUrl;
      }
    });
    dataList.forEach(function(item) {
      if(item.isAuthor) {
        let author = authorIdHash[item.authorId];
        if(author) {
          item.name = author.name;
          item.headUrl = author.headUrl;
        }
      }
      else {
        let user = userIdHash[item.userId];
        if(user) {
          item.nickname = user.nickname;
          item.headUrl = user.headUrl;
        }
      }
      if(item.rootId !== item.parentId && item.rootId !== 0 && quoteHash[item.parentId]) {
        item.quote = quoteHash[item.parentId];
      }
    });
    return dataList;
  }
}

module.exports = Service;
