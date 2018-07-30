/**
 * Created by army8735 on 2018/4/8.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;
const HASH = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '0': '天'
};

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let uid = ctx.session.uid;
    let circleId = parseInt(body.circleId);
    let query = [];
    if(uid) {
      query.push(service.user.circleList(uid, 0, LIMIT));
    }
    else {
      query.push(service.circle.all(0, LIMIT));
    }
    if(circleId) {
      query.push(service.circle.info(circleId));
    }
    let [circleList, circle] = await Promise.all(query);
    let idList = [];
    circleList.data.forEach((item) => {
      if(!item.isDelete) {
        delete item.describe;
        delete item.banner;
        delete item.cover;
        delete item.type;
        delete item.typeName;
        delete item.isDelete;
        idList.push(item.id);
      }
      else {
        idList.push(null);
      }
    });
    if(circle) {
      idList.push(circle.id);
    }
    let tagList = await service.circle.tagList(idList, 2);
    circleList.limit = LIMIT;
    circleList.data.forEach((item, i) => {
      item.tag = tagList[i];
    });
    if(circle) {
      delete circle.describe;
      delete circle.banner;
      delete circle.cover;
      delete circle.type;
      delete circle.typeName;
      circle.tag = tagList[tagList.length - 1];
    }

    const activity = [
      {
        name: '古风歌词注',
      },
      {
        name: '今时古梦',
      },
      {
        name: '圈访谈',
      },
      {
        name: '异志杂谈',
      },
      {
        name: '日记',
        value: '#日记# ' + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日 星期' + HASH[new Date().getDay()] + '\n',
      },
      {
        name: '陪转圈一起长大',
      }
    ];
    ctx.body = ctx.helper.okJSON({
      circleList,
      circle,
      activity,
    });
  }

  async index2() {
    const { app, ctx, service } = this;
    let body = ctx.request.body;
    let uid = ctx.session.uid;
    let circleList = await (uid ? service.user.circleList(uid, 0, 50) : service.circle.all(0, 50));
    circleList = circleList.data.filter((item) => {
      return !item.isDelete;
    });
    let circleIdList = circleList.map((item) => {
      return item.id;
    });
    circleIdList.push(0);
    let postTagList = await app.model.postTag.findAll({
      attributes: [
        ['circle_id', 'circleId'],
        'name',
        'describe'
      ],
      where: {
        circle_id: circleIdList,
      },
      raw: true,
    });
    let postTagHash = {};
    postTagList.forEach((item) => {
      let temp = postTagHash[item.circleId] = postTagHash[item.circleId] || [];
      temp.push({
        name: item.name,
        describe: item.describe,
      });
    });
    circleList.forEach((item) => {
      item.tag = postTagHash[item.id];
    });
    let activity = postTagHash[0] || [];
    activity.push({
      name: '日记',
      value: '#日记# ' + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日 星期' + HASH[new Date().getDay()] + '\n',
    });
    ctx.body = ctx.helper.okJSON({
      circleList,
      activity,
    });
  }

  async circleList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let offset = body.offset || 0;
    offset = parseInt(offset) || 0;
    let circleList = await service.user.circleList(uid, offset, LIMIT);
    circleList = circleList.data.filter((item) => {
      return !item.isDelete;
    });
    let circleIdList = circleList.map((item) => {
      return item.id;
    });
    let postTagList = await app.model.postTag.findAll({
      attributes: [
        ['circle_id', 'circleId'],
        'name',
        'describe'
      ],
      where: {
        circle_id: circleIdList,
      },
      raw: true,
    });
    let postTagHash = {};
    postTagList.forEach((item) => {
      let temp = postTagHash[item.circleId] = postTagHash[item.circleId] || [];
      temp.push({
        name: item.name,
        describe: item.describe,
      });
    });
    circleList.forEach((item) => {
      item.tag = postTagHash[item.id];
    });
    ctx.body = ctx.helper.okJSON(circleList);
  }

  async sub() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let content = body.content;
    let image = body.image;
    let circleId = body.circleId;
    let videoUrl = body.videoUrl;
    let audioUrl = body.audioUrl;
    let worksId = parseInt(body.worksId);
    let workId = parseInt(body.workId);
    if(!content || content.length < 3) {
      return ctx.body = ctx.helper.errorJSON({
        message: '字数不能少于3个字哦~',
      });
    }
    if(content.length > 4096) {
      return ctx.body = ctx.helper.errorJSON({
        message: '字数不能多于4096个字哦~',
      });
    }
    if(!circleId) {
      circleId = '2019000000000000';
    }
    circleId = circleId.split(',');
    circleId = circleId.map((item) => {
      return parseInt(item);
    }).filter((item) => {
      return item;
    });
    if(!circleId.length || circleId.length > 3) {
      return ctx.body = ctx.helper.errorJSON({
        message: '最多只能选择3个圈子哦~',
      });
    }
    if(image) {
      image = JSON.parse(image);
    }
    let match = content.match(/#([^#\n\s]+?)#/g);
    let tagNameList = [];
    let tagNameHash = {};
    if(match && match.length) {
      match.forEach((item) => {
        if(!tagNameHash[item]) {
          tagNameHash[item] = true;
          tagNameList.push(item.slice(1, -1));
        }
      });
    }
    // 获取选择的圈子直接对应的话题id列表，以及手写话题的id列表
    let [tagList, inputTagIdList, check] = await Promise.all([
      service.circle.tagIdList(circleId, 1),
      service.tag.idListByName(tagNameList, true),
      service.works.checkWork(worksId, workId)
    ]);
    let chooseTagIdList = [];
    let chooseTagHash = {};
    let tagIdList = [];
    let tagIdHash = {};
    tagList.map((item) => {
      if(item) {
        item.forEach(function(id) {
          if(!chooseTagHash[id]) {
            chooseTagHash[id] = true;
            chooseTagIdList.push(id);
          }
          if(!tagIdHash[id]) {
            tagIdHash[id] = true;
            tagIdList.push(id);
          }
        });
      }
    });
    inputTagIdList.map((id) => {
      if(!tagIdHash[id]) {
        tagIdHash[id] = true;
        tagIdList.push(id);
      }
    });
    let [circleIdList, res] = await Promise.all([
      service.tag.circleIdList(tagIdList),
      service.post.add(uid, {
        content,
        chooseTagIdList,
        inputTagIdList,
        image,
        authorId: body.authorId,
        worksId: check? worksId: null,
        workId: check? workId: null,
        audioUrl,
        videoUrl,
      })
    ]);
    circleIdList.forEach((arr, i) => {
      arr.forEach((id) => {
        app.model.circleCommentRelation.create({
          circle_id: id,
          comment_id: res.id,
          tag_id: tagIdList[i],
        })
      });
    });
    if(res) {
      ctx.body = ctx.helper.okJSON(res);
    }
  }
}

module.exports = Controller;
