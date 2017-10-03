/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let authorID = ctx.params.authorID;
      let authorDetail = {};
      let homeDetail = {};
      try {
        let res = yield {
          authorDetail: ctx.curl(ctx.helper.getRemoteUrl('api/author/GetAuthorDetails'), {
            method: 'POST',
            data: {
              AuthorID: authorID,
            },
            dataType: 'json',
            gzip: true,
          }),
          homeDetail: ctx.curl(ctx.helper.getRemoteUrl('api/author/GetAuthorHomePage'), {
            method: 'POST',
            data: {
              AuthorID: authorID,
            },
            dataType: 'json',
            gzip: true,
          }),
        };
        if(res.authorDetail.data.success) {
          authorDetail = res.authorDetail.data.data;
        }
        if(res.authorDetail.data.success) {
          homeDetail = res.homeDetail.data.data;
        }
      }
      catch(e) {
        ctx.logger.error(e.toString());
      }
      yield ctx.render('author', {
        authorID,
        authorDetail,
        homeDetail,
      });
    }
  }
  return Controller;
};
