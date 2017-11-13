/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let authorID = ctx.params.authorID;
      if(!authorID) {
        return;
      }
      let authorDetail = {};
      let homeDetail = {};
      let tags = {};
      let playList = {};
      let playList2 = {};
      let commentData = [];
      let hotCommentData = [];
      let res = yield {
        authorDetail: ctx.helper.postServiceJSON('api/author/GetAuthorDetails', {
          uid,
          AuthorID: authorID,
        }),
        homeDetail: ctx.helper.postServiceJSON('api/author/GetAuthorHomePage', {
          AuthorID: authorID,
        }),
        tags: ctx.helper.postServiceJSON('api/author/GetAuthorWorks', {
          AuthorID: authorID,
        }),
        // playList: ctx.helper.postServiceJSON('api/author/SearchWorks', {
        //   AuthorID: authorID,
        //   Parameter: '',
        //   Skip: 0,
        //   Take: 10,
        //   SortType: 1,
        // }),
        // playList2: ctx.helper.postServiceJSON('api/author/SearchWorks', {
        //   AuthorID: authorID,
        //   Parameter: '',
        //   Skip: 0,
        //   Take: 10,
        //   SortType: 0,
        // }),
        commentData: ctx.helper.postServiceJSON('api/author/GetToAuthorMessage_List', {
          uid,
          AuthorID: authorID,
          Skip: 0,
          Take: 10,
          SortType: 0,
          MyComment: 0,
          CurrentCount: 0,
        }),
        hotCommentData: ctx.helper.postServiceJSON('api/author/GetToAuthorMessage_List', {
          uid,
          AuthorID: authorID,
          Skip: 0,
          Take: 2,
          SortType: 1,
          MyComment: 0,
          CurrentCount: 0,
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
      // if(res.playList.data.success) {
      //   playList = res.playList.data.data;
      // }
      // if(res.playList2.data.success) {
      //   playList2 = res.playList2.data.data;
      // }
      if(res.commentData.data.success) {
        commentData = res.commentData.data.data;
      }
      if(res.hotCommentData.data.success) {
        hotCommentData = res.hotCommentData.data.data;
      }
      yield ctx.render('dauthor', {
        authorID,
        authorDetail,
        homeDetail,
        tags,
        playList,
        playList2,
        commentData,
        hotCommentData,
      });
    }
  }
  return Controller;
};
