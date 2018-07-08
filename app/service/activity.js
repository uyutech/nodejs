/**
 * Created by army8735 on 2018/6/29.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');
const moment = require('moment');

class Service extends egg.Service {
  async ysjxyInfo() {
    const { app } = this;
    let cacheKey = 'ysjxyInfo';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.activity.findOne({
      attributes: [
        'id',
        'title',
        'describe',
        ['start_time', 'startTime'],
        ['end_time', 'endTime']
      ],
      where: {
        id: 1,
      },
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  async ysjxyOriginWorks() {
    const { app, service } = this;
    let cacheKey = 'ysjxyOriginWorks';
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.activityWorks.findAll({
        attributes: [
          ['works_id', 'worksId'],
          ['origin_url', 'originUrl'],
          ['accompany_url', 'accompanyUrl']
        ],
        where: {
          activity_id: 1,
        },
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let idList = res.map((item) => {
      return item.worksId;
    });
    let [works, collection] = await Promise.all([
      service.works.infoListPlusFull(idList),
      service.works.collectionListFull(idList, undefined, true)
    ]);
    works.forEach((item, i) => {
      if(item) {
        item.collection = collection[i];
        item.originUrl = res[i].originUrl;
        item.accompanyUrl = res[i].accompanyUrl;
      }
    });
    return works;
  }

  async ysjxyUpload(uid, offset, limit) {
    let [data, count] = await Promise.all([
      this.ysjxyUploadData(uid, offset, limit),
      this.ysjxyUploadCount()
    ]);
    return {
      data,
      count,
    };
  }

  async ysjxyUploadData(uid, offset, limit) {
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'ysjxyUploadData_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.activityUpload.findAll({
        attributes: [
          'id',
          ['works_id', 'worksId'],
          ['user_id', 'userId']
        ],
        where: {
          activity_id: 1,
        },
        order: [
          ['create_time', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let uploadIdList = res.map((item) => {
      return item.id;
    });
    let worksIdList = res.map((item) => {
      return item.worksId;
    });
    let userIdList = res.map((item) => {
      return item.userId;
    });
    let [voteCountList, worksList, collectionList, userList] = await Promise.all([
      this.voteCountList(uploadIdList, 1),
      service.works.infoListPlusCount(worksIdList),
      service.works.collectionListFull(worksIdList),
      service.user.infoList(userIdList)
    ]);
    res.forEach((item, i) => {
      item.voteCount = voteCountList[i];
      item.works = worksList[i];
      item.user = userList[i];
      item.collection = collectionList[i];
    });
    return res;
  }

  async ysjxyUploadCount() {
    const { app } = this;
    let cacheKey = 'ysjxyUploadCount';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.activityUpload.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        activity_id: 1,
      },
      raw: true,
    });
    if(res) {
      res = res.num || 0;
    }
    else {
      res = 0;
    }
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  async ysjxyUploadHh(uid, offset, limit) {
    let [data, count] = await Promise.all([
      this.ysjxyUploadHhData(uid, offset, limit),
      this.ysjxyUploadHhCount()
    ]);
    return {
      data,
      count,
    };
  }

  async ysjxyUploadHhData(uid, offset, limit) {
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { app, service } = this;
    let cacheKey = 'ysjxyUploadHhData_' + offset + '_' + limit;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.activityUploadHh.findAll({
        attributes: [
          'id',
          ['works_id', 'worksId'],
          ['user_id', 'userId']
        ],
        where: {
          activity_id: 1,
        },
        order: [
          ['create_time', 'DESC']
        ],
        offset,
        limit,
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let uploadIdList = res.map((item) => {
      return item.id;
    });
    let worksIdList = res.map((item) => {
      return item.worksId;
    });
    let userIdList = res.map((item) => {
      return item.userId;
    });
    let [voteCountList, worksList, collectionList, userList] = await Promise.all([
      this.voteCountList(uploadIdList, 2),
      service.works.infoListPlusCount(worksIdList),
      service.works.collectionListFull(worksIdList),
      service.user.infoList(userIdList)
    ]);
    res.forEach((item, i) => {
      item.voteCount = voteCountList[i];
      item.works = worksList[i];
      item.user = userList[i];
      item.collection = collectionList[i];
    });
    return res;
  }

  async ysjxyUploadHhCount() {
    const { app } = this;
    let cacheKey = 'ysjxyUploadHhCount';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.activityUploadHh.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        activity_id: 1,
      },
      raw: true,
    });
    if(res) {
      res = res.num || 0;
    }
    else {
      res = 0;
    }
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  async ysjxyFcSingle(id, uid) {
    const { app, service } = this;
    let cacheKey = 'ysjxyFcSingle_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.activityUpload.findOne({
        attributes: [
          ['works_id', 'worksId'],
          ['user_id', 'userId']
        ],
        where: {
          id,
        },
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let worksId = res.worksId;
    let userId = res.userId;
    let [voteCount, works, collection, user] = await Promise.all([
      this.voteCount(id, 1),
      service.works.infoPlusCount(worksId),
      service.works.collectionFull(worksId),
      service.user.info(userId)
    ]);
    res.id = id;
    res.voteCount = voteCount;
    res.works = works;
    res.user = user;
    res.collection = collection;
    return res;
  }

  async ysjxyHhSingle(id, uid) {
    const { app, service } = this;
    let cacheKey = 'ysjxyHhSingle_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.activityUploadHh.findOne({
        attributes: [
          ['works_id', 'worksId'],
          ['user_id', 'userId']
        ],
        where: {
          id,
        },
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let worksId = res.worksId;
    let userId = res.userId;
    let [voteCount, works, collection, user] = await Promise.all([
      this.voteCount(id, 2),
      service.works.infoPlusCount(worksId),
      service.works.collectionFull(worksId),
      service.user.info(userId)
    ]);
    res.id = id;
    res.voteCount = voteCount;
    res.works = works;
    res.user = user;
    res.collection = collection;
    return res;
  }

  async voteCount(id, type) {
    if(!id || !type) {
      return;
    }
    const { app } = this;
    let cacheKey = 'ysjxyVoteCount_' + id + '_' + type;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.activityVote.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        activity_id: 1,
        upload_id: id,
        type,
      },
      raw: true,
    });
    if(res) {
      res = res.num || 0;
    }
    else {
      res = 0;
    }
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  async voteCountList(idList, type) {
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
          return app.redis.get('ysjxyVoteCount_' + id + '_' + type);
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
      let res = await app.model.activityVote.findAll({
        attributes: [
          ['upload_id', 'uploadId'],
          [Sequelize.fn('COUNT', '*'), 'num']
        ],
        where: {
          activity_id: 1,
          upload_id: noCacheIdList,
          type,
        },
        group: 'uploadId',
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.uploadId;
          hash[id] = item.num;
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let num = hash[id] || 0;
        cache[i] = num;
        app.redis.setex('ysjxyVoteCount_' + id + '_' + type, app.config.redis.time, JSON.stringify(num));
      });
    }
    return cache;
  }

  async voteRelation(id, uid) {
    if(!id) {
      return;
    }
    const { app } = this;
    let res = await app.model.activityVote.findOne({
      attributes: [
        ['upload_id', 'uploadId']
      ],
      where: {
        activity_id: 1,
        upload_id: id,
        user_id: uid,
      },
      raw: true,
    });
    return !!res;
  }

  async voteRelationList(idList, uid) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let res = await app.model.activityVote.findAll({
      attributes: [
        ['upload_id', 'uploadId']
      ],
      where: {
        activity_id: 1,
        upload_id: idList,
        user_id: uid,
      },
      raw: true,
    });
    let hash = {};
    res.forEach((item) => {
      hash[item.uploadId] = true;
    });
    return idList.map((id) => {
      return !!hash[id];
    });
  }

  async vote(id, type, uid) {
    if(!id || !type || !uid) {
      return;
    }
    const { app } = this;
    let has = await app.model.activityVote.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        activity_id: 1,
        // upload_id: id,
        user_id: uid,
        create_time: {
          $gt: moment().format('YYYY-MM-DD')
        },
      },
      raw: true,
    });
    has = has.num || 0;
    if(has >= 10) {
      return {
        success: false,
        message: '每天投票不能超过10次',
      }
    }
    await app.model.activityVote.create({
      activity_id: 1,
      upload_id: id,
      user_id: uid,
      type,
      create_time: new Date(),
    });
    let count = await app.model.activityVote.findOne({
      attributes: [
        [Sequelize.fn('COUNT', '*'), 'num']
      ],
      where: {
        activity_id: 1,
        type,
        upload_id: id,
      },
      raw: true,
    });
    if(count) {
      count = count.num || 0;
    }
    else {
      count = 0;
    }
    app.redis.setex('ysjxyVoteCount_' + id + '_' + type, app.config.redis.time, JSON.stringify(count));
    return {
      success: true,
      data: {
        state: true,
        count,
      },
    };
  }

  async character() {
    const { app } = this;
    let cacheKey = 'ysjxyCharacter';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.activityCharacter.findAll({
      attributes: [
        'id',
        'name'
      ],
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }
}

module.exports = Service;
