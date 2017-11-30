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
      let hotPhotoAlbumList = [];
      let hotCircleList = [];
      let hotPlayList = [];
      let res = yield {
        hotWorkList: ctx.helper.postServiceJSON('api/find/Hot_works_List', {
          Skip: 0,
          Take: 10,
        }),
        hotAuthorList: ctx.helper.postServiceJSON('api/find/Hot_Author_List', {
          Skip: 0,
          Take: 10,
        }),
        hotPhotoAlbumList: ctx.helper.postServiceJSON('api/find/Hot_PHOTO_List', {
          Skip: 0,
          Take: 10,
        }),
        hotMusicAlbumList: ctx.helper.postServiceJSON('api/find/Hot_album_List', {
          Skip: 0,
          Take: 10,
        }),
        hotCircleList: ctx.helper.postServiceJSON('api/find/GetPost', {
          uid,
          Skip: 0,
          Take: 6,
        }),
        hotPlayList: ctx.helper.postServiceJSON('api/find/Hot_WorkItems', {
          uid,
          Skip: 0,
          Take: 10,
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
      if(res.hotPhotoAlbumList.data.success) {
        hotPhotoAlbumList = res.hotPhotoAlbumList.data.data;
      }
      if(res.hotCircleList.data.success) {
        hotCircleList = res.hotCircleList.data.data.data;
      }
      if(res.hotPlayList.data.success) {
        hotPlayList = res.hotPlayList.data.data;
      }
      let banner = [
        {
          url: '/works/2015000000001582',
          pic: '//zhuanquan.xin/pic/3fc9dc8f4aa54ccfae45294dd689e820.jpg'
        },
        {
          url: '/works/2015000000001368',
          pic: '//zhuanquan.xin/pic/379af10b78315ded5948e813d2e64a69.jpg-750_'
        },
        {
          url: '/works/2015000000000001',
          pic: '//zhuanquan.xin/pic/e34cc1fb3102e63b507293f6e5a20515.jpg-750_'
        },
        {
          url: '/works/2015000000000002',
          pic: '//zhuanquan.xin/pic/b1284084f38e8cac0c35eddd60948af1.jpg-750_'
        }
      ];
      ctx.body = ctx.helper.okJSON({
        hotWorkList,
        hotAuthorList,
        hotMusicAlbumList,
        hotPhotoAlbumList,
        hotCircleList,
        hotPlayList,
        banner,
      });
    }
    * hotWorkList(ctx) {
      let uid = ctx.session.uid;
      let res = yield ctx.helper.postServiceJSON('api/find/Hot_works_List', {
        uid,
        Skip: 0,
        Take: 10,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
