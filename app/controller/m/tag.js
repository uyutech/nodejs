/**
 * Created by army8735 on 2017/12/24.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let tag = ctx.params.tag;
      let postList = {};
      let res = yield ctx.helper.postServiceJSON2('api/Circling/GetTagPostList', {
        uid,
        TagName: tag,
        Skip: 0,
        Take: 10,
      });
      if(res.data.success) {
        postList = res.data.data;
      }
      yield ctx.render('mtag', {
        uid,
        tag,
        postList,
      });
    }
  }
  return Controller;
};
