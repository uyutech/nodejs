/**
 * Created by army8735 on 2018/4/3.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;

class Controller extends egg.Controller {
  async postList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let res = await service.user.postList(uid, body.offset || 0, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }
  async favorList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let [videoList, audioList, imageList, postList] = await Promise.all([
      service.user.favorVideoList(uid, 0, LIMIT),
      service.user.favorAudioList(uid, 0, LIMIT),
      service.user.favorImageList(uid, 0, LIMIT),
      service.user.favorPostList(uid, 0, LIMIT)
    ]);
    videoList.limit = LIMIT;
    audioList.limit = LIMIT;
    imageList.limit = LIMIT;
    postList.limit = LIMIT;
    ctx.body = ctx.helper.okJSON({
      videoList,
      audioList,
      imageList,
      postList,
    });
  }
}

module.exports = Controller;
