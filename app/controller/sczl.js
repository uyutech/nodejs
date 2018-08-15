/**
 * Created by army8735 on 2018/8/15.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let [originWorks] = await Promise.all([
      service.activity.sczlOriginWorks()
    ]);
    await ctx.render('sczl_home', {
      originWorks,
    });
  }

  async upload() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let [originWorks] = await Promise.all([
      service.activity.sczlOriginWorks()
    ]);
    await ctx.render('sczl_upload', {
      originWorks,
    });
  }
}

module.exports = Controller;
