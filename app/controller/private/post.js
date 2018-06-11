/**
 * Created by army8735 on 2018/6/8.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async create() {
    const { app, ctx, service } = this;
    let body = ctx.request.body;
    let userId = parseInt(body.userId);
    let content = body.content;
    let image = body.image;
    let circleId = body.circleId;
    let worksId = parseInt(body.worksId);
    let workId = parseInt(body.workId);
    let tag = body.tag;
    if(!userId) {
      return ctx.body = ctx.helper.errorJSON({
        message: '缺少userId~',
      });
    }
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
      if(!Array.isArray(image)) {
        image = [image];
      }
    }
    if(tag) {
      tag = JSON.parse(tag);
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
      service.post.add(userId, {
        content,
        chooseTagIdList,
        inputTagIdList,
        image,
        authorId: body.authorId,
        worksId: check? worksId: null,
        workId: check? workId: null,
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
    if(tag) {
      if(Array.isArray(tag)) {
        tag.forEach((item) => {
          app.model.tagCommentRelation.create({
            tag_id: item.id,
            comment_id: res.id,
            type: item.type,
          });
        });
      }
      else {
        app.model.tagCommentRelation.create({
          tag_id: tag.id,
          comment_id: res.id,
          type: tag.type,
        });
      }
    }
    if(res) {
      ctx.body = ctx.helper.okJSON(res);
    }
  }
}

module.exports = Controller;
