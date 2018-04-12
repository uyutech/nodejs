/**
 * Created by army8735 on 2018/4/3.
 */

'use strict';

const egg = require('egg');

const LIMIT = 10;
const PERSON_LIMIT = 30;

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let [user, author, followPersonCount, fansCount] = await Promise.all([
      service.user.info(uid),
      service.user.author(uid),
      service.user.followPersonCount(uid),
      service.user.fansCount(uid)
    ]);
    author = author.map((item) => {
      return {
        id: item.id,
        name: item.name,
        headUrl: item.headUrl,
        isSettle: item.isSettle,
        type: item.type,
      };
    });
    ctx.body = ctx.helper.okJSON({
      user,
      author,
      followPersonCount,
      fansCount,
    });
  }

  async relation() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let [friendList, followUserList, fansList, followAuthorList] = await Promise.all([
      service.user.friendList(uid, 0, PERSON_LIMIT),
      service.user.followUserList(uid, 0, PERSON_LIMIT),
      service.user.fansList(uid, 0, PERSON_LIMIT),
      service.user.followAuthorList(uid, 0, PERSON_LIMIT)
    ]);
    friendList.limit = PERSON_LIMIT;
    followUserList.limit = PERSON_LIMIT;
    fansList.limit = PERSON_LIMIT;
    followAuthorList.PERSON_LIMIT = PERSON_LIMIT;
    ctx.body = ctx.helper.okJSON({
      friendList,
      followUserList,
      fansList,
      followAuthorList,
    });
  }

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

  async nickname() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    if(!body.value) {
      return;
    }
    await app.model.user.update({
      nickname: body.value,
    }, {
      where: {
        id: uid,
      },
      raw: true,
    });
    service.user.clearInfoCache(uid);
    ctx.body = ctx.helper.okJSON();
  }

  async sign() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    if(!body.value) {
      return;
    }
    await app.model.user.update({
      sign: body.value,
    }, {
      where: {
        id: uid,
      },
      raw: true,
    });
    service.user.clearInfoCache(uid);
    ctx.body = ctx.helper.okJSON();
  }

  async message() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let offset = parseInt(body.offset) || 0;
    let res = await service.user.messageList(uid, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
