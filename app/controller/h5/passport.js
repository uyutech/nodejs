/**
 * Created by army8735 on 2017/12/29.
 */

'use strict';

const SMSClient = require('@alicloud/sms-sdk');

const accessKeyId = 'LTAIO1WxEZNbEkbN';
const secretAccessKey = 'vSYTJwPai0Uqfh5ymVBcxROK3VOmmK';
let smsClient = new SMSClient({
  accessKeyId,
  secretAccessKey,
});

module.exports = app => {
  class Controller extends app.Controller {
    * code(ctx) {
      let body = ctx.request.body;
      let phone = body.phone;
      let type = body.type;
      if(!/^1\d{10}$/.test(phone)) {
        return ctx.helper.errorJSON({
          message: '手机号不合法',
        });
      }
      let code = yield ctx.helper.postServiceJSON2('/api/users/SendMessageCode', {
        phoneNumber: phone,
        codeType: type || 1,
      });
      if(!code.data.success) {
        return ctx.body = ctx.helper.errorJSON({
          message: code.data.message,
        });
      }
      let res = yield smsClient.sendSMS({
        PhoneNumbers: phone,
        SignName: '转圈Circling',
        TemplateCode: type === '2' ? 'SMS_80275177' : 'SMS_80275178',
        TemplateParam: '{"code":"' + code.data.data.code + '"}',
      });
      if(res.Code === 'OK') {
        ctx.body = ctx.helper.okJSON({
        });
      }
      else {
        ctx.body = ctx.helper.errorJSON({
          message: res.Message,
        });
      }
    }
    * register(ctx) {
      let body = ctx.request.body;
      let phone = body.phone;
      let password = body.password || '';
      let code = body.code;
      if(!/^1\d{10}$/.test(phone)) {
        return ctx.helper.errorJSON({
          message: '手机号不合法~',
        });
      }
      if(password.length < 6) {
        return ctx.body = ctx.helper.errorJSON({
          message: '密码长度不符合要求~',
        });
      }
      if(!/^\d{6}$/.test(code)) {
        return ctx.body = ctx.helper.errorJSON({
          message: '验证码不合法~',
        });
      }
      let checkCode = yield ctx.helper.postServiceJSON2('/api/users/CheckMessageCode', {
        phoneNumber: phone,
        CodeNumber: code,
        codeType: '1',
      });
      if(!checkCode.data.success) {
        return ctx.body = ctx.helper.errorJSON({
          message: checkCode.data.message,
        });
      }
      let res = yield yield ctx.helper.postServiceJSON2('/api/users/Regist', {
        phoneNumber: phone,
        pwd: password,
      });
      ctx.body = res.data;
    }
    * login(ctx) {
      let body = ctx.request.body;
      let phone = body.phone;
      let password = body.password;
      if(!/^1\d{10}$/.test(phone)) {
        return ctx.helper.errorJSON({
          message: '手机号不合法~',
        });
      }
      if(password.length < 6) {
        return ctx.body = ctx.helper.errorJSON({
          message: '密码长度不符合要求~',
        });
      }
      let check = yield yield ctx.helper.postServiceJSON2('/api/users/Login', {
        phoneNumber: phone,
        pwd: password,
      });
      if(!check.data.success) {
        return ctx.body = ctx.helper.errorJSON({
          message: check.data.message,
        });
      }
      let uid = check.data.data.UID;
      if(!uid) {
        return ctx.body = ctx.helper.errorJSON({
        });
      }
      ctx.session.uid = uid;
      let userInfo = {};
      let bonusPoint = {};
      let lastUpdateNickNameTime;
      let lastUpdateHeadTime;
      let coins = {};
      let res = yield {
        userInfo: ctx.helper.postServiceJSON2('api/users/GetUserInfo', {
          uid,
        }),
        bonusPoint: ctx.helper.postServiceJSON2('api/users/GetUserRank', {
          uid,
        }),
        lastUpdateNickNameTime: ctx.helper.postServiceJSON2('api/users/GetUpdateNickNameLastTime', {
          uid,
        }),
        lastUpdateHeadTime: ctx.helper.postServiceJSON2('api/users/GetUpdateHead_UrlLastTime', {
          uid,
        }),
        coins: ctx.helper.postServiceJSON2('api/users/GetUserCirclingCoins', {
          uid,
        }),
      };
      if(res.userInfo.data.success) {
        userInfo = res.userInfo.data.data;
      }
      if(res.bonusPoint.data.success) {
        bonusPoint = res.bonusPoint.data.data || {};
      }
      if(res.lastUpdateNickNameTime.data.success) {
        lastUpdateNickNameTime = res.lastUpdateNickNameTime.data.data;
      }
      if(res.lastUpdateHeadTime.data.success) {
        lastUpdateHeadTime = res.lastUpdateHeadTime.data.data;
      }
      if(res.coins.data.success) {
        coins = res.coins.data.data;
      }
      ctx.session.uname = userInfo.NickName;
      ctx.session.head = userInfo.Head_Url;
      if(userInfo.ISAuthor) {
        ctx.session.authorID = userInfo.AuthorID;
        ctx.session.authorName = userInfo.AuthorName;
        ctx.session.isPublic = userInfo.ISOpen;
        ctx.session.authorHead = userInfo.AuthorHead_Url;
      }
      ctx.body = ctx.helper.okJSON({
        userInfo,
        bonusPoint,
        lastUpdateNickNameTime,
        lastUpdateHeadTime,
        coins,
      });
    }
    * reset(ctx) {
      let body = ctx.request.body;
      let phone = body.phone;
      let password = body.password || '';
      let code = body.code;
      if(!/^1\d{10}$/.test(phone)) {
        return ctx.helper.errorJSON({
          message: '手机号不合法~',
        });
      }
      if(password.length < 6) {
        return ctx.body = ctx.helper.errorJSON({
          message: '密码长度不符合要求~',
        });
      }
      if(!/^\d{6}$/.test(code)) {
        return ctx.body = ctx.helper.errorJSON({
          message: '验证码不合法~',
        });
      }
      let checkCode = yield ctx.helper.postServiceJSON2('/api/users/CheckMessageCode', {
        phoneNumber: phone,
        CodeNumber: code,
        codeType: '2',
      });
      if(!checkCode.data.success) {
        return ctx.body = ctx.helper.errorJSON({
          message: checkCode.data.message,
        });
      }
      let res = yield yield ctx.helper.postServiceJSON2('/api/users/UpdatePwd', {
        phoneNumber: phone,
        pwd: password,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
