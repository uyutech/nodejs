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
    let relWorkTypeList = await service.worksType.workTypeList(worksTypeIdList);
    let workTypeIdList = [];
    let workTypeIdHash = {};
    relWorkTypeList.forEach((list) => {
      list.forEach((item) => {
        if(item.upload > 0 && !workTypeIdHash[item.workType]) {
          workTypeIdHash[item.workType] = true;
          workTypeIdList.push(item.workType);
        }
      });
    });
    let workTypeList = await service.workType.infoList(workTypeIdList);
    let workTypeHash = {};
    workTypeList.forEach((item) => {
      workTypeHash[item.id] = item;
    });
    relWorkTypeList.forEach((list, i) => {
      worksTypeList[i].status = undefined;
      let workTypeList = list.map((item) => {
        return workTypeHash[item.workType];
      });
      worksTypeList[i].workTypeList = workTypeList.filter((item) => {
        return item;
      });
    });
    await ctx.render('dupload', {
      uid,
      worksTypeList,
    });
  }
}

module.exports = Controller;
