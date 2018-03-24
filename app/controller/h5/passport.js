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
let template = {
  '1': 'SMS_80275178', // 注册
  '2': 'SMS_80275177', // 忘记密码
  '3': 'SMS_80275182', // 绑定手机
};

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
        TemplateCode: template[type] || 'SMS_80275178',
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
      let oauthInfo = [];
      let bonusPoint = {};
      let lastUpdateNickNameTime;
      let lastUpdateHeadTime;
      let coins = {};
      let res = yield {
        userInfo: ctx.helper.postServiceJSON2('api/users/GetUserInfo', {
          uid,
        }),
        oauthInfo: ctx.helper.postServiceJSON2('api/users/GetUserOauthInfo', {
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
      if(res.oauthInfo.data.success) {
        oauthInfo = res.oauthInfo.data.data;
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
        ctx.session.authorId = ctx.session.authorID = userInfo.AuthorID;
        ctx.session.authorName = userInfo.AuthorName;
        ctx.session.isPublic = userInfo.ISOpen;
        ctx.session.authorHead = userInfo.AuthorHead_Url;
      }
      ctx.body = ctx.helper.okJSON({
        userInfo,
        oauthInfo,
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
    * bindPhone(ctx) {
      let uid = ctx.session.uid;
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
      let checkCode = yield ctx.helper.postServiceJSON2('/api/users/CheckMessageCode', {
        phoneNumber: phone,
        CodeNumber: code,
        codeType: '3',
      });
      if(!checkCode.data.success) {
        return ctx.body = ctx.helper.errorJSON({
          message: checkCode.data.message,
        });
      }
      let res = yield yield ctx.helper.postServiceJSON2('/api/users/AddPhone', {
        uid,
        phoneNumber: phone,
        pwd: password,
      });
      ctx.body = res.data;
    }
    * bindOauth(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let openID = body.openID;
      let token = body.token;
      if(!openID || !token) {
        return ctx.body = ctx.helper.errorJSON({
        });
      }
      let res = yield yield ctx.helper.postServiceJSON2('/api/users/AddOauth', {
        uid,
        Openid: openID,
        Token: token,
        OpenType: 'weibo',
      });
      ctx.body = res.data;
    }
    * merge(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let phone = body.phone;
      let password = body.password || '';
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
      if(!body.type) {
        return ctx.body = ctx.helper.errorJSON({});
      }
      let res = yield ctx.helper.postServiceJSON2('api/users/UnionUser', {
        uid,
        phoneNumber: phone,
        pwd: password,
        UnionType: body.type,
      });
      ctx.body = res.data;
    }
    * mergeOauth(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      if(!body.type || !body.code) {
        return ctx.body = ctx.helper.errorJSON({});
      }
      let res = yield ctx.helper.postServiceJSON2('api/users/UnionOauthUser', {
        uid,
        CodeNumber: body.code,
        opentype: 'weibo',
        UnionType: body.type,
      });
      ctx.body = res.data;
    }
    * guideNameAndSex(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let nickName = (body.nickName || '').trim();
      let changeName = body.changeName === 'true';
      let sex = body.sex;
      sex = sex || '0';
      if(sex !== '0' && sex !== '1' && sex !== '2') {
        sex = '0';
      }
      if(changeName) {
        let length = nickName.length;
        if(length < 2 || length > 8) {
          return ctx.body = {
            success: false,
            message: '昵称长度需要在2~8个字之间哦~',
          };
        }
        if(nickName.indexOf('转圈') === 0) {
          return ctx.body = {
            success: false,
            message: '昵称不能以"转圈"开头哦！',
          };
        }
        let scan = yield ctx.service.green.textScan(nickName);
        if(scan.data.code === 200 && scan.data.data[0].code === 200) {
          let suggestion = scan.data.data[0].results[0].suggestion;
          if(suggestion !== 'pass') {
            return ctx.body = {
              success: false,
              message: '昵称中可能含有违规信息，请尝试换一个哦~',
            };
          }
          if(nickName !== ctx.session.uname) {
            let res = yield ctx.helper.postServiceJSON2('api/users/UpdateNickName', {
              uid,
              NickName: nickName,
            });
            if(res.data.success) {
              ctx.session.uname = nickName;
            }
            else if(res.data.code === 1006) {
              return ctx.body = {
                success: false,
                message: '昵称已被占用，换个名字试试吧~',
              }
            }
            else {
              return ctx.body = res.data;
            }
          }
        }
        else {
          return ctx.body = ctx.helper.errorJSON({});
        }
      }
      yield ctx.helper.postServiceJSON2('api/users/UpdateSex', {
        uid,
        sex,
      });
      let res = yield ctx.helper.postServiceJSON2('api/users/SaveUser_Reg_Stat', {
        uid,
        User_Reg_Stat: 2,
      });
      ctx.body = res.data;
    }
    * guideCircleList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/GetCirclingInfo', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * guideCircle(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let ids = body.ids || '';
      if(ids) {
        yield ctx.helper.postServiceJSON2('api/users/SaveTagToUser', {
          uid,
          TaglID: ids,
        });
      }
      let res = yield ctx.helper.postServiceJSON2('api/users/SaveUser_Reg_Stat', {
        uid,
        User_Reg_Stat: 11,
      });
      ctx.body = res.data;
    }
    * guideAuthorList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/GetAuthor', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * guideAuthor(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let ids = body.ids || '';
      yield ctx.helper.postServiceJSON2('api/users/SaveAuthorToUser', {
        uid,
        AuthorID: ids,
      });
      let res = yield ctx.helper.postServiceJSON2('api/users/SaveUser_Reg_Stat', {
        uid,
        User_Reg_Stat: ctx.session.authorID ? 100 : 99,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
