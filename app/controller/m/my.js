/**
 * Created by army8735 on 2017/10/27.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let userInfo = {};
      let myPost = {};
      let bonusPoint = {};
      let lastUpdateNickNameTime;
      let lastUpdateHeadTime;
      let res = yield {
        userInfo: ctx.helper.postServiceJSON('api/users/GetUserInfo', {
          uid,
        }),
        myPost: ctx.helper.postServiceJSON('api/users/User_Post_List', {
          uid,
          Skip: 0,
          Take: 10,
          currentuid: uid,
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
      if(res.myPost.data.success) {
        myPost = res.myPost.data.data;
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
      yield ctx.render('mmy', {
        userInfo,
        myPost,
        bonusPoint,
        lastUpdateNickNameTime,
        lastUpdateHeadTime,
      });
    }
    * relation(ctx) {
      let uid = ctx.session.uid;
      let tag = ctx.query.tag;
      let follows = {};
      let userFriends = {};
      let userFollows = {};
      let userFollowers = {};
      let res = yield {
        follows: ctx.helper.postServiceJSON('api/users/GetLikeAuthorList', {
          uid,
          Skip: 0,
          Take: 10,
        }),
        userFriends: ctx.helper.postServiceJSON('api/users/User_Friends', {
          uid,
          Skip: 0,
          Take: 15,
        }),
        userFollows: ctx.helper.postServiceJSON('api/users/User_FollowList', {
          uid,
          Skip: 0,
          Take: 15,
        }),
        userFollowers: ctx.helper.postServiceJSON('api/users/User_FansList', {
          uid,
          Skip: 0,
          Take: 15,
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
      yield ctx.render('mmy_relation', {
        tag,
        follows,
        userFriends,
        userFollows,
        userFollowers,
      });
    }
    * message(ctx) {
      let uid = ctx.session.uid;
      let messages = yield ctx.helper.postServiceJSON('api/users/GetUserNotify', {
        uid,
        Skip: 0,
        Take: 10,
      });
      messages = messages.data.data;
      yield ctx.render('mmy_message', {
        messages,
      });
    }
    * post(ctx) {
      let uid = ctx.session.uid;
      let postList = yield ctx.helper.postServiceJSON('api/users/User_Post_List', {
        uid,
        Skip: 0,
        Take: 10,
        CurrentUid: uid,
      });
      postList = postList.data.data;
      yield ctx.render('mmy_post', {
        postList,
      });
    }
    * favor(ctx) {
      let uid = ctx.session.uid;
      let res = yield ctx.helper.postServiceJSON('api/users/GetUserFavor', {
        uid,
        ItemsType: 1,
        Skip: 0,
        Take: 30,
      });
      yield ctx.render('mmy_favor', {
        dataList: res.data.data,
      });
    }
    * favorPic(ctx) {
      let uid = ctx.session.uid;
      let res = yield ctx.helper.postServiceJSON('api/users/GetUserFavor', {
        uid,
        ItemsType: 2,
        Skip: 0,
        Take: 10,
      });
      yield ctx.render('mmy_favor_pic', {
        dataList: res.data.data,
      });
    }
    * favorPost(ctx) {
      let uid = ctx.session.uid;
      let res = yield ctx.helper.postServiceJSON('api/users/GetUserFavor', {
        uid,
        ItemsType: 3,
        Skip: 0,
        Take: 30,
      });
      yield ctx.render('mmy_favor_post', {
        dataList: res.data.data,
      });
    }
  }
  return Controller;
};
