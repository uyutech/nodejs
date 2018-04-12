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
      service.post.all(uid, 0, LIMIT)
    ]);
    if(circleList) {
      circleList.limit = LIMIT;
    }
    postList.limit = LIMIT;
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
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let circleId = (body.circleId || '').split(',');
    let offset = body.offset || 0;
    offset = parseInt(offset) || 0;
    let res;
    if(circleId.length) {
      let tagIdList = await service.circle.tagIdList(circleId);
      let temp = [];
      let hash = {};
      tagIdList.forEach((arr) => {
        arr.forEach((item) => {
          if(!hash[item]) {
            hash[item] = true;
            temp.push(item);
          }
        });
      });
      if(temp.length) {
        res = await service.tag.listPostList(temp, uid, offset, LIMIT);
      }
    }
    if(!res) {
      res = await service.post.all(uid, offset, LIMIT);
    }
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
