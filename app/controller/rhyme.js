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
    ctx.redirect('https://circling.cc/ysjxy');
    // let [ info, originWorks ] = await Promise.all([
    //   service.activity.ysjxyInfo(),
    //   service.activity.ysjxyOriginWorks()
    // ]);
    // await ctx.render('ysjxy', {
    //   info,
    //   originWorks,
    //   fcList: { data: [], count: 0 },
    //   hhList: { data: [], count: 0 },
    // });
  }

  async upload() {
    const { ctx, service } = this;
    await ctx.render('upload', {
    });
  }
}

module.exports = Controller;
