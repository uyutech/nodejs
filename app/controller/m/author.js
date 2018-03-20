/**
 * Created by army8735 on 2017/10/3.
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
      let tag = ctx.query.tag;
      let authorDetail = {};
      let homeDetail = {};
      let album = {};
      let tags = {};
      let playList = {};
      let playList2 = {};
      let commentData = {};
      let hotCommentData = [];
      let hotPlayList = {};
      let hotPicList = {};
      let res = yield {
        authorDetail: ctx.service.author.index(authorID),
        homeDetail: ctx.helper.postServiceJSON2('api/author/GetAuthorHomePage', {
          AuthorID: authorID,
        }),
        album: ctx.helper.postServiceJSON2('api/author/GetAuthoralbum_List', {
          AuthorID: authorID,
          Skip: 0,
          Take: 10,
        }),
        commentData: ctx.helper.postServiceJSON2('api/Users_Comment/GetToAuthorMessage_List', {
          uid,
          AuthorID: authorID,
          Skip: 0,
          Take: 30,
          SortType: 0,
          MyComment: 0,
          CurrentCount: 0,
        }),
        hotPlayList: ctx.helper.postServiceJSON2('api/find/Hot_WorkItems', {
          uid,
          Skip: 0,
          Take: 30,
          AuthorID: authorID,
        }),
        hotPicList: ctx.helper.postServiceJSON2('api/find/Hot_PicWorkItems', {
          uid,
          Skip: 0,
          Take: 10,
          AuthorID: authorID,
        }),
      };
      if(res.authorDetail) {
        authorDetail = res.authorDetail;
      }
      if(res.homeDetail.data.success) {
        homeDetail = res.homeDetail.data.data;
      }
      if(res.album.data.success) {
        album = res.album.data.data;
      }
      if(res.commentData.data.success) {
        commentData = res.commentData.data.data;
      }
      if(res.hotPlayList.data.success) {
        hotPlayList = res.hotPlayList.data.data;
      }
      if(res.hotPicList.data.success) {
        hotPicList = res.hotPicList.data.data;
      }
      yield ctx.render('mauthor', {
        authorID,
        tag,
        authorDetail,
        homeDetail,
        album,
        tags,
        playList,
        playList2,
        commentData,
        hotCommentData,
        hotPlayList,
        hotPicList,
      });
    }
  }
  return Controller;
};
