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
    let albumId = parseInt(body.albumId);
    if(!albumId) {
      return;
    }
    let [info, collection, commentList] = await Promise.all([
      service.musicAlbum.infoPlusAuthor(albumId),
      service.musicAlbum.collectionFull(albumId, uid),
      service.musicAlbum.commentList(albumId, uid, 0, LIMIT)
    ]);
    if(info.state === 3) {
      return;
    }
    commentList.limit = LIMIT;
    ctx.body = ctx.helper.okJSON({
      info,
      collection,
      commentList,
    });
  }

  async commentList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let albumId = parseInt(body.albumId);
    let offset = parseInt(body.offset) || 0;
    if(!albumId) {
      return;
    }
    let res = await service.musicAlbum.commentList(albumId, uid, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
