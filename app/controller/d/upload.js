/**
 * Created by army8735 on 2017/10/15.
 */

'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let worksTypeList = await service.worksType.status(1);
    let worksTypeIdList = worksTypeList.map((item) => {
      return item.id;
    });
    let [workTypeList, professionList] = await Promise.all([
      service.worksType.workTypeList(worksTypeIdList),
      service.worksType.professionList(worksTypeIdList)
    ]);
    worksTypeList.forEach((item, i) => {
      item.status = undefined;
      item.workTypeList = workTypeList[i];
      item.professionList = professionList[i];
    });
    await ctx.render('dupload', {
      uid,
      worksTypeList,
    });
  }
}

module.exports = Controller;
