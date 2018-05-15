/**
 * Created by army8735 on 2018/4/13.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let [info, collection, commentList] = await Promise.all([
      service.musicAlbum.infoPlusAllAuthor(id),
      service.musicAlbum.collectionFull(id, uid, true),
      service.musicAlbum.commentList(id, uid, 0, LIMIT)
    ]);
    if(!info || info.state === 3) {
      return;
    }
    commentList.limit = LIMIT;
    ctx.body = ctx.helper.okJSON({
      info,
      collection,
      commentList,
    });
  }
}

module.exports = Controller;
