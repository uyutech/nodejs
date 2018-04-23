/**
 * Created by army8735 on 2017/12/12.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { app, ctx } = this;
    let uid = ctx.session.uid || 0;
    let ip = ctx.request.header['x-real-ip'];
    let uuid = ctx.query.uuid || '';
    let platform = parseInt(ctx.query.platform) || 0;
    let url = ctx.query.url || '';
    let search = ctx.query.search || '';
    let first = ctx.query.first === 'true';
    await app.model.userVisit.create({
      uuid,
      uid,
      ip,
      platform,
      url,
      search,
      first,
    });
    ctx.body = {
      success: true,
    };
  }
}

module.exports = Controller;
