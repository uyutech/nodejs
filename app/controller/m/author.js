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
      let tags = {};
      let playList = {};
      let commentData = [];
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
        tags: ctx.curl(ctx.helper.getRemoteUrl('api/author/GetAuthorWorks'), {
          method: 'POST',
          data: {
            AuthorID: authorID,
          },
          dataType: 'json',
          gzip: true,
        }),
        playList: ctx.curl(ctx.helper.getRemoteUrl('api/author/SearchWorks'), {
          method: 'POST',
          data: {
            AuthorID: authorID,
            Parameter: '',
            Skip: 0,
            Take: 10,
            SortType: 1,
          },
          dataType: 'json',
          gzip: true,
        }),
        commentData: ctx.curl(ctx.helper.getRemoteUrl('api/author/GetToAuthorMessage_List'), {
          method: 'POST',
          data: {
            AuthorID: authorID,
            Skip: 0,
            Take: 10,
            SortType: 0,
            MyComment: 0,
            CurrentCount: 0,
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
      if(res.tags.data.success) {
        tags = res.tags.data.data;
      }
      if(res.playList.data.success) {
        playList = res.playList.data.data;
      }
      if(res.commentData.data.success) {
        commentData = res.commentData.data.data;
      }
      yield ctx.render('mauthor', {
        authorID,
        authorDetail,
        homeDetail,
        tags,
        playList,
        commentData,
      });
    }
  }
  return Controller;
};
