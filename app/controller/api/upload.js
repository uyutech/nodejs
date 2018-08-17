/**
 * Created by army8735 on 2018/8/17.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let worksType = body.worksType;
    let worksName = body.worksName;
    let worksDesc = body.worksDesc;
    let poster = body.poster;
    let professionList = body.professionList;
    let workList = body.workList;
    console.log(worksType);
    console.log(worksName);
    console.log(worksDesc);
    console.log(poster);
    console.log(professionList);
    console.log(workList);
    ctx.body = 123;
  }
}

module.exports = Controller;
