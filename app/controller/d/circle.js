/**
 * Created by army8735 on 2017/11/5.
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
          TagName: '陪转圈一起长大',
        }
      ];
      let uid = ctx.session.uid;
      let circleID = ctx.params.circleID;
      if(!circleID) {
        return;
      }
      let circleDetail = {};
      let stick = [];
      let postList = {};
      let myCircleList = {};
      let tagList = [];
      let res = yield {
        circleDetail: ctx.helper.postServiceJSON2('api/circling/GetCirclingDetails', {
          uid,
          circlingID: circleID,
        }),
        stick: ctx.helper.postServiceJSON2('api/Circling/GetTopPostList', {
          uid,
          circlingID: circleID,
        }),
        postList: ctx.helper.postServiceJSON2('api/circling/GetPostList', {
          uid,
          circlingID: circleID,
          Skip: 0,
          Take: 10,
        }),
        myCircleList: ctx.helper.postServiceJSON2('api/Circling/GetAddPostCircling', {
          uid,
          Skip: 0,
          Take: 10,
        }),
        tagList: circleID ? ctx.helper.postServiceJSON2('api/circling/GetActivityTag', {
          uid,
          CirclingIDList: circleID,
        }) : null,
      };
      if(res.circleDetail.data.success) {
        circleDetail = res.circleDetail.data.data;
      }
      if(res.stick.data.success) {
        stick = res.stick.data.data.data;
      }
      if(res.postList.data.success) {
        postList = res.postList.data.data;
      }
      if(res.myCircleList.data.success) {
        myCircleList = res.myCircleList.data.data;
      }
      if(res.tagList && res.tagList.data.success) {
        tagList = res.tagList.data.data;
      }
      yield ctx.render('dcircle', {
        uid,
        circleID,
        circleDetail,
        stick,
        postList,
        myCircleList,
        tagList,
        activityLabel,
        tags,
      });
    }
  }
  return Controller;
};
