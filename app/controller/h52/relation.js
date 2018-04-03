/**
 * Created by army8735 on 2018/4/3.
 */

'use strict';

const egg = require('egg');

const limit = 30;

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let [friend, followUser, fans, followAuthor] = await Promise.all([
      service.user.friend(uid, 0, limit),
      service.user.followUser(uid, 0, limit),
      service.user.fans(uid, 0, limit),
      service.user.followAuthor(uid, 0, limit)
    ]);
    friend.limit = limit;
    followUser.limit = limit;
    fans.limit = limit;
    followAuthor.limit = limit;
    ctx.body = ctx.helper.okJSON({
      friend,
      followUser,
      fans,
      followAuthor,
    });
  }
}

module.exports = Controller;
