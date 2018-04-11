/**
 * Created by army8735 on 2018/3/17.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');

class Controller extends egg.Controller {
  async visit() {
    let uid = this.ctx.session.uid || 0;
    let ip = this.ctx.request.header['x-real-ip'];
    let uuid = this.ctx.query.uuid || '';
    let platform = this.ctx.query.platform || 0;
    let url = this.ctx.query.url || '';
    let search = this.ctx.query.search || '';
    let first = this.ctx.query.first === 'true' ? 1 : 0;
    let s = `INSERT INTO user_visit (uuid, uid, ip, platform, url, search, first, create_time)
      VALUES ('${uuid}', ${uid}, '${ip}', ${platform}, '${url}', '${search}', ${first}, NOW());`;
    await this.app.sequelizeStats.query(s, { type: Sequelize.QueryTypes.INSERT });
    this.ctx.body = {
      success: true,
    };
  }
}

module.exports = Controller;
