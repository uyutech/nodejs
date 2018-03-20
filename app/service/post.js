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
    let cacheKey = 'postData_' + id;
    let res = await this.app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await this.ctx.helper.postServiceJSON('api/circling/GetPostDetailes', {
      uid: this.ctx.session.uid,
      CommentID: id,
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
  async reference(content) {
    if(!content) {
      return null;
    }
    let reference = [];
    let matches = content.match(/@\/\w+\/\d+\/?(\d+)?(?:\s|$)/g);
    if(matches) {
      let query = [];
      let len = matches.length;
      for(let i = 0; i < len; i++) {
        let item = matches[i];
        let match = item.match(/@\/(\w+)\/(\d+)\/?(\d+)?(?:\s|$)/);
        switch (match[1]) {
          case 'works':
            query.push(this.ctx.service.works.index(match[2], match[3]));
            break;
          case 'post':
            query.push(this.ctx.service.post.index(match[2]));
            break;
          case 'author':
            query.push(this.ctx.service.author.index(match[2]));
            break;
          case 'user':
            query.push(this.ctx.service.user.index(match[2]));
            break;
          default:
            query.push(null);
            break;
        }
      }
      reference = await Promise.all(query);
    }
    return reference;
  }
}

module.exports = Service;
