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
    let workTypeIdList = [];
    let workTypeIdHash = {};
    workTypeList.forEach((list) => {
      list.forEach((item) => {
        if(!workTypeIdHash[item.id]) {
          workTypeIdHash[item.id] = true;
          workTypeIdList.push(item.id);
        }
      });
    });
    let workTypeProfessionList = await service.workType.professionList(workTypeIdList);
    let workTypeProfessionHash = {};
    workTypeProfessionList.forEach((list, i) => {
      list = list.filter((item) => {
        return item.show;
      });
      workTypeProfessionHash[workTypeIdList[i]] = list;
    });
    workTypeList.forEach((list) => {
      list.forEach((item) => {
        item.professionList = workTypeProfessionHash[item.id];
      });
    });
    worksTypeList.forEach((item, i) => {
      item.status = undefined;
      item.workTypeList = workTypeList[i].filter((item) => {
        return item.upload < 2;
      });
      item.professionList = professionList[i].filter((item) => {
        return item.show;
      });
    });
    await ctx.render('dupload', {
      uid,
      worksTypeList,
    });
  }
}

module.exports = Controller;
