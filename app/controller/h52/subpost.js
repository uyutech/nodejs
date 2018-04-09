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
}

module.exports = Controller;
