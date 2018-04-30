/**
 * Created by army8735 on 2017/10/9.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async loginOut() {
    const { ctx } = this;
    ctx.session = null;
    ctx.body = {
      success: true,
    };
  }

  async qr() {
    const { ctx } = this;
    await ctx.redirect('http://circling.cc');
  }
}

module.exports = Controller;
