/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

// const ALY = require("aliyun-sdk");

module.exports = app => {
  class Controller extends app.Controller {
    * join(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let circleID = body.circleID;
      let state = body.state;
      if(state === 'true') {
        let res = yield ctx.helper.postServiceJSON('api/tag/RemoveTagToUser', {
          uid,
          TagID: circleID,
        });
        ctx.body = res.data;
      }
      else {
        let res = yield ctx.helper.postServiceJSON('api/tag/SaveTagToUser', {
          uid,
          TagID: circleID,
        });
        ctx.body = res.data;
      }
    }
    * add(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let circleID = body.circleID;
      let content = (body.content || '').trim();
      let imgs = body.imgs;
      if(content.length < 3 || content.length > 512) {
        return {
          success: false,
        };
      }
      // let jaq = new ALY.JAQ({
      //   accessKeyId: 'LTAIN9cQrKIIscBn',
      //   secretAccessKey: '4TWusjSuUoBtosh6t15E6pPXKba35U',
      //   endpoint: 'http://jaq.aliyuncs.com',
      //   apiVersion: '2016-11-23',
      // });
      let res = yield ctx.helper.postServiceJSON('api/tag/AddPost', {
        uid,
        TagID: circleID,
        Content: content,
        Title: '',
        ImageList: imgs
          ? JSON.stringify(imgs.map(function(item) {
            return {
              FileUrl: item,
              Width: 0,
              Height: 0,
            }
          }).slice(0, 10))
          : '',
      });
      ctx.body = res.data;
    }
    * list(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let circleID = body.circleID;
      let skip = body.skip;
      let take = body.take;
      let res = yield ctx.helper.postServiceJSON('api/tag/GetTagPost', {
        uid,
        TagID: circleID,
        Skip: skip,
        Take: take,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};