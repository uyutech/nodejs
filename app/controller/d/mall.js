/**
 * Created by army8735 on 2017/12/26.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let productList = {};
      let res = yield {
        productList: ctx.helper.postServiceJSON2('api/Mall_Product/GetProduct_List', {
          uid,
          skip: 0,
          take: 20,
        }),
      };
      if(res.productList.data.success) {
        productList = res.productList.data.data;
      }
      yield ctx.render('dmall', {
        productList,
      });
    }
    * new(ctx) {
      let uid = ctx.session.uid;
      let productList = {};
      let res = yield {
        productList: ctx.helper.postServiceJSON2('api/users/GetNewGoodsList', {
          uid,
          skip: 0,
          take: 20,
        }),
      };
      if(res.productList.data.success) {
        productList = res.productList.data.data;
      }
      yield ctx.render('dmall_new', {
        productList,
      });
    }
    * wait(ctx) {
      let uid = ctx.session.uid;
      let productList = {};
      let res = yield {
        productList: ctx.helper.postServiceJSON2('api/users/GetWaitingGoodsList', {
          uid,
          skip: 0,
          take: 20,
        }),
      };
      if(res.productList.data.success) {
        productList = res.productList.data.data;
      }
      yield ctx.render('dmall_wait', {
        productList,
      });
    }
  }
  return Controller;
};
