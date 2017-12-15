/**
 * Created by army8735 on 2017/11/28.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let hotWorkList = [];
      let hotAuthorList = [];
      let hotMusicAlbumList = [];
      let hotCircleList = [];
      let hotPlayList = [];
      let hotPicList = [];
      let res = yield {
        hotWorkList: ctx.helper.postServiceJSON2('api/find/Hot_works_List', {
          Skip: 0,
          Take: 10,
        }),
        hotAuthorList: ctx.helper.postServiceJSON2('api/find/Hot_Author_List', {
          Skip: 0,
          Take: 10,
        }),
        hotMusicAlbumList: ctx.helper.postServiceJSON2('api/find/Hot_album_List', {
          Skip: 0,
          Take: 10,
        }),
        hotCircleList: ctx.helper.postServiceJSON2('api/find/GetCirclingInfo', {
          uid,
          Skip: 0,
          Take: 6,
        }),
        hotPlayList: ctx.helper.postServiceJSON2('api/find/Hot_WorkItems', {
          uid,
          Skip: 0,
          Take: 10,
        }),
        hotPicList: ctx.helper.postServiceJSON2('api/find/Hot_PicWorkItems', {
          uid,
          Skip: 0,
          Take: 10,
        }),
        count: ctx.helper.postServiceJSON2('api/users/PostRecordUserIP', {
          uid,
          ip: ctx.request.header['x-real-ip'],
        }),
      };
      if(res.hotWorkList.data.success) {
        hotWorkList = res.hotWorkList.data.data;
      }
      if(res.hotAuthorList.data.success) {
        hotAuthorList = res.hotAuthorList.data.data;
      }
      if(res.hotMusicAlbumList.data.success) {
        hotMusicAlbumList = res.hotMusicAlbumList.data.data;
      }
      if(res.hotCircleList.data.success) {
        hotCircleList = res.hotCircleList.data.data.data;
      }
      if(res.hotPlayList.data.success) {
        hotPlayList = res.hotPlayList.data.data;
      }
      if(res.hotPicList.data.success) {
        hotPicList = res.hotPicList.data.data;
      }
      let banner = [
        {
          url: '/post.html?postID=2020000000030405',
          pic: '//zhuanquan.xyz/pic/f3e188709eaccc78f6737f9fcf6992e9.png-750_',
          title: '画圈正文',
        },
        {
          url: '/works.html?worksID=2015000000001582',
          pic: '//zhuanquan.xyz/pic/3fc9dc8f4aa54ccfae45294dd689e820.jpg-750_',
          title: '弥弥灼雪',
        },
        {
          url: '/works.html?worksID=2015000000001368',
          pic: '//zhuanquan.xyz/pic/379af10b78315ded5948e813d2e64a69.jpg-750_',
          title: '万世芬芳录',
        },
        {
          url: '/works.html?worksID=2015000000000001',
          pic: '//zhuanquan.xyz/pic/e34cc1fb3102e63b507293f6e5a20515.jpg-750_',
          title: '皎然记',
        },
        {
          url: '/works.html?worksID=2015000000000002',
          pic: '//zhuanquan.xyz/pic/b1284084f38e8cac0c35eddd60948af1.jpg-750_',
          title: '说梦',
        }
      ];
      ctx.body = ctx.helper.okJSON({
        hotWorkList,
        hotAuthorList,
        hotMusicAlbumList,
        hotCircleList,
        hotPlayList,
        hotPicList,
        banner,
      });
    }
    * hotWorkList(ctx) {
      let uid = ctx.session.uid;
      let res = yield ctx.helper.postServiceJSON2('api/find/Hot_works_List', {
        uid,
        Skip: 0,
        Take: 10,
      });
      ctx.body = res.data;
    }
    * hotPlayList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/find/Hot_WorkItems', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * hotPicList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/find/Hot_PicWorkItems', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * allWorks(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/find/GetAllWorks_List', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * allAlbums(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/find/Hot_album_List', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * allAuthors(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/find/Hot_Author_List', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * allCircles(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/find/GetAllCircling', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
