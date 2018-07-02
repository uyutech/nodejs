/**
 * Created by army8735 on 2017/10/16.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('rhyme', {
    });
  }

  async ysjxy() {
    const { ctx, service } = this;
    let { info, originWorks } = await service.activity.ysjxy();
    await ctx.render('ysjxy', {
      info,
      originWorks,
    });
  }

  async upload() {
    const { ctx, service } = this;
    await ctx.render('upload', {
    });
  }
}

module.exports = Controller;
