/**
 * Created by army8735 on 2018/3/19.
 */

'use strict';

const egg = require('egg');

class Service extends egg.Service {
  async index(id) {
    if(!id) {
      return;
    }
    let cacheKey = 'userData_' + id;
    let res = await this.app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await this.ctx.helper.postServiceJSON('api/users/GetUserInfo', {
      uid: id,
    });
    if(res.data && res.data.success) {
      res = res.data.data;
    }
    else {
      res = null;
    }
    await this.ctx.app.redis.setex(cacheKey, 180, JSON.stringify(res));
    return res;
  }
}

module.exports = Service;
