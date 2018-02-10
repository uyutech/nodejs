/**
 * Created by army8735 on 2017/10/1.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      // yield ctx.service.mt.analysis();
      let uid = ctx.session.uid;
      let hotWorkList = [];
      let hotAuthorList = [];
      let hotMusicAlbumList = [];
      let hotPhotoAlbumList = [];
      let hotCircleList = [];
      let hotPlayList = {};
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
      let banner = [
        {
          url: '/post/171285',
          pic: '//zhuanquan.xyz/pic/a11aaacdbceec199eb508cc75d078847.jpg'
        },
        {
          url: '/works/2015000000002200',
          pic: '//zhuanquan.xyz/pic/975b02f6c1c1d0fd6015ca560c7015f8.jpg'
        },
        {
          url: '/works/2015000000001591',
          pic: '//zhuanquan.xyz/pic/0d5b2a466e0bee90047123d926d829b5.jpg'
        },
        {
          url: '/post/91193',
          pic: '//zhuanquan.xyz/img/b43f3769b4ccc26289f653aa45bc880d.jpg'
        },
        {
          url: '/works/2015000000001599',
          pic: '//zhuanquan.xyz/img/ed65b65bb840e8b324c600d7b066e0cc.jpg'
        },
        {
          url: '/works/2015000000001582',
          pic: '//zhuanquan.xyz/pic/3fc9dc8f4aa54ccfae45294dd689e820.jpg'
        }
      ];
      yield ctx.render('mfind', {
        hotWorkList,
        hotAuthorList,
        hotMusicAlbumList,
        hotPhotoAlbumList,
        hotCircleList,
        hotPlayList,
        banner,
      });
    }
  }
  return Controller;
};
