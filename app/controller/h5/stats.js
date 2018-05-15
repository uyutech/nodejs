/**
 * Created by army8735 on 2018/3/17.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async visit() {
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
    }, {
      raw: true,
    });
    ctx.body = {
      success: true,
    };
  }

  async action() {
    const { app, ctx } = this;
    let uid = ctx.session.uid || 0;
    let actionId = parseInt(ctx.query.actionId) || 0;
    let uuid = ctx.query.uuid || '';
    let param = ctx.query.param;
    if(param === 'undefined') {
      param = null;
    }
    param = JSON.parse(param || 'null');
    await app.model.userAction.create({
      action_id: actionId,
      uuid,
      uid,
      param,
    }, {
      raw: true,
    });
    ctx.body = {
      success: true,
    };
  }
}

module.exports = Controller;
