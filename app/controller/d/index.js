/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('dindex', {
    });
  }
}

module.exports = Controller;
