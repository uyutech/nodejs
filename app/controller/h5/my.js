/**
 * Created by army8735 on 2018/4/3.
 */

'use strict';

const egg = require('egg');
const OSS = require('ali-oss').Wrapper;
const moment = require('moment');
const crypto = require('crypto');
const accessKeyId = 'LTAIzEfyjluscyEu';
const accessKeySecret = 'g33q7QDYf843NqwoqHblIqap9NmU3D';

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
      followPersonCount,
      fansCount,
    });
  }

  async relationList() {
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
    let offset = parseInt(body.offset) || 0;
    let res = await service.user.postList(uid, uid, offset, LIMIT, true);
    if(!res) {
      return;
    }
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async favorList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let kind = parseInt(body.kind);
    let offset = parseInt(body.offset) || 0;
    if(!kind) {
      return;
    }
    let res = await service.user.favorList(uid, kind, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async favorPostList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let offset = parseInt(body.offset) || 0;
    let list = await service.user.favorPostList(uid, offset, LIMIT);
    list.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(list);
  }

  async headUrl() {
    const { app, ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    if(!body.value) {
      return;
    }
    await app.model.user.update({
      head_url: body.value,
      update_time: new Date(),
    }, {
      where: {
        id: uid,
      },
      raw: true,
    });
    service.user.clearInfoCache(uid);
    ctx.body = ctx.helper.okJSON();
  }

  async sts() {
    const { ctx } = this;
    let body = ctx.request.body;
    let name = body.name;
    if(!name) {
      return;
    }
    // 检查是否已上传
    let client = new OSS({
      region: 'oss-cn-shanghai',
      accessKeyId: 'LTAIbZSVA2e931EB',
      accessKeySecret: '5v756TGc1Gv3gkg4rhzoe0OYyLe8Xc',
      bucket: 'circling-assets',
    });
    let check = await client.list({
      prefix: 'pic/' + name,
    });
    if(check.res && check.res.status === 200) {
      let objects = check.objects;
      if(objects && objects.length) {
        return ctx.body = ctx.helper.okJSON({
          exist: true,
        });
      }
    }
    let expire = Date.now() + 1000 * 60 * 5;
    let expiration = moment(expire).local();
    let host = 'https://circling-assets.oss-cn-shanghai.aliyuncs.com';
    let condition = ['content-length-range', 0, 10485760];
    let dir = '';
    let start = ['starts-with', accessKeySecret, dir];
    let conditions = [condition, start];
    let policy = JSON.stringify({
      expiration,
      conditions,
    });
    let base64_policy = new Buffer(policy).toString('base64');
    let hmac = crypto.createHmac('sha1', accessKeySecret);
    let signature = hmac.update(base64_policy).digest('base64');
    ctx.body = ctx.helper.okJSON({
      accessKeyId,
      host,
      expire,
      policy: base64_policy,
      signature,
      dir,
      prefix: 'pic/',
    });
  }

  async stsAudio() {
    const { ctx } = this;
    let body = ctx.request.body;
    let name = body.name;
    if(!name) {
      return;
    }
    // 检查是否已上传
    let client = new OSS({
      region: 'oss-cn-shanghai',
      accessKeyId: 'LTAIbZSVA2e931EB',
      accessKeySecret: '5v756TGc1Gv3gkg4rhzoe0OYyLe8Xc',
      bucket: 'circling-av',
    });
    let check = await client.list({
      prefix: 'audio/' + name,
    });
    if(check.res && check.res.status === 200) {
      let objects = check.objects;
      if(objects && objects.length) {
        return ctx.body = ctx.helper.okJSON({
          exist: true,
        });
      }
    }
    let expire = Date.now() + 1000 * 60 * 5;
    let expiration = moment(expire).local();
    let host = 'https://circling-av.oss-cn-shanghai.aliyuncs.com';
    let condition = ['content-length-range', 0, 1024 * 1024 * 20];
    let dir = '';
    let accessKeyId = 'LTAINFF0PxsurnhN';
    let accessKeySecret = '1XJ3okp5nNGMAHfzdVlSd2bFVXDcDr';
    let start = ['starts-with', accessKeySecret, dir];
    let conditions = [condition, start];
    let policy = JSON.stringify({
      expiration,
      conditions,
    });
    let base64_policy = new Buffer(policy).toString('base64');
    let hmac = crypto.createHmac('sha1', accessKeySecret);
    let signature = hmac.update(base64_policy).digest('base64');
    ctx.body = ctx.helper.okJSON({
      accessKeyId,
      host,
      expire,
      policy: base64_policy,
      signature,
      dir,
      prefix: 'audio/',
    });
  }

  async stsVideo() {
    const { ctx } = this;
    let body = ctx.request.body;
    let name = body.name;
    if(!name) {
      return;
    }
    // 检查是否已上传
    let client = new OSS({
      region: 'oss-cn-shanghai',
      accessKeyId: 'LTAIbZSVA2e931EB',
      accessKeySecret: '5v756TGc1Gv3gkg4rhzoe0OYyLe8Xc',
      bucket: 'circling-av',
    });
    let check = await client.list({
      prefix: 'video/' + name,
    });
    if(check.res && check.res.status === 200) {
      let objects = check.objects;
      if(objects && objects.length) {
        return ctx.body = ctx.helper.okJSON({
          exist: true,
        });
      }
    }
    let expire = Date.now() + 1000 * 60 * 10;
    let expiration = moment(expire).local();
    let host = 'https://circling-av.oss-cn-shanghai.aliyuncs.com';
    let condition = ['content-length-range', 0, 1024 * 1024 * 100];
    let dir = '';
    let accessKeyId = 'LTAIREhaN567xzy6';
    let accessKeySecret = 'hYxyTHOG5tWePi3bO9x5jbxRJ7BYbb';
    let start = ['starts-with', accessKeySecret, dir];
    let conditions = [condition, start];
    let policy = JSON.stringify({
      expiration,
      conditions,
    });
    let base64_policy = new Buffer(policy).toString('base64');
    let hmac = crypto.createHmac('sha1', accessKeySecret);
    let signature = hmac.update(base64_policy).digest('base64');
    ctx.body = ctx.helper.okJSON({
      accessKeyId,
      host,
      expire,
      policy: base64_policy,
      signature,
      dir,
      prefix: 'video/',
    });
  }

  async nickname() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let nickname = (body.value || '').trim();
    if(!nickname) {
      return;
    }
    if(nickname.length < 2 || nickname.length > 8) {
      return ctx.body = ctx.helper.errorJSON('昵称长度需要在2~8个字之间哦~');
    }
    let exist = await app.model.user.findOne({
      attributes: [
        'id'
      ],
      where: {
        nickname,
      },
      raw: true,
    });
    if(exist) {
      return ctx.body = ctx.helper.errorJSON('这个昵称已经存在，换一个吧~');
    }
    await app.model.user.update({
      nickname,
      update_time: new Date(),
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
      update_time: new Date(),
    }, {
      where: {
        id: uid,
      },
      raw: true,
    });
    service.user.clearInfoCache(uid);
    ctx.body = ctx.helper.okJSON();
  }

  async commentList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let offset = parseInt(body.offset) || 0;
    let res = await service.user.messageList(uid, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async unreadMessageCount() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let res = await service.user.unreadMessageCount(uid);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unreadNotifyCount() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let res = await service.user.unreadNotifyCount(uid);
    ctx.body = ctx.helper.okJSON(res);
  }

  async letterList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let offset = parseInt(body.offset) || 0;
    let res = await service.user.letterList(uid, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async unreadMessageCountWithRecentLetter() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let [count, letter] = await Promise.all([
      service.user.unreadMessageCount(uid),
      service.user.recentLetter(uid, 0, LIMIT)
    ]);
    letter.limit = LIMIT;
    ctx.body = ctx.helper.okJSON({
      count,
      letter,
    });
  }

  async recentLetter() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let offset = parseInt(body.offset) || 0;
    let res = await service.user.recentLetter(uid, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async dialogList() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let offset = parseInt(body.offset) || 0;
    if(!id) {
      return;
    }
    let res = await service.user.dialogList(uid, id, offset, LIMIT);
    res.limit = LIMIT;
    ctx.body = ctx.helper.okJSON(res);
  }

  async readLetter() {
    const { ctx, app } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let idList = body.idList;
    if(!idList) {
      return;
    }
    let now = new Date();
    let res = await app.model.letter.update({
      is_read: true,
      update_time: now,
    }, {
      where: {
        id: idList,
        target_id: uid,
      },
    });
    app.redis.del('letterUnreadCount_' + uid);
    ctx.body = ctx.helper.okJSON(res);
  }

  async unReadLetterCount() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = body.id;
    if(!id) {
      return;
    }
    let res = await service.user.unReadLetterCount(id, uid);
    ctx.body = ctx.helper.okJSON(res);
  }

  async settle() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    if(!body.authorId) {
      return;
    }
    let type = parseInt(body.type);
    if(!type || type < 1 || type > 3) {
      return;
    }
    let res = await service.user.updateAuthorSettle(uid, body.authorId, type);
    service.user.clearInfoCache(uid);
    if(res) {
      ctx.body = ctx.helper.okJSON(res);
    }
  }

  async guideNameAndSex() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let nickname = (body.nickname || '').trim();
    if(!nickname) {
      return;
    }
    if(nickname.length < 2 || nickname.length > 8) {
      return ctx.body = ctx.helper.errorJSON('昵称长度需要在2~8个字之间哦~');
    }
    let sex = parseInt(body.sex) || 0;
    if(sex < 0 || sex > 3) {
      return;
    }
    let exist = await app.model.user.findOne({
      attributes: [
        'id'
      ],
      where: {
        nickname,
      },
      raw: true,
    });
    if(exist && exist.id !== uid) {
      return ctx.body = ctx.helper.errorJSON('这个昵称已经存在，换一个吧~');
    }
    let res = await app.model.user.update({
      nickname,
      sex,
      reg_state: 11,
    }, {
      where: {
        id: uid,
      },
      raw: true,
    });
    service.user.clearInfoCache(uid);
    ctx.body = ctx.helper.okJSON(res);
  }

  async guideCircle() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let idList = body.ids.split(',');
    if(idList) {
      let tagList = await app.model.circleTagRelation.findAll({
        attributes: [
          ['tag_id', 'tagId']
        ],
        where: {
          circle_id: idList,
          type: 1,
        },
        raw: true,
      });
      let tagIdList = tagList.map((item) => {
        return item.tagId;
      });
      let query = idList.map((id) => {
        return app.model.userCircleRelation.upsert({
          user_id: uid,
          circle_id: id,
          type: 1,
        }, {
          where: {
            user_id: uid,
            circle_id: id,
          },
          raw: true,
        });
      });
      tagIdList.forEach((id) => {
        app.model.userTagRelation.upsert({
          user_id: uid,
          tag_id: id,
          ref: 1,
          type: 1,
        }, {
          where: {
            user_id: uid,
            tag_id: id,
          },
          raw: true,
        });
      });
      await query;
    }
    app.model.user.update({
      reg_state: 12,
    }, {
      where: {
        id: uid,
      },
    });
    service.user.clearInfoCache(uid);
    ctx.body = ctx.helper.okJSON();
  }

  async guideAuthor() {
    const { ctx, app, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let idList = body.ids.split(',');
    if(idList) {
      let query = idList.map((id) => {
        return app.model.userPersonRelation.upsert({
          user_id: uid,
          target_id: id,
          type: 3,
        }, {
          where: {
            target_id: id,
          },
          raw: true,
        })
      });
      await query;
    }
    app.model.user.update({
      reg_state: 99,
    }, {
      where: {
        id: uid,
      },
      raw: true,
    });
    service.user.clearInfoCache(uid);
    ctx.body = ctx.helper.okJSON();
  }

  async address() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let res = await service.user.address(uid);
    ctx.body = ctx.helper.okJSON(res);
  }

  async updateAddressName() {
    const { ctx, app } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let value = body.value;
    if(!id || !value) {
      return;
    }
    if(value.length > 32) {
      ctx.body = ctx.helper.errorJSON('名字不能超过32个字~');
    }
    let res = await app.model.userAddress.update({
      name: value,
    }, {
      where: {
        id,
        user_id: uid,
      },
      raw: true,
    });
    if(res.length) {
      ctx.body = ctx.helper.okJSON();
    }
  }

  async updateAddressPhone() {
    const { ctx, app } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let value = body.value;
    if(!id || !value) {
      return;
    }
    if(!/^1\d{10}$/.test(value)) {
      return ctx.body = ctx.helper.errorJSON({
        message: '手机号不合法~',
      });
    }
    let res = await app.model.userAddress.update({
      phone: value,
    }, {
      where: {
        id,
        user_id: uid,
      },
      raw: true,
    });
    if(res.length) {
      ctx.body = ctx.helper.okJSON();
    }
  }

  async updateAddress() {
    const { ctx, app } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    let value = body.value;
    if(!id || !value) {
      return;
    }
    let res = await app.model.userAddress.update({
      address: value,
    }, {
      where: {
        id,
        user_id: uid,
      },
      raw: true,
    });
    if(res.length) {
      ctx.body = ctx.helper.okJSON();
    }
  }
}

module.exports = Controller;
