/**
 * Created by army8735 on 2018/4/10.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');
const Spark = require('spark-md5');
const SMSClient = require('@alicloud/sms-sdk');
const uuidv4 = require('uuid/v4');

const TEMPLATE = {
  '1': 'SMS_80275178', // 注册
  '2': 'SMS_80275177', // 忘记密码
  '3': 'SMS_80275182', // 绑定手机
};
let smsClient = new SMSClient({
  accessKeyId: 'LTAIO1WxEZNbEkbN',
  secretAccessKey: 'vSYTJwPai0Uqfh5ymVBcxROK3VOmmK',
});

const CACHE_TIME = 600;

class Service extends egg.Service {
  /**
   * 校验用户名和密码
   * @param name:String 登录名
   * @param pw:String 密码明文
   * @returns Object{ success: boolean, data:int }
   */
  async check(name, pw) {
    if(!name || !pw) {
      return;
    }
    const { app } = this;
    let md5 = Spark.hash(pw + 'uyuTech');
    // 新版密码追加stirng更加安全，先尝试新版
    let res = await app.model.userAccount.findOne({
      attributes: [
        'user_id'
      ],
      where: {
        name,
        password: md5,
        update_time: {
          $gt: new Date('2018-04-10')
        },
      },
      raw: true,
    });
    if(res) {
      return {
        success: true,
        id: res.user_id,
      };
    }
    md5 = Spark.hash(pw);
    // 老用户
    res = await app.model.userAccount.findOne({
      attributes: [
        'user_id'
      ],
      where: {
        name,
        password: md5,
      },
      raw: true,
    });
    if(res) {
      return {
        success: true,
        id: res.user_id,
      };
    }
    return {
      success: false,
    };
  }

  /**
   * 发送注册验证码
   * @param phone:String 手机号
   */
  async registerCode(phone) {
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return;
    }
    const { app } = this;
    let code = Math.floor(Math.random() * 1000000) + '';
    if(code.length < 6) {
      code = '000000' + code;
      code = code.slice(-6);
    }
    let cacheKey = 'resetCode_' + phone + '_1';
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(code));
    let res = await smsClient.sendSMS({
      PhoneNumbers: phone,
      SignName: '转圈Circling',
      TemplateCode: TEMPLATE[1] || 'SMS_80275178',
      TemplateParam: '{"code":"' + code + '"}',
    });
    return res.Code === 'OK';
  }

  /**
   * 发送重设密码验证码
   * @param phone:String 手机号
   */
  async resetCode(phone) {
    if(!phone || !/^1\d{10}$/.test(phone)) {
      return;
    }
    const { app } = this;
    let code = Math.floor(Math.random() * 1000000) + '';
    if(code.length < 6) {
      code = '000000' + code;
      code = code.slice(-6);
    }
    let cacheKey = 'resetCode_' + phone + '_2';
    app.redis.setex(cacheKey, CACHE_TIME, JSON.stringify(code));
    let res = await smsClient.sendSMS({
      PhoneNumbers: phone,
      SignName: '转圈Circling',
      TemplateCode: TEMPLATE[2] || 'SMS_80275178',
      TemplateParam: '{"code":"' + code + '"}',
    });
    return res.Code === 'OK';
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
      return;
    }
    if(!pw || pw.length < 6) {
      return;
    }
    if(!code || code.length !== 6) {
      return;
    }
    const { app } = this;
    let cacheKey = 'resetCode_' + phone + '_2';
    let check = await app.redis.get(cacheKey);
    if(!check) {
      return;
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
    return res !== null && res.length > 0;
  }
}

module.exports = Service;
