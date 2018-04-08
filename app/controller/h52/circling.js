/**
 * Created by army8735 on 2018/4/6.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

const LIMIT = 10;

class Controller extends egg.Controller {
  async index() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let [bannerList, circleList, postList] = await Promise.all([
      app.model.banner.findAll({
        attributes: [
          'title',
          'pic',
          ['target_id', 'targetId'],
          'type'
        ],
        where: {
          position: 1,
          is_delete: false,
        },
        order: [
          ['weight', 'DESC']
        ]
      }),
      service.circle.all(0, LIMIT),
      service.post.allData(0, LIMIT)
    ]);
    if(circleList) {
      circleList.limit = LIMIT;
    }
    if(postList) {
      postList = await service.comment.plusListFull(postList, uid);
      postList = {
        data: postList,
        count: 100,
        limit: LIMIT,
      };
    }
    ctx.body = ctx.helper.okJSON({
      bannerList,
      circleList,
      postList,
    });
  }

  async circleList() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let offset = body.offset || 0;
    offset = parseInt(offset) || 0;
    let res = await service.circle.all(offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async postList() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let offset = body.offset || 0;
    offset = parseInt(offset) || 0;
    let post = await service.post.allData(offset, LIMIT);
    post = await service.comment.plusListFull(post, uid);
    ctx.body = ctx.helper.okJSON({
      data: post,
      count: 100,
      limit: LIMIT,
    });
  }
}

module.exports = Controller;
