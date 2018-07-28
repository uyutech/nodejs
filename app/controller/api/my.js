/**
 * Created by army8735 on 2017/11/18.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async allIdentities() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let [user, author] = await Promise.all([
      service.user.info(uid),
      service.user.author(uid)
    ]);
    if(!user) {
      return;
    }
    author = author.map((item) => {
      return {
        id: item.id,
        name: item.name,
        headUrl: item.headUrl,
        isSettle: item.isSettle,
        type: item.type,
        settle: item.settle,
      };
    });
    ctx.body = ctx.helper.okJSON({
      user,
      author,
    });
  }
}

module.exports = Controller;
