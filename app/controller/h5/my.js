/**
 * Created by army8735 on 2017/11/28.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let userInfo = {};
      let bonusPoint = {};
      let lastUpdateNickNameTime;
      let lastUpdateHeadTime;
      let res = yield {
        userInfo: ctx.helper.postServiceJSON('api/users/GetUserInfo', {
          uid,
        }),
        bonusPoint: ctx.helper.postServiceJSON('api/users/getuserrank', {
          uid,
        }),
        lastUpdateNickNameTime: ctx.helper.postServiceJSON('api/users/GetUpdateNickNameLastTime', {
          uid,
        }),
        lastUpdateHeadTime: ctx.helper.postServiceJSON('api/users/GetUpdateHead_UrlLastTime', {
          uid,
        }),
      };
      if(res.userInfo.data.success) {
        userInfo = res.userInfo.data.data;
      }
      if(res.bonusPoint.data.success) {
        bonusPoint = res.bonusPoint.data.data || {};
      }
      if(res.lastUpdateNickNameTime.data.success) {
        lastUpdateNickNameTime = res.lastUpdateNickNameTime.data.data;
      }
      if(res.lastUpdateHeadTime.data.success) {
        lastUpdateHeadTime = res.lastUpdateHeadTime.data.data;
      }
      ctx.session.uname = userInfo.NickName;
      ctx.session.head = userInfo.Head_Url;
      if(userInfo.ISAuthor) {
        ctx.session.authorID = userInfo.AuthorID;
        ctx.session.authorName = userInfo.AuthorName;
        ctx.session.authorHead = userInfo.AuthorHead_Url;
      }
      ctx.body = ctx.helper.okJSON({
        userInfo,
        bonusPoint,
        lastUpdateNickNameTime,
        lastUpdateHeadTime,
      });
    }
    * relation(ctx) {
      let uid = ctx.session.uid;
      let follows = {};
      let userFriends = {};
      let userFollows = {};
      let userFollowers = {};
      let res = yield {
        follows: ctx.helper.postServiceJSON('api/users/GetLikeAuthorList', {
          uid,
          Skip: 0,
          Take: 30,
        }),
        userFriends: ctx.helper.postServiceJSON('api/users/User_Friends', {
          uid,
          Skip: 0,
          Take: 30,
        }),
        userFollows: ctx.helper.postServiceJSON('api/users/User_FollowList', {
          uid,
          Skip: 0,
          Take: 30,
        }),
        userFollowers: ctx.helper.postServiceJSON('api/users/User_FansList', {
          uid,
          Skip: 0,
          Take: 30,
        }),
      };
      if(res.follows.data.success) {
        follows = res.follows.data.data;
      }
      if(res.userFriends.data.success) {
        userFriends = res.userFriends.data.data;
      }
      if(res.userFollows.data.success) {
        userFollows = res.userFollows.data.data;
      }
      if(res.userFollowers.data.success) {
        userFollowers = res.userFollowers.data.data;
      }
      ctx.body = ctx.helper.okJSON({
        follows,
        userFriends,
        userFollows,
        userFollowers,
      });
    }
    * friendList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/User_Friends', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * followList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/User_FollowList', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * followerList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/User_FansList', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * followerAuthor(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/GetLikeAuthorList', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * message(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/GetUserNotify', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * readMessage(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/UserNotifyIsRead', {
        uid,
        NotifyIDList: (body.ids || []).join(','),
      });
      ctx.body = res.data;
    }
    * postList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/User_Post_List', {
        uid,
        Skip: body.skip,
        Take: body.take,
        currentUid: uid,
      });
      ctx.body = res.data;
    }
    * favor(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield {
        favorMV: ctx.helper.postServiceJSON('api/users/GetUserFavor', {
          uid,
          ItemsType: 1,
          Skip: 0,
          Take: 20,
        }),
        favorPic: ctx.helper.postServiceJSON('api/users/GetUserFavor', {
          uid,
          ItemsType: 2,
          Skip: 0,
          Take: 10,
        }),
        favorPost: ctx.helper.postServiceJSON('api/users/GetUserFavor', {
          uid,
          ItemsType: 3,
          Skip: 0,
          Take: 10,
        }),
      };
      let favorMV = {};
      let favorPic = {};
      let favorPost = {};
      if(res.favorMV.data.success) {
        favorMV = res.favorMV.data.data;
      }
      if(res.favorPic.data.success) {
        favorPic = res.favorPic.data.data;
      }
      if(res.favorPost.data.success) {
        favorPost = res.favorPost.data.data;
      }
      ctx.body = ctx.helper.okJSON({
        favorMV,
        favorPic,
        favorPost,
      });
    }
    * favorMV(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/GetUserFavor', {
        uid,
        ItemsType: 1,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * favorPic(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/GetUserFavor', {
        uid,
        ItemsType: 2,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * favorPost(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/GetUserFavor', {
        uid,
        ItemsType: 3,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * altSettle(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/SaveAuthorSettled', {
        uid,
        AuthorID: ctx.session.authorID,
        SettledType: body.public === 'true' ? 0 : 1,
      });
      if(ctx.session.authorID) {
        ctx.session.isPublic = body.public === 'true';
      }
      let userInfo = yield ctx.helper.postServiceJSON('api/users/GetUserInfo', {
        uid,
      });
      if(userInfo.data.success) {
        ctx.session.uname = userInfo.data.data.NickName;
        ctx.session.head = userInfo.data.data.Head_Url;
        ctx.session.authorID = userInfo.data.data.AuthorID;
        ctx.session.authorName = userInfo.data.data.AuthorName;
        ctx.session.authorHead = userInfo.data.data.AuthorHead_Url;
      }
      ctx.body = res.data;
    }
  }
  return Controller;
};
