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
    let res = await app.model.comment.findAll({
      attributes: [
        'id',
        ['user_id', 'uid'],
        ['author_id', 'aid'],
        'content',
        ['parent_id', 'pid'],
        ['root_id', 'rid'],
        ['create_time', 'createTime']
      ],
      where: {
        id: idList,
        is_delete: false,
      },
      raw: true,
    });
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
    if(data.aid) {
      delete data.uid;
      data.isAuthor = true;
      let author = await service.author.info(data.aid);
      data.name = author.name;
      data.headUrl = author.headUrl;
    }
    else {
      delete data.aid;
      let user = await service.user.info(data.uid);
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
      if(item.aid) {
        if(!authorIdHash[item.aid]) {
          authorIdHash[item.aid] = true;
          authorIdList.push(item.aid);
        }
        delete item.uid;
        item.isAuthor = true;
      }
      else {
        if(!userIdHash[item.uid]) {
          userIdHash[item.uid] = true;
          userIdList.push(item.uid);
        }
        delete item.aid;
      }
      if(item.rid !== item.pid && item.rid !== 0 && !quoteIdHash[item.pid]) {
        quoteIdList.push(item.pid);
      }
    });
    let quotes = await this.infoList(quoteIdList);
    let quoteHash = {};
    quotes.forEach(function(item) {
      if(item.aid) {
        if(!authorIdHash[item.aid]) {
          authorIdHash[item.aid] = true;
          authorIdList.push(item.aid);
        }
        delete item.uid;
        item.isAuthor = true;
      }
      else {
        if(!userIdHash[item.uid]) {
          userIdHash[item.uid] = true;
          userIdList.push(item.uid);
        }
        delete item.aid;
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
        item.name = authorIdHash[item.aid].name;
        item.headUrl = authorIdHash[item.aid].headUrl;
      }
      else {
        item.nickname = userIdHash[item.uid].nickname;
        item.headUrl = userIdHash[item.uid].headUrl;
      }
    });
    dataList.forEach(function(item) {
      if(item.isAuthor) {
        let author = authorIdHash[item.aid];
        if(author) {
          item.name = author.name;
          item.headUrl = author.headUrl;
        }
      }
      else {
        let user = userIdHash[item.uid];
        if(user) {
          item.nickname = user.nickname;
          item.headUrl = user.headUrl;
        }
      }
      if(item.rid !== item.pid && item.rid !== 0 && quoteHash[item.pid]) {
        item.quote = quoteHash[item.pid];
      }
    });
    return dataList;
  }
}

module.exports = Service;
