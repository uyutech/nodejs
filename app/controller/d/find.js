/**
 * Created by army8735 on 2017/10/6.
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
      let hotPostList = [];
      let hotPlayList = [];
      let myCircleList = {};
      let res = yield {
        hotWorkList: ctx.helper.postServiceJSON2('api/find/Hot_works_List', {
          uid,
          Skip: 0,
          Take: 10,
        }),
        hotAuthorList: ctx.helper.postServiceJSON2('api/find/Hot_Author_List', {
          uid,
          Skip: 0,
          Take: 10,
        }),
        hotMusicAlbumList: ctx.helper.postServiceJSON2('api/find/Hot_album_List', {
          uid,
          Skip: 0,
          Take: 10,
        }),
        hotCircleList: ctx.helper.postServiceJSON2('api/find/GetCirclingInfo', {
          uid,
          Skip: 0,
          Take: 6,
        }),
        hotPostList: ctx.helper.postServiceJSON2('api/find/Hot_Post_List', {
          uid,
          Skip: 0,
          Take: 30,
        }),
        hotPlayList: ctx.helper.postServiceJSON2('api/find/Hot_WorkItems', {
          uid,
          Skip: 0,
          Take: 30,
        }),
        myCircleList: ctx.helper.postServiceJSON2('api/Circling/GetAddPostCircling', {
          uid,
          Skip: 0,
          Take: 6,
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
      if(res.hotPostList.data.success) {
        hotPostList = res.hotPostList.data.data;
      }
      if(res.hotPlayList.data.success) {
        hotPlayList = res.hotPlayList.data.data;
      }
      if(res.myCircleList.data.success) {
        myCircleList = res.myCircleList.data.data;
      }
      let banner = [
        {
          url: '/post/91200',
          pic: '//zhuanquan.xyz/pic/e70cdd87affae05deace6ec77e18b96f.jpg'
        },
        {
          url: '/#/post/91193',
          pic: '//zhuanquan.xyz/img/b43f3769b4ccc26289f653aa45bc880d.jpg'
        },
        {
          url: '/#/works/2015000000001599',
          pic: '//zhuanquan.xyz/img/ed65b65bb840e8b324c600d7b066e0cc.jpg'
        },
        {
          url: '/#/works/2015000000001582',
          pic: '//zhuanquan.xyz/pic/3fc9dc8f4aa54ccfae45294dd689e820.jpg'
        }
      ];
      yield ctx.render('dfind', {
        hotWorkList,
        hotAuthorList,
        hotMusicAlbumList,
        hotPhotoAlbumList,
        hotCircleList,
        hotPostList,
        hotPlayList,
        banner,
        myCircleList,
      });
    }
  }
  return Controller;
};
