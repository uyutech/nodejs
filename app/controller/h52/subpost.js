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
    let uid = ctx.session.uid;
    let circleList;
    if(uid) {
      circleList = await service.user.circleList(uid, 0, LIMIT);
    }
    else {
      circleList = await service.circle.all(0, LIMIT);
    }
    let idList = [];
    circleList.data.forEach((item) => {
      delete item.describe;
      delete item.banner;
      delete item.cover;
      delete item.type;
      delete item.typeName;
      idList.push(item.id);
    });
    let tagList = await service.circle.tagList(idList, 2);
    circleList.limit = LIMIT;
    circleList.data.forEach((item, i) => {
      item.tag = tagList[i];
    });

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
      activity,
    });
  }

  async sub() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let content = body.content;
    let image = body.image;
    let circleId = body.circleId;
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
    if(!circleId.length || circleId.length > 3) {
      return;
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
    let [tagList, tagIdList] = await Promise.all([
      service.circle.tagList(circleId, 1),
      service.tag.idListByName(tagNameList)
    ]);
    let tagId = [];
    let tagHash = {};
    tagList.map((item) => {
      if(item) {
        item.forEach(function(tag) {
          if(!tagHash[tag.id]) {
            tagHash[tag.id] = true;
            tagId.push(tag.id);
          }
        });
      }
    });
    let res = await service.post.add(uid, {
      content,
      tagId,
      tagIdList,
      image,
      authorId: body.authorId,
    });
    if(res) {
      ctx.body = ctx.helper.okJSON(res);
    }
  }
}

module.exports = Controller;
