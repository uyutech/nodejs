/**
 * Created by army8735 on 2017/10/23.
 */

'use strict';

const crypto = require('crypto');
const egg = require('egg');

class Service extends egg.Service {
  async textScan(text) {
    const md5 = crypto.createHash('md5');
    const hmac = crypto.createHmac('sha1', 'vXKFU7M5ajYsNOD0FcXhE1uNLsLlE2');
    const traceID = this.ctx.traceID;
    const uid = this.ctx.session ? this.ctx.session.uid || '' : '';
    const ip = this.ctx.request.header['x-real-ip'];
    const date = new Date().toUTCString();

    let data = {
      scenes: ['keyword'],
      tasks: [
        {
          content: text,
          dataId: traceID,
          time: Date.now(),
        }
      ],
      clientInfo: {
        userType: 'other',
        userId: uid,
        ip,
      },
    };

    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Content-MD5': md5.update(JSON.stringify(data)).digest('base64'),
      'Date': date,
      'x-acs-version': '2017-01-12',
      'x-acs-signature-nonce': Math.random(),
      'x-acs-signature-version': '1.0',
      'x-acs-signature-method': 'HMAC-SHA1',
    };

    let signature = [];
    signature.push('POST\n');
    signature.push('application/json\n');
    signature.push(headers['Content-MD5'] + '\n');
    signature.push('application/json\n');
    signature.push(date + '\n');
    signature.push('x-acs-signature-method:' + headers['x-acs-signature-method'] + '\n');
    signature.push('x-acs-signature-nonce:' + headers['x-acs-signature-nonce'] + '\n');
    signature.push('x-acs-signature-version:' + headers['x-acs-signature-version'] + '\n');
    signature.push('x-acs-version:' + headers['x-acs-version'] + '\n');
    signature.push('/green/text/scan');
    let authorization = hmac.update(signature.join('')).digest('base64');
    headers.Authorization = 'acs LTAI4XGUZpQWJZut:' + authorization;

    return await this.ctx.curl('http://green.cn-shanghai.aliyuncs.com/green/text/scan', {
      method: 'POST',
      headers,
      data,
      dataType: 'json',
      gzip: true,
    });
  }
}

module.exports = Service;
