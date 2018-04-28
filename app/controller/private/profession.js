/**
 * Created by army8735 on 2018/4/23.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async all() {
    const { app, ctx } = this;
    let cacheKey = 'professionAll';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return ctx.body = ctx.helper.okJSON(JSON.parse(res));
    }
    res = await app.model.profession.findAll({
      attributes: [
        'id',
        'name'
      ],
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.longTime, JSON.stringify(res));
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
