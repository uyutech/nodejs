/**
 * Created by army8735 on 2017/12/3.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let authorID = body.authorID;
      if(!authorID) {
        return;
      }
      let authorDetail = {};
      let homeDetail = {};
      let album = {};
      let commentData = {};
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
      ctx.body = ctx.helper.okJSON({
        authorDetail,
        homeDetail,
        album,
        commentData,
        hotPlayList,
        hotPicList,
      });
    }
    * newIndex(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let authorID = body.authorID;
      if(!authorID) {
        return;
      }
      let authorDetail = {};
      let homeDetail = {};
      let album = {};
      let commentData = {};
      let dynamic = {};
      let type = [];
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
        dynamic: ctx.helper.postServiceJSON2('api/author/GetAuthorDynamic', {
          uid,
          Skip: 0,
          Take: 10,
          AuthorID: authorID,
        }),
        type: ctx.helper.postServiceJSON2('api/author/GetItemsTypeByAuthorID', {
          uid,
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
      if(res.dynamic.data.success) {
        dynamic = res.dynamic.data.data;
      }
      if(res.type.data.success) {
        type = res.type.data.data;
      }
      let itemList = {};
      if(type.length) {
        let first = type[0];
        let res = yield ctx.helper.postServiceJSON2('api/author/GetItemsByGroupID', {
          uid,
          AuthorID: authorID,
          GroupID: first.GroupID,
          skip: 0,
          take: 10,
        });
        if(res.data.success) {
          itemList = res.data.data;
        }
      }
      ctx.body = ctx.helper.okJSON({
        authorDetail,
        homeDetail,
        album,
        commentData,
        dynamic,
        type,
        itemList,
      });
    }
    * itemList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/author/GetItemsByGroupID', {
        uid,
        AuthorID: body.authorId,
        GroupID: body.groupId,
        skip: body.skip || 0,
        take: body.take || 10,
        sort: body.sort,
        ItemsTypeID: body.typeId,
      });
      ctx.body = res.data;
    }
    * dynamic(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let authorId = body.authorId;
      let res = yield ctx.helper.postServiceJSON2('api/author/GetAuthorDynamic', {
        uid,
        AuthorID: authorId,
        Skip: body.skip || 0,
        Take: body.take || 10,
      });
      ctx.body = res.data;
    }
    * follow(ctx) {
      let uid = ctx.session.uid;
      let authorID = ctx.request.body.authorID;
      let res = yield ctx.helper.postServiceJSON2('api/author/SaveAuthorToUser', {
        uid,
        Author: authorID,
      });
      ctx.body = res.data;
    }
    * unFollow(ctx) {
      let uid = ctx.session.uid;
      let authorID = ctx.request.body.authorID;
      let res = yield ctx.helper.postServiceJSON2('api/author/RemoveAuthorToUser', {
        uid,
        Author: authorID,
      });
      ctx.body = res.data;
    }
    * addComment(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let content = (body.content || '').trim();
      if(content.length < 3 || content.length > 2048) {
        return ctx.body = {
          success: false,
        };
      }
      ctx.logger.info('authorID %s parentID %s rootID %s', body.authorID, body.rootID, body.parentID);
      let res = yield ctx.helper.postServiceJSON2('api/Users_Comment/AddAuthorComment', {
        uid,
        ParentID: body.parentID,
        RootID: body.rootID,
        SendContent: content,
        AuthorID: body.authorID,
      });
      ctx.body = res.data;
    }
    * likeComment(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/Users_Comment/AddCommentLike', {
        uid,
        CommentID: body.commentID,
      });
      ctx.body = res.data;
    }
    * delComment(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      ctx.logger.info('commentID %s', body.commentID);
      let res = yield ctx.helper.postServiceJSON2('api/Users_Comment/DeleteCommentByID', {
        uid,
        CommentID: body.commentID,
      });
      ctx.body = res.data;
    }
    * subCommentList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/Users_Comment/GetTocomment_T_List', {
        uid,
        RootID: body.rootID,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * commentList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/Users_Comment/GetToAuthorMessage_List', {
        uid,
        AuthorID: body.authorID,
        Skip: body.skip,
        Take: body.take,
        SortType: body.sortType,
        MyComment: body.myComment,
        CurrentCount: body.currentCount,
      });
      ctx.body = res.data;
    }
    // TODO: delete
    * maList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/find/Hot_WorkItems', {
        uid,
        AuthorID: body.authorID,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    // TODO: delete
    * picList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/find/Hot_PicWorkItems', {
        uid,
        AuthorID: body.authorID,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
