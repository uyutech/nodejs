/**
 * Created by army8735 on 2017/12/12.
 */

'use strict';

const egg = require('egg');
const moment = require('moment');
const Sequelize = require('sequelize');

class Controller extends egg.Controller {
  async index() {
    let uid = this.ctx.session.uid || 0;
    let ip = this.ctx.request.header['x-real-ip'];
    let uuid = this.ctx.query.uuid || '';
    let platform = this.ctx.query.platform || 0;
    let url = this.ctx.query.url || '';
    let search = this.ctx.query.search || '';
    let first = this.ctx.query.first === 'true' ? 1 : 0;
    let date = moment().format('YYYYMMDD');
    let s = `INSERT INTO user_visit (uuid, uid, ip, platform, url, search, first, create_time, create_date)
    VALUES ('${uuid}', ${uid}, '${ip}', ${platform}, '${url}', '${search}', ${first}, NOW(), ${date});`;
    await this.app.sequelizeStats.query(s, { type: Sequelize.QueryTypes.INSERT });
    this.ctx.body = {
      success: true,
    };
  }
}

module.exports = Controller;
