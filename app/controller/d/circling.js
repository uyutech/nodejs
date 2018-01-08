/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

let tags = require('../../tags');

let hash = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '0': '天'
};

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let activityLabel = [
        {
          TagName: '日记',
          value: '#日记# ' + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日 星期' + hash[new Date().getDay()] + '\n',
        },
        {
          TagName: '31天挑战',
          more: true,
        },
        {
          TagName: '我的2017',
        },
        {
          TagName: '展望2018',
        },
        {
          TagName: '陪转圈一起长大',
        }
      ];
      let uid = ctx.session.uid;
      let myCircleList = {};
      let postList = {};
      let res = yield {
        myCircleList: ctx.helper.postServiceJSON2('api/Circling/GetAddPostCircling', {
          uid,
          Skip: 0,
          Take: 6,
        }),
        postList: ctx.helper.postServiceJSON2('api/find/Hot_Post_List', {
          uid,
          Skip: 0,
          Take: 30,
        }),
      };
      if(res.myCircleList.data.success) {
        myCircleList = res.myCircleList.data.data;
      }
      if(res.postList.data.success) {
        postList = res.postList.data.data;
      }
      yield ctx.render('dcircling', {
        myCircleList,
        postList,
        activityLabel,
        tags,
      });
    }
  }

  return Controller;
};
