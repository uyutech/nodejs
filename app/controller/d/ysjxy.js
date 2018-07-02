/**
 * Created by army8735 on 2018/6/29.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let { info, originWorks } = await service.activity.ysjxy();
    await ctx.render('ysjxy2', {
      info,
      originWorks,
    });
  }

  async upload() {
    const { ctx, service } = this;
    let { info, originWorks } = await service.activity.ysjxy();
    await ctx.render('upload', {
      info,
      originWorks,
    });
  }
}

module.exports = Controller;
