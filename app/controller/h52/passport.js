/**
 * Created by army8735 on 2018/4/10.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async login() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    let name = body.name;
    let pw = body.pw;
    if(!name || !/^1\d{10}$/.test(name)) {
      return ctx.helper.errorJSON({
        message: '手机号不合法~',
      });
    }
    if(!pw || pw.length < 6) {
      return ctx.body = ctx.helper.errorJSON({
        message: '密码长度不符合要求~',
      });
    }
    let res = await service.passport.check(name, pw);
    if(res.success) {
      ctx.session.uid = res.data;
      ctx.body = ctx.helper.okJSON();
    }
    else {
      ctx.body = ctx.helper.errorJSON({
        message: '用户名密码不匹配',
      });
    }
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
    if(res) {
      ctx.body = ctx.helper.okJSON();
    }
    else {
      ctx.body = ctx.helper.errorJSON();
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
    if(res) {
      ctx.body = ctx.helper.okJSON();
    }
    else {
      ctx.body = ctx.helper.errorJSON();
    }
  }

  async loginOut() {
    const { ctx } = this;
    ctx.session = null;
    ctx.body = ctx.helper.okJSON();
  }
}

module.exports = Controller;
