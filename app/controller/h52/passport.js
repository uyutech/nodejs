/**
 * Created by army8735 on 2018/4/10.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async login() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let phone = body.phone;
    let pw = body.pw;
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return ctx.body = ctx.helper.errorJSON({
        message: '手机号不合法~',
      });
    }
    if(!pw || pw.length < 6) {
      return ctx.body = ctx.helper.errorJSON({
        message: '密码长度不符合要求~',
      });
    }
    let res = await service.passport.check(phone, pw);
    if(!res.success) {
      return ctx.body = ctx.helper.errorJSON({
        message: res.message,
      });
    }
    let uid = res.data;
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
    ctx.session.uid = uid;
    ctx.body = ctx.helper.okJSON({
      user,
      author,
      followPersonCount,
      fansCount,
    });
  }

  async loginWeibo() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let openId = body.openId;
    let token = body.token;
    if(!openId || !token) {
      return;
    }
    let res = await service.passport.loginWeibo(openId, token);
    if(!res.success) {
      return ctx.body = ctx.helper.errorJSON({
        message: res.message,
      });
    }
    let uid = res.data;
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
    ctx.session.uid = uid;
    ctx.body = ctx.helper.okJSON({
      user,
      author,
      followPersonCount,
      fansCount,
    });
  }

  async resetCode() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let phone = body.phone;
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return ctx.helper.errorJSON({
        message: '手机号不合法~',
      });
    }
    let res = await service.passport.resetCode(phone);
    if(res.success) {
      ctx.body = ctx.helper.okJSON();
    }
    else {
      ctx.body = ctx.helper.errorJSON({
        message: res.message,
      });
    }
  }

  async reset() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let phone = body.phone;
    let pw = body.pw;
    let code = body.code;
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return ctx.helper.errorJSON({
        message: '手机号不合法~',
      });
    }
    if(!pw || pw.length < 6) {
      return ctx.body = ctx.helper.errorJSON({
        message: '密码长度不符合要求~',
      });
    }
    if(!code || code.length !== 6) {
      return ctx.body = ctx.helper.errorJSON({
        message: '验证码长度不符合要求~',
      });
    }
    let res = await service.passport.reset(phone, pw, code);
    if(res.success) {
      ctx.body = ctx.helper.okJSON();
    }
    else {
      ctx.body = ctx.helper.errorJSON({
        message: res.message,
      });
    }
  }

  async registerCode() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let phone = body.phone;
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return ctx.helper.errorJSON({
        message: '手机号不合法~',
      });
    }
    let res = await service.passport.registerCode(phone);
    if(res.success) {
      ctx.body = ctx.helper.okJSON();
    }
    else {
      ctx.body = ctx.helper.errorJSON({
        message: res.message,
      });
    }
  }

  async register() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let phone = body.phone;
    let pw = body.pw;
    let code = body.code;
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return ctx.helper.errorJSON({
        message: '手机号不合法~',
      });
    }
    if(!pw || pw.length < 6) {
      return ctx.body = ctx.helper.errorJSON({
        message: '密码长度不符合要求~',
      });
    }
    if(!code || code.length !== 6) {
      return ctx.body = ctx.helper.errorJSON({
        message: '验证码长度不符合要求~',
      });
    }
    let res = await service.passport.register(phone, pw, code);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res.data);
    }
    else {
      ctx.body = ctx.helper.errorJSON({
        message: res.message,
      });
    }
  }

  async loginOut() {
    const { ctx } = this;
    ctx.session = null;
    ctx.body = ctx.helper.okJSON();
  }
}

module.exports = Controller;
