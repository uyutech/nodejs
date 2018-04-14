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
    let albumId = parseInt(body.albumId);
    if(!albumId) {
      return;
    }
    let [info, author, imageList, commentList] = await Promise.all([
      service.imageAlbum.info(albumId),
      service.imageAlbum.author(albumId),
      service.imageAlbum.imageList(albumId, uid, 0, LIMIT),
      service.imageAlbum.commentList(albumId, uid, 0, LIMIT)
    ]);
    commentList.limit = LIMIT;
    author = service.works.reorderAuthor(author);
    ctx.body = ctx.helper.okJSON({
      info,
      imageList,
      author,
      commentList,
    });
  }

  async imageList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let albumId = parseInt(body.albumId);
    if(!albumId) {
      return;
    }
    let res = service.imageAlbum.imageList(albumId, uid, body.offset || 0, LIMIT);
    ctx.body = ctx.helper.okJSON(res);
  }

  async commentList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let albumId = parseInt(body.albumId);
    if(!albumId) {
      return;
    }
    let res = await service.imageAlbum.commentList(albumId, uid, body.offset || 0, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
