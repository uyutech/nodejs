/**
 * Created by army8735 on 2017/12/3.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let circleID = body.circleID;
      if(!circleID) {
        return;
      }
      let circleDetail = {};
      let postList = {};
      let res = yield {
        circleDetail: ctx.helper.postServiceJSON2('api/circling/GetCirclingDetails', {
          uid,
          circlingID: circleID,
        }),
        postList: ctx.helper.postServiceJSON2('api/circling/GetPostList', {
          uid,
          circlingID: circleID,
          Skip: 0,
          Take: 10,
        }),
      };
      if(res.circleDetail.data.success) {
        circleDetail = res.circleDetail.data.data;
      }
      if(res.postList.data.success) {
        postList = res.postList.data.data;
      }
      ctx.body = ctx.helper.okJSON({
        circleDetail,
        postList,
      });
    }
    * postList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let circleID = body.circleID;
      let skip = body.skip;
      let take = body.take;
      let res = yield ctx.helper.postServiceJSON2('api/circling/GetPostList', {
        uid,
        circlingID: circleID,
        Skip: skip,
        Take: take,
      });
      ctx.body = res.data;
    }
    * join(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let circleID = body.circleID;
      let state = body.state;
      if(state === 'true') {
        let res = yield ctx.helper.postServiceJSON2('api/circling/RemoveUserFollowCircling', {
          uid,
          circlingID: circleID,
        });
        ctx.body = res.data;
      }
      else {
        let res = yield ctx.helper.postServiceJSON2('api/circling/SaveUserFollowCircling', {
          uid,
          circlingID: circleID,
        });
        ctx.body = res.data;
      }
    }
    * post(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let circleID = body.circleID || '2019000000000000';
      let ids = circleID.split(',');
      if(ids.length > 3) {
        return ctx.body = {
          success: false,
          message: '最多只能选择3个圈子哦~',
        };
      }
      let content = (body.content || '').trim();
      let imgs = body.imgs;
      let widths = body.widths;
      let heights = body.heights;
      if(!Array.isArray(widths)) {
        widths = [];
      }
      if(!Array.isArray(heights)) {
        heights = [];
      }
      if(content.length < 3 || content.length > 4096) {
        return {
          success: false,
        };
      }
      ctx.logger.info('circleID %s', circleID);
      let res = yield ctx.helper.postServiceJSON2('api/Users_Comment/AddPost', {
        uid,
        CirclingIDList: circleID,
        SendContent: content,
        RootID: -3,
        ImageList: imgs
          ? JSON.stringify(imgs.map(function(item, i) {
            return {
              FileUrl: item,
              Width: widths[i] || 0,
              Height: heights[i] || 0,
            }
          }).slice(0, 10))
          : '',
      });
      let data = res.data;
      ctx.body = data;
    }
    * shield(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      if(!body.circleID) {
        return;
      }
      let res = yield ctx.helper.postServiceJSON2('api/circling/AddShieldCircling', {
        uid,
        CirclingID: body.circleID,
      });
      ctx.body = res.data;
    }
    * unShield(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      if(!body.circleID) {
        return;
      }
      let res = yield ctx.helper.postServiceJSON2('api/circling/RemoveShieldCircling', {
        uid,
        CirclingID: body.circleID,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
