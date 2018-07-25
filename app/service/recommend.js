/**
 * Created by army8735 on 2018/6/1.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Service extends egg.Service {
  /**
   * 获取推荐的作品
   * @param uid:int 用户id
   * @returns Array<Object>
   */
  async works(uid) {
    const { app, service } = this;
    let cacheKey = 'recommendWorks';
    let [res, num, limit] = await Promise.all([
      app.redis.get(cacheKey),
      app.redis.get('recommendWorksNum'),
      app.redis.get('recommendWorksLimit')
    ]);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.content.findAll({
        attributes: [
          'id',
          'title',
          'cover',
          'describe',
          'label',
          'tag',
          ['target_id', 'targetId']
        ],
        where: {
          type: 2,
          is_delete: false,
        },
        order: [
          ['weight', 'DESC'],
          ['create_time', 'DESC']
        ],
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    if(num) {
      num = JSON.parse(num);
    }
    num = num || 2;
    if(limit) {
      limit = JSON.parse(limit);
    }
    limit = limit || 100;
    let contentIdList = res.map((item) => {
      return item.id;
    });
    let relation = await app.model.userContentRelation.findAll({
      attributes: [
        ['content_id', 'contentId']
      ],
      where: {
        user_id: uid,
        type: 1,
        content_id: contentIdList,
      },
      raw: true,
    });
    let hash = {};
    relation.forEach((item) => {
      hash[item.contentId] = true;
    });
    // 去除已读
    let allNew = [];
    res.forEach((item) => {
      if(!hash[item.id]) {
        allNew.push(item);
      }
    });
    // 全部已读则选取全部
    if(!allNew.length) {
      allNew = res;
    }
    allNew.splice(limit);
    let worksIdList = [];
    let contentList = [];
    let tagIdList = [];
    let tagIdHash = {};
    for(let i = 0; i < num; i++) {
      if(!allNew.length) {
        break;
      }
      let rand = Math.floor(Math.random() * allNew.length);
      let item = allNew.splice(rand, 1)[0];
      worksIdList.push(item.targetId);
      contentList.push(item);
      if(item.tag) {
        item.tag.forEach((tag) => {
          if(!tagIdHash[tag]) {
            tagIdHash[tag] = true;
            tagIdList.push(tag);
          }
        });
      }
    }
    let [works, collection, tagList] = await Promise.all([
      service.works.infoListPlusFull(worksIdList),
      service.works.collectionListFull(worksIdList, uid, true),
      service.tag.infoList(tagIdList)
    ]);
    let tagHash = {};
    tagList.forEach((item) => {
      tagHash[item.id] = item;
    });
    works.forEach((item, i) => {
      if(item) {
        item.contentId = contentList[i].id;
        item.title = contentList[i].title || item.title;
        item.cover = contentList[i].cover || item.cover;
        item.label = contentList[i].label;
        item.describe = contentList[i].describe || item.describe;
        item.collection = collection[i];
        if(contentList[i].tag) {
          item.tag = contentList[i].tag.map((id) => {
            return tagHash[id];
          });
        }
      }
    });
    return works;
  }

  /**
   * 获取推荐的画圈
   * @param uid:int 用户id
   * @returns Array<Object>
   */
  async post(uid) {
    const { app, service } = this;
    let cacheKey = 'recommendPost';
    let [res, num, limit] = await Promise.all([
      app.redis.get(cacheKey),
      app.redis.get('recommendPostNum'),
      app.redis.get('recommendPostLimit')
    ]);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.content.findAll({
        attributes: [
          'id',
          'label',
          ['target_id', 'targetId']
        ],
        where: {
          type: 1,
          is_delete: false,
        },
        order: [
          ['weight', 'DESC'],
          ['create_time', 'DESC']
        ],
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    if(num) {
      num = JSON.parse(num);
    }
    num = num || 2;
    if(limit) {
      limit = JSON.parse(limit);
    }
    limit = limit || 100;
    let contentIdList = res.map((item) => {
      return item.id;
    });
    let relation = await app.model.userContentRelation.findAll({
      attributes: [
        ['content_id', 'contentId']
      ],
      where: {
        user_id: uid,
        type: 1,
        content_id: contentIdList,
      },
      raw: true,
    });
    let hash = {};
    relation.forEach((item) => {
      hash[item.contentId] = true;
    });
    // 去除已读
    let allNew = [];
    res.forEach((item) => {
      if(!hash[item.id]) {
        allNew.push(item);
      }
    });
    // 全部已读则选取全部
    if(!allNew.length) {
      allNew = res;
    }
    allNew.splice(limit);
    let postIdList = [];
    let contentList = [];
    for(let i = 0; i < num; i++) {
      if(!allNew.length) {
        break;
      }
      let rand = Math.floor(Math.random() * allNew.length);
      let item = allNew.splice(rand, 1)[0];
      postIdList.push(item.targetId);
      contentList.push(item);
    }
    let postList = await service.post.infoList(postIdList, uid);
    postList.forEach((item, i) => {
      if(item) {
        item.contentId = contentList[i].id;
        item.tag = contentList[i].label;
      }
    });
    return postList;
  }

  /**
   * 获取全部预设圈子
   * @returns Array<Object>
   */
  async guideCircle() {
    const { app, service } = this;
    let guideTag = await this.guideTag();
    let idList = guideTag.map((item) => {
      return item.tagId;
    });
    let query = await app.model.circleTagRelation.findAll({
      attributes: [
        ['circle_id', 'circleId']
      ],
      where: {
        tag_id: idList,
        type: 1,
      },
      raw: true,
    });
    let circleIdList = query.map((item) => {
      return item.circleId;
    });
    let circleList = await service.circle.infoList(circleIdList);
    circleList = circleList.filter((item) => {
      return item && !item.isDelete;
    });
    return circleList;
  }

  /**
   * 获取预设的tag
   * @returns Array<int>
   */
  async guideTag() {
    const { app } = this;
    let cacheKey = 'guideTag';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.guideTag.findAll({
      attributes: [
        ['tag_id', 'tagId'],
        'theme'
      ],
      where: {
        is_delete: false,
      },
      order: [
        ['weight', 'DESC']
      ],
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 预设圈子中按theme分组后未读且weight最高的一个画圈，优先关注的圈子
   * @param uid
   * @returns Array<Object>
   */
  async guideAndFollow(uid) {
    const { app, service } = this;
    let [guideTag, allPost] = await Promise.all([
      this.guideTag(),
      this.allPost()
    ]);
    let tagThemeHash = {};
    let tagIdList = guideTag.map((item) => {
      tagThemeHash[item.tagId] = item.theme;
      return item.tagId;
    });
    let allPostIdList = allPost.map((item) => {
      return item.commentId;
    });
    let circleIdList = await service.tag.circleIdList(tagIdList, 1);
    let circleTagRelation = {};
    let guideCircleIdList = [];
    circleIdList.forEach((arr, i) => {
      if(!arr || !arr.length) {
        return;
      }
      let tagId = tagIdList[i];
      arr.forEach((circleId) => {
        guideCircleIdList.push(circleId);
        circleTagRelation[circleId] = tagId;
      });
    });
    let [query, query2] = await Promise.all([
      app.model.userCircleRelation.findAll({
        attributes: [
          ['circle_id', 'circleId']
        ],
        where: {
          user_id: uid,
          circle_id: guideCircleIdList,
          type: 1,
        },
        raw: true,
      }),
      app.model.circlingPostRead.findAll({
        attributes: [
          ['comment_id', 'commentId']
        ],
        where: {
          user_id: uid,
          comment_id: allPostIdList,
        },
        raw: true,
      })
    ]);
    let followThemeHash = {};
    query.forEach((item) => {
      let tagId = circleTagRelation[item.circleId];
      if(tagId) {
        followThemeHash[tagThemeHash[tagId]] = true;
      }
    });
    let readPostHash = {};
    query2.forEach((item) => {
      readPostHash[item.commentId] = true;
    });
    let list = [];
    let list2 = [];
    let exist = {};
    allPost.forEach((item) => {
      if(!readPostHash[item.commentId]) {
        if(!exist[item.theme]) {
          exist[item.theme] = true;
          if(followThemeHash[item.theme]) {
            list.push(item.commentId);
          }
          else {
            list2.push(item.commentId);
          }
        }
      }
    });
    let postList = await service.post.infoList(list.concat(list2), uid);
    return postList;
  }

  /**
   * 未登录用户随机显示每个theme里的一个weight>9000000的画圈
   * @returns Array<Object>
   */
  async randomPost() {
    const { app, service } = this;
    let cacheKey = 'recommendRandomPost';
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      let all = await this.allPost();
      res = {};
      all.forEach((item) => {
        if(item.weight > 9000000) {
          let arr = res[item.theme] = res[item.theme] || [];
          arr.push(item.commentId);
        }
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let idList = [];
    for(let theme in res) {
      let arr = res[theme];
      let i = Math.floor(Math.random() * arr.length);
      idList.push(arr[i]);
    }
    return await service.post.infoList(idList);
  }

  /**
   * 获取全部推荐的画圈
   * @returns Array<Object>
   */
  async allPost() {
    const { app } = this;
    let cacheKey = 'recommendAllPost2';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.circlingPost.findAll({
      attributes: [
        ['comment_id', 'commentId'],
        'theme',
        'weight'
      ],
      where: {
        is_delete: false,
        theme: {
          $gt: 0,
        },
      },
      order: [
        ['theme', 'DESC'],
        ['weight', 'DESC'],
        ['comment_id', 'DESC']
      ],
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 分页获取推荐画圈接口
   * @param uid:int 用户id
   * @param offset:int 分页开始
   * @param limit:int 分页数量
   * @returns Object{ count:int, data:Array<Object> }
   */
  async allPostPage(uid, offset, limit) {
    offset = parseInt(offset) || 0;
    limit = parseInt(limit) || 1;
    if(offset < 0 || limit < 1) {
      return;
    }
    const { service } = this;
    let allPost = await this.allPost();
    let idList = allPost.map((item) => {
      return item.commentId;
    });
    let some = idList.slice(offset, offset + limit);
    let postList = await service.post.infoList(some, uid);
    return {
      data: postList,
      count: idList.length,
    };
  }
}

module.exports = Service;
