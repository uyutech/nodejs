/**
 * Created by army8735 on 2018/8/7.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async sub() {
    const { app, ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let content = body.content;
    if(!id || !content) {
      return;
    }
    if(id === uid) {
      return ctx.body = ctx.helper.errorJSON('不能和自己发私信');
    }
    let isBlock = await service.user.isBlock(uid, id);
    let key = id < uid ? (id + '' + uid) : (uid + '' + id);
    let letter = await app.model.letter.create({
      user_id: uid,
      target_id: id,
      key,
      content,
      is_block: isBlock,
    }, {
      raw: true,
    });
    let now = new Date();
    let query = [
      app.model.letterRecent.upsert({
        user_id: uid,
        target_id: id,
        letter_id: letter.id,
        update_time: now,
      }, {
        where: {
          user_id: uid,
          target_id: id,
        },
      })
    ];
    if(!isBlock) {
      query.push(
        app.model.letterRecent.upsert({
          user_id: id,
          target_id: uid,
          letter_id: letter.id,
          update_time: now,
        }, {
          where: {
            user_id: id,
            target_id: uid,
          },
        })
      );
    }
    await Promise.all(query);
    ctx.body = ctx.helper.okJSON(letter);
  }
}

module.exports = Controller;
