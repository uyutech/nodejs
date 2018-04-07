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
    let [personList, circleList] = await Promise.all([
      service.user.followPersonList(uid, 0, LIMIT),
      service.user.circleList(uid, 0, LIMIT)
    ]);
    ctx.body = ctx.helper.okJSON({
      personList,
      circleList,
    });
  }
}

module.exports = Controller;
