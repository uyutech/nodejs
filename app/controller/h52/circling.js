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
          'url',
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
    let offset = parseInt(body.offset) || 0;
    let res = await service.circle.all(offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async postList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let circleId = (body.circleId || '').split(',');
    let offset = parseInt(body.offset) || 0;
    let res;
    if(circleId.length && circleId[0]) {
      let query = await Promise.all(
        circleId.map((id) => {
          return service.circle.postList(id, uid, offset, LIMIT);
        })
      );
      res = {
        data: [],
        count: 0,
      };
      query.forEach((item) => {
        res.data = res.data.concat(item.data);
        res.count += item.count;
      });
    }
    else {
      res = await service.post.all(uid, offset, LIMIT);
    }
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
