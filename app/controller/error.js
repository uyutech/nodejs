/**
 * Created by army8735 on 2017/10/2.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async c404() {
    const { ctx } = this;
    await ctx.render('404.html');
  }

  async qr() {
    const { ctx } = this;
    await ctx.redirect('http://circling.cc');
  }
}

module.exports = Controller;
