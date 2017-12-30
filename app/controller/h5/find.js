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
          url: '/works/2015000000001591',
          pic: '//zhuanquan.xyz/pic/0d5b2a466e0bee90047123d926d829b5.jpg'
        },
        {
          url: '/post.html?postID=91200',
          pic: '//zhuanquan.xyz/pic/e70cdd87affae05deace6ec77e18b96f.jpg',
          title: '岁末福利',
        },
        {
          url: '/post.html?postID=91193',
          pic: '//zhuanquan.xyz/img/b43f3769b4ccc26289f653aa45bc880d.jpg',
          title: '转圈',
        },
        {
          url: '/works.html?worksID=2015000000001599',
          pic: '//zhuanquan.xyz/img/ed65b65bb840e8b324c600d7b066e0cc.jpg',
          title: '相携诗',
        },
        {
          url: '/works.html?worksID=2015000000001582',
          pic: '//zhuanquan.xyz/pic/3fc9dc8f4aa54ccfae45294dd689e820.jpg',
          title: '弥弥灼雪',
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
