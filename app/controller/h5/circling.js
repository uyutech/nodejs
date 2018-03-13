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
      let res = yield {
        hotCircleList: ctx.helper.postServiceJSON2('api/find/GetCirclingInfo', {
          uid,
          Skip: 0,
          Take: 10,
        }),
        postList: ctx.helper.postServiceJSON2('api/find/GetPostByCirclingIDS', {
          uid,
          Skip: 0,
          Take: 10,
        }),
      };
      if(res.hotCircleList.data.success) {
        hotCircleList = res.hotCircleList.data.data;
      }
      if(res.postList.data.success) {
        postList = res.postList.data.data;
      }
      let bannerList = [{
        url: '/post.html?postID=421617',
        title: '《御龙行》人物大竞猜',
        cover: '//zhuanquan.xyz/temp/e02d6be449b551fa850f9d1aba53e618.jpg-750__80',
      }, {
        url: '/post.html?postID=420534',
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
      });
    }
    * circleList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let skip = body.skip || 0;
      let take = body.take || 10;
      let res = ctx.helper.postServiceJSON2('api/find/GetPostByCirclingIDS', {
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
      let skip = body.skip;
      let take = body.take;
      let res = yield ctx.helper.postServiceJSON2('api/find/GetPostByCirclingIDS', {
        uid,
        Skip: skip,
        Take: take,
        CirclingID: circleId,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
