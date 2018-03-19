/**
 * Created by army8735 on 2017/12/3.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let hotCircleList = {};
      let postList = {};
      let top1 = {};
      let top2 = {};
      let res = yield {
        hotCircleList: ctx.helper.postServiceJSON2('api/find/GetCirclingInfo', {
          uid,
          Skip: 0,
          Take: 10,
        }),
        top1: ctx.helper.postServiceJSON2('api/find/GetPostByRecommend', {
          Min: 1,
          Max: 99,
          uid,
          Skip: 0,
          take: 3,
        }),
        // top2: ctx.helper.postServiceJSON2('api/find/GetPostByRecommend', {
        //   Min: 0,
        //   Max: 3,
        //   uid,
        //   Skip: 0,
        //   take: 1,
        // }),
        postList: ctx.helper.postServiceJSON2('api/find/GetPostByCirclingIDS', {
          uid,
          Skip: 0,
          Take: 10,
        }),
      };
      if(res.hotCircleList.data.success) {
        hotCircleList = res.hotCircleList.data.data;
      }
      if(res.top1.data.success) {
        top1 = res.top1.data.data;
      }
      // if(res.top2.data.success) {
      //   top2 = res.top2.data.data;
      // }
      if(res.postList.data.success) {
        postList = res.postList.data.data;
      }
      let bannerList = [{
        url: '/post.html?postID=430048',
        title: '今时古梦',
        cover: '//zhuanquan.xyz/temp/a88c2f9f35fc8b77fd93a5d3745dfe34.jpg-750__80',
      }, {
        url: '/post.html?postID=426586',
        title: '圈访谈',
        cover: '//zhuanquan.xyz/temp/d0cbdfb5b30a949ca97081ebf6e2490f.jpg-750__80',
      }, {
        url: '/post.html?postID=430776',
        title: '圈友你很皮',
        cover: '//zhuanquan.xyz/temp/b9637f5c3c56713a2d0d3e3aa838eba3.jpg-750__80',
      }, {
        url: '/post.html?postID=421610',
        title: '每天画个圈，玩转每个圈',
        cover: '//zhuanquan.xyz/temp/b6f1796d3bc4af108d87fc36e318124a.jpg-750__80',
      }];
      ctx.body = ctx.helper.okJSON({
        bannerList,
        hotCircleList,
        postList,
        circleTake: 10,
        take: 10,
        top1,
        top2,
      });
    }
    * circleList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let skip = body.skip || 0;
      let take = body.take || 10;
      let res = yield ctx.helper.postServiceJSON2('api/find/GetCirclingInfo', {
        uid,
        Skip: skip,
        Take: take,
      });
      ctx.body = res.data;
    }
    * postList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let circleId = body.circleId;
      let postList = {};
      let skip = body.skip;
      let take = body.take;
      let top1 = {};
      if(skip === '0') {
        let res = yield {
          top1: ctx.helper.postServiceJSON2('api/find/GetPostByRecommend', {
            Min: 1,
            Max: 99,
            uid,
            Skip: 0,
            take: 3,
          }),
          postList: ctx.helper.postServiceJSON2('api/find/GetPostByCirclingIDS', {
            uid,
            Skip: skip,
            Take: take,
            CirclingID: circleId,
          }),
        };
        if(!circleId && res.top1.data.success) {
          top1 = res.top1.data.data;
        }
        if(res.postList.data.success) {
          postList = res.postList.data.data;
        }
      }
      else {
        let res = yield ctx.helper.postServiceJSON2('api/find/GetPostByCirclingIDS', {
          uid,
          Skip: skip,
          Take: take,
          CirclingID: circleId,
        });
        if(res.data.success) {
          postList = res.data.data;
        }
      }
      ctx.body = ctx.helper.okJSON({
        postList,
        top1,
      });
    }
  }
  return Controller;
};
