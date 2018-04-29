/**
 * Created by army8735 on 2018/4/29.
 */

'use strict';

const utility = require('utility');
const egg = require('egg');

class Controller extends egg.Controller {
  async session() {
    const { ctx } = this;
    let sessionid = ctx.request.body.sessionid;
    if(!sessionid) {
      return ctx.body = ctx.helper.errorJSON();
    }
    sessionid = utility.base64decode(sessionid, true, 'buffer');
    if(!sessionid) {
      return ctx.body = ctx.helper.errorJSON();
    }
    sessionid = ctx.cookies.keys.decrypt(sessionid).value.toString();
    if(!sessionid) {
      return ctx.body = ctx.helper.errorJSON();
    }
    sessionid = new Buffer(sessionid, 'base64').toString();
    if(!sessionid) {
      return ctx.body = ctx.helper.errorJSON();
    }
    sessionid = JSON.parse(sessionid);
    ctx.body = ctx.helper.okJSON({
      uid: sessionid.uid,
      nickname: sessionid.nickname,
    });
  }
}

module.exports = Controller;
