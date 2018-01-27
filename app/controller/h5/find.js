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
          url: '/works.html?worksID=2015000000002200',
          pic: '//zhuanquan.xyz/pic/975b02f6c1c1d0fd6015ca560c7015f8.jpg',
          title: '述岚记',
        },
        {
          url: '/works.html?worksID=2015000000001591',
          pic: '//zhuanquan.xyz/pic/0d5b2a466e0bee90047123d926d829b5.jpg',
          title: '惟我自在',
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
    * newIndex(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let tagList = [];
      let res = yield ctx.helper.postServiceJSON2('/api/RecommendHomes/GetFindTitle', {
        uid,
      });
      if(!res.data || !res.data.success) {
        return ctx.body = ctx.helper.errorJSON({});
      }
      tagList = res.data.data;
      let bannerList = [];
      let dataList = [];
      if(tagList && tagList.length) {
        let id = tagList[0].ID;
        let res = yield {
          bannerList: ctx.helper.postServiceJSON2('/api/RecommendHomes/GetFindBanner', {
            uid,
            findTypeID: id,
          }),
          dataList: ctx.helper.postServiceJSON2('/api/RecommendHomes/GetFindInformationList', {
            uid,
            findTypeID: id,
            skip: body.skip || 0,
            take: body.take || 10,
          }),
        };
        if(res.bannerList.data && res.bannerList.data.success) {
          bannerList = res.bannerList.data.data;
        }
        if(res.dataList.data && res.dataList.data.success) {
          dataList = res.dataList.data.data;
        }
      }
      ctx.body = ctx.helper.okJSON({
        tagList,
        bannerList,
        dataList,
      });
    }
    * recommendList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('/api/RecommendHomes/GetFindInformationList', {
        uid,
        findTypeID: body.id,
        skip: body.skip || 0,
        take: body.take || 10,
      });
      ctx.body = res.data;
    }
    * typeList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let id = body.id;
      if(!id) {
        return ctx.body = ctx.helper.errorJSON({});
      }
      let bannerList = [];
      let dataList = [];
      let typeList = [];
      let itemList = {};
      let res = yield {
        bannerList: ctx.helper.postServiceJSON2('/api/RecommendHomes/GetFindBanner', {
          uid,
          FindTypeID: id,
        }),
        dataList: ctx.helper.postServiceJSON2('/api/RecommendHomes/GetFindInformationList', {
          uid,
          FindTypeID: id,
          skip: body.skip || 0,
          take: body.take || 10,
        }),
        typeList: ctx.helper.postServiceJSON2('/api/RecommendHomes/GetFindTypeGroup', {
          uid,
          FindTypeID: id,
        }),
      };
      if(res.bannerList.data && res.bannerList.data.success) {
        bannerList = res.bannerList.data.data;
      }
      if(res.dataList.data && res.dataList.data.success) {
        dataList = res.dataList.data.data;
      }
      if(res.typeList.data.success) {
        typeList = res.typeList.data.data;
        if(typeList.length) {
          let first = typeList[0];
          let res2 = yield ctx.helper.postServiceJSON2('/api/RecommendHomes/GetItemsByGroupID', {
            uid,
            GroupID: first.GroupID,
            skip: 0,
            take: 10,
          });
          if(res2.data.success) {
            itemList = res2.data.data;
          }
        }
      }
      ctx.body = ctx.helper.okJSON({
        bannerList,
        dataList,
        typeList,
        itemList,
      });
    }
    * itemList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let typeID = body.typeID;
      let groupID = body.groupID;
      if(!groupID) {
        return ctx.body = ctx.helper.errorJSON({});
      }
      let res = yield ctx.helper.postServiceJSON2('/api/RecommendHomes/GetItemsByGroupID', {
        uid,
        GroupID: groupID,
        ItemsTypeID: typeID,
        skip: body.skip || 0,
        take: body.take || 10,
      });
      ctx.body = res.data;
    }
    * search(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let keyword = body.keyword.trim();
      if(!keyword) {
        return;
      }
      let skip = body.skip || 0;
      let take = body.take || 10;
      let authorList = {};
      let userList = {};
      let worksList = {};
      let tagList = {};
      let res = yield {
        authorList: ctx.helper.postServiceJSON2('/api/search/SearchAuthor', {
          uid,
          keyword,
          skip,
          take,
        }),
        userList: ctx.helper.postServiceJSON2('/api/search/SearchUsers', {
          uid,
          keyword,
          skip,
          take,
        }),
        worksList: ctx.helper.postServiceJSON2('/api/search/SearchWork', {
          uid,
          keyword,
          skip,
          take,
        }),
        tagList: ctx.helper.postServiceJSON2('/api/search/SearchTag', {
          uid,
          keyword,
          skip,
          take,
        }),
      };
      if(res.authorList.data.success) {
        authorList = res.authorList.data.data;
      }
      if(res.userList.data.success) {
        userList = res.userList.data.data;
      }
      if(res.worksList.data.success) {
        worksList = res.worksList.data.data;
      }
      if(res.tagList.data.success) {
        tagList = res.tagList.data.data;
      }
      ctx.body = ctx.helper.okJSON({
        authorList,
        userList,
        worksList,
        tagList,
      });
    }
  }
  return Controller;
};
