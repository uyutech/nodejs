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
    let [friendList, followUserList, fansList, followAuthorList] = await Promise.all([
      service.user.friendList(uid, 0, limit),
      service.user.followUserList(uid, 0, limit),
      service.user.fansList(uid, 0, limit),
      service.user.followAuthorList(uid, 0, limit)
    ]);
    friendList.limit = limit;
    followUserList.limit = limit;
    fansList.limit = limit;
    followAuthorList.limit = limit;
    ctx.body = ctx.helper.okJSON({
      friendList,
      followUserList,
      fansList,
      followAuthorList,
    });
  }
}

module.exports = Controller;
