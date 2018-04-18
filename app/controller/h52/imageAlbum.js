/**
 * Created by army8735 on 2018/4/14.
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
    let [info, imageList, commentList] = await Promise.all([
      service.imageAlbum.infoPlusAuthor(id),
      service.imageAlbum.imageList(id, uid, 0, LIMIT),
      service.imageAlbum.commentList(id, uid, 0, LIMIT)
    ]);
    if(info.state === 3) {
      return;
    }
    imageList.limit = LIMIT;
    commentList.limit = LIMIT;
    ctx.body = ctx.helper.okJSON({
      info,
      imageList,
      commentList,
    });
  }

  async imageList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let offset = parseInt(body.offset) || 0;
    if(!id) {
      return;
    }
    let res = service.imageAlbum.imageList(id, uid, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
