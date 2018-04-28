/**
 * Created by army8735 on 2018/4/10.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');
const Spark = require('spark-md5');
const SMSClient = require('@alicloud/sms-sdk');

const TEMPLATE = {
  '1': 'SMS_80275178', // 注册
  '2': 'SMS_80275177', // 忘记密码
  '3': 'SMS_80275182', // 绑定手机
};
let smsClient = new SMSClient({
  accessKeyId: 'LTAIO1WxEZNbEkbN',
  secretAccessKey: 'vSYTJwPai0Uqfh5ymVBcxROK3VOmmK',
});

class Service extends egg.Service {
  /**
   * 校验用户名和密码
   * @param phone:String 登录名
   * @param pw:String 密码明文
   * @returns Object{ success: boolean, data:int }
   */
  async check(phone, pw) {
    if(!phone || !pw) {
      return {
        success: false,
      };
    }
    const { app } = this;
    let md5 = Spark.hash(pw + 'uyuTech');
    // 新版密码追加string更加安全，先尝试新版
    let res = await app.model.userAccount.findOne({
      attributes: [
        'password',
        ['user_id', 'userId']
      ],
      where: {
        name: phone,
        update_time: {
          $gt: new Date('2018-04-24')
        },
      },
      raw: true,
    });
    if(res) {
      if(res.password === md5) {
        return {
          success: true,
          data: res.userId,
        };
      }
      return {
        success: false,
        message: '账号密码不匹配~',
      };
    }
    md5 = Spark.hash(pw);
    // 老用户
    res = await app.model.userAccount.findOne({
      attributes: [
        ['user_id', 'userId']
      ],
      where: {
        name: phone,
        password: md5,
      },
      raw: true,
    });
    if(res) {
      return {
        success: true,
        data: res.userId,
      };
    }
    return {
      success: false,
      message: '账号密码不匹配~',
    };
  }

  /**
   * 发送注册验证码
   * @param phone:String 手机号
   */
  async registerCode(phone) {
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return {
        success: false,
        message: '手机号不合法~',
      };
    }
    const { app } = this;
    let check = await app.model.userAccount.findOne({
      attributes: [
        'id'
      ],
      where: {
        name: phone,
        type: 1,
      },
      raw: true,
    });
    if(check) {
      return {
        success: false,
        message: '这个账号已经注册过了哦~',
      };
    }
    let code = Math.floor(Math.random() * 1000000) + '';
    if(code.length < 6) {
      code = '000000' + code;
      code = code.slice(-6);
    }
    let cacheKey = 'registerCode_' + phone;
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(code));
    let res = await smsClient.sendSMS({
      PhoneNumbers: phone,
      SignName: '转圈Circling',
      TemplateCode: TEMPLATE[1] || 'SMS_80275178',
      TemplateParam: '{"code":"' + code + '"}',
    });
    return {
      success: res.Code === 'OK',
    };
  }

  async register(phone, pw, code) {
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return {
        success: false,
        message: '手机号不合法~',
      };
    }
    if(!pw || pw.length < 6) {
      return {
        success: false,
        message: '密码长度不符合要求~',
      };
    }
    if(!code || code.length !== 6) {
      return {
        success: false,
        message: '验证码长度不符合要求~',
      };
    }
    const { app } = this;
    let cacheKey = 'registerCode_' + phone;
    let check = await app.redis.get(cacheKey);
    if(app.config.env !== 'prod') {
      if(!check && code !== '888888') {
        return {
          success: false,
          message: '验证码不正确~',
        };
      }
    }
    else if(!check) {
      return {
        success: false,
        message: '验证码不正确~',
      };
    }
    check = await app.model.userAccount.findOne({
      attributes: [
        'id'
      ],
      where: {
        name: phone,
        type: 1,
      },
      raw: true,
    });
    if(check) {
      return {
        success: false,
        message: '这个账号已经注册过了哦~',
      };
    }
    app.redis.del(cacheKey);
    let md5 = Spark.hash(pw + 'uyuTech');
    let last = await app.model.user.findOne({
      attributes: [
        'id'
      ],
      order: [
        ['id', 'DESC']
      ],
      limit: 1,
      raw: true,
    });
    let transaction = await app.sequelizeCircling.transaction();
    try {
      let id = last.id + Math.floor(Math.random() * 3) + 1;
      await Promise.all([
        app.model.user.create({
          id,
          nickname: '圈友' + id,
        }, {
          transaction,
          raw: true,
        }),
        app.model.userAccount.create({
          name: phone,
          password: md5,
          type: 1,
          user_id: id,
        }, {
          transaction,
        })
      ]);
      await transaction.commit();
      return {
        success: true,
        data: id,
      };
    } catch(e) {
      await transaction.rollback();
      return {
        success: false,
      };
    }
  }

  /**
   * 发送重设密码验证码
   * @param phone:String 手机号
   */
  async resetCode(phone) {
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return {
        success: false,
        message: '手机号不合法~',
      };
    }
    const { app } = this;
    let check = await app.model.userAccount.findOne({
      attributes: [
        'id'
      ],
      where: {
        name: phone,
        type: 1,
      },
      raw: true,
    });
    if(!check) {
      return {
        success: false,
        message: '请先注册这个账号哦~',
      };
    }
    let code = Math.floor(Math.random() * 1000000) + '';
    if(code.length < 6) {
      code = '000000' + code;
      code = code.slice(-6);
    }
    let cacheKey = 'resetCode_' + phone;
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(code));
    let res = await smsClient.sendSMS({
      PhoneNumbers: phone,
      SignName: '转圈Circling',
      TemplateCode: TEMPLATE[2] || 'SMS_80275178',
      TemplateParam: '{"code":"' + code + '"}',
    });
    return {
      success: res.Code === 'OK',
    };
  }

  /**
   * 重置密码
   * @param phone:String 手机号
   * @param pw:String 密码明文
   * @param code:String 验证码
   * @returns boolean
   */
  async reset(phone, pw, code) {
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return {
        success: false,
        message: '手机号不合法~',
      };
    }
    if(!pw || pw.length < 6) {
      return {
        success: false,
        message: '密码长度不符合要求~',
      };
    }
    if(!code || code.length !== 6) {
      return {
        success: false,
        message: '验证码长度不符合要求~',
      };
    }
    const { app } = this;
    let cacheKey = 'resetCode_' + phone;
    let check = await app.redis.get(cacheKey);
    if(app.config.env !== 'prod') {
      if(!check && code !== '888888') {
        return {
          success: false,
          message: '验证码不正确~',
        };
      }
    }
    else if(!check) {
      return {
        success: false,
        message: '验证码不正确~',
      };
    }
    app.redis.del(cacheKey);
    let md5 = Spark.hash(pw + 'uyuTech');
    let res = await app.model.userAccount.update({
      password: md5,
      update_time: new Date(),
    }, {
      where: {
        name: phone,
        type: 1,
      },
      raw: true,
    });
    return {
      success: res !== null && res.length > 0,
    };
  }

  /**
   * 使用weibo的openId和token登录
   * @param openId:String
   * @param token:String
   * @returns Object{ success: boolean, data: int }
   */
  async loginWeibo(openId, token) {
    if(!openId || !token) {
      return {
        success: false,
      };
    }
    const { app, ctx, } = this;
    let find = await app.model.userOauth.findOne({
      attributes: [
        ['user_id', 'userId']
      ],
      where: {
        open_id: openId,
      },
      raw: true,
    });
    if(find) {
      await app.model.userOauth.update({
        token,
        update_time: new Date(),
      }, {
        where: {
          open_id: openId,
        },
        raw: true,
      });
      return {
        success: true,
        data: find.userId,
      };
    }
    else {
      let weibo = await ctx.curl('https://api.weibo.com/2/users/show.json', {
        data: {
          uid: openId,
          access_token: token,
        },
        dataType: 'json',
        gzip: true,
      });
      if(!weibo || weibo.error || !weibo.data) {
        return {
          success: false,
        };
      }
      weibo = weibo.data;
      let name = weibo.screen_name || weibo.name;
      let headUrl = weibo.avatar_hd || weibo.avatar_large || weibo.profile_image_url;
      let transaction = await app.sequelizeCircling.transaction();
      try {
        let last = await app.model.user.findOne({
          transaction,
          attributes: [
            'id'
          ],
          order: [
            ['id', 'DESC']
          ],
          limit: 1,
          raw: true,
        });
        let id = last.id + Math.floor(Math.random() * 3) + 1;
        await app.model.user.create({
          id,
          nickname: '圈友' + id,
          headUrl,
        }, {
          transaction,
          raw: true,
        });
        await app.model.userOauth.create({
          open_id: openId,
          token,
          type: 1,
          user_id: id,
        }, {
          transaction,
          raw: true,
        });
        await transaction.commit();
        return {
          success: true,
          data: id,
        };
      } catch(err) {
        await transaction.rollback();
        return {
          success: false,
        };
      }
    }
  }

  /**
   * 获取账户列表
   * @param uid:int 用户id
   * @returns Array<Object>
   */
  async accountList(uid) {
    if(!uid) {
      return;
    }
    const { app } = this;
    let res = await app.model.userAccount.findAll({
      attributes: [
        'name',
        'type'
      ],
      where: {
        user_id: uid,
      },
      raw: true,
    });
    return res;
  }

  /**
   * 获取绑定列表
   * @param uid:int 用户id
   * @returns Array<Object>
   */
  async oauthList(uid) {
    if(!uid) {
      return;
    }
    const { app } = this;
    let res = await app.model.userOauth.findAll({
      attributes: [
        ['open_id', 'id'],
        'type'
      ],
      where: {
        user_id: uid,
      },
      raw: true,
    });
    return res;
  }

  /**
   * 绑定微博
   * @param uid:int 用户id
   * @param openId:String
   * @param token:String
   * @returns Object{ success: boolean, data:int }
   */
  async bindWeibo(uid, openId, token) {
    if(!uid || !openId || !token) {
      return {
        success: false,
      };
    }
    const { app, ctx, } = this;
    let find = await app.model.userOauth.findOne({
      attributes: [
        'id'
      ],
      where: {
        user_id: uid,
        type: 1,
      },
      raw: true,
    });
    if(find) {
      return {
        success: false,
        message: '这个账号已经绑定过微博了哦~',
      };
    }
    find = await app.model.userOauth.findOne({
      attributes: [
        ['user_id', 'userId']
      ],
      where: {
        open_id: openId,
        type: 1,
      },
      raw: true,
    });
    if(find) {
      return {
        success: false,
        message: '这个微博已经被绑定过了哦~',
      };
    }
    let weibo = await ctx.curl('https://api.weibo.com/2/users/show.json', {
      data: {
        uid: openId,
        access_token: token,
      },
      dataType: 'json',
      gzip: true,
    });
    if(!weibo || weibo.error || !weibo.data) {
      return {
        success: false,
      };
    }
    let res = await app.model.userOauth.create({
      open_id: openId,
      token,
      type: 1,
      user_id: uid,
    }, {
      raw: true,
    });
    return {
      success: true,
      data: openId,
    };
  }

  /**
   * 发送绑定验证码
   * @param phone:String 手机号
   */
  async bindCode(phone) {
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return {
        success: false,
        message: '手机号不合法~',
      };
    }
    const { app } = this;
    let check = await app.model.userAccount.findOne({
      attributes: [
        'id'
      ],
      where: {
        name: phone,
        type: 1,
      },
      raw: true,
    });
    if(check) {
      return {
        success: false,
        message: '这个号码已经绑定过了哦~',
      };
    }
    let code = Math.floor(Math.random() * 1000000) + '';
    if(code.length < 6) {
      code = '000000' + code;
      code = code.slice(-6);
    }
    let cacheKey = 'bindCode_' + phone;
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(code));
    let res = await smsClient.sendSMS({
      PhoneNumbers: phone,
      SignName: '转圈Circling',
      TemplateCode: TEMPLATE[3] || 'SMS_80275178',
      TemplateParam: '{"code":"' + code + '"}',
    });
    return {
      success: res.Code === 'OK',
    };
  }

  async bindPhone(uid, phone, pw, code) {
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return {
        success: false,
        message: '手机号不合法~',
      };
    }
    if(!pw || pw.length < 6) {
      return {
        success: false,
        message: '密码长度不符合要求~',
      };
    }
    if(!code || code.length !== 6) {
      return {
        success: false,
        message: '验证码长度不符合要求~',
      };
    }
    const { app } = this;
    let cacheKey = 'bindCode_' + phone;
    let check = await app.redis.get(cacheKey);
    if(app.config.env !== 'prod') {
      if(!check && code !== '888888') {
        return {
          success: false,
          message: '验证码不正确~',
        };
      }
    }
    else if(!check) {
      return {
        success: false,
        message: '验证码不正确~',
      };
    }
    check = await app.model.userAccount.findOne({
      attributes: [
        'id'
      ],
      where: {
        name: phone,
        type: 1,
      },
      raw: true,
    });
    if(check) {
      return {
        success: false,
        message: '这个账号已经注册过了哦~',
      };
    }
    app.redis.del(cacheKey);
    let md5 = Spark.hash(pw + 'uyuTech');
    await app.model.userAccount.create({
      name: phone,
      password: md5,
      type: 1,
      user_id: uid,
    }, {
      raw: true,
    });
    return {
      success: true,
      data: phone,
    };
  }
}

module.exports = Service;
