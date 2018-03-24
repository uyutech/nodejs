/**
 * Created by army8735 on 2018/3/19.
 */

'use strict';

const egg = require('egg');

class Service extends egg.Service {
  async index(id, sid) {
    if(!id) {
      return;
    }
    let cacheKey = 'worksData_' + id + (sid ? ('_' + sid) : '');
    let res = await this.app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await this.ctx.helper.postServiceJSON('api/works/GetWorkDetails', {
      uid: this.ctx.session.uid,
      WorksID: id,
      ItemsID: sid,
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
