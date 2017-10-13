/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let hotWorkList = [];
      let hotAuthorList = [];
      let tags = {};
      let playList = [];
      let playList2 = [];
      let res = yield {
        hotWorkList: ctx.helper.postServiceJSON('api/find/Hot_works_List'),
        hotAuthorList: ctx.helper.postServiceJSON('api/find/Hot_Author_List'),
        tags: ctx.helper.postServiceJSON('api/find/GetTag'),
        playList: ctx.helper.postServiceJSON('api/find/GetFindWorkList', {
          Parameter: '',
          Skip: 0,
          Take: 10,
          SortType: 1,
        }),
        playList2: ctx.helper.postServiceJSON('api/find/GetFindWorkList', {
          Parameter: '',
          Skip: 0,
          Take: 10,
          SortType: 0,
        }),
      };
      if(res.hotWorkList.data.success) {
        hotWorkList = res.hotWorkList.data.data;
      }
      if(res.hotAuthorList.data.success) {
        hotAuthorList = res.hotAuthorList.data.data;
      }
      if(res.tags.data.success) {
        tags = res.tags.data.data;
      }
      if(res.playList.data.success) {
        playList = res.playList.data.data;
      }
      if(res.playList2.data.success) {
        playList2 = res.playList2.data.data;
      }
      tags.FilterlevelA = [{
        ID: 0,
        TagName: '音乐',
        TagType: 0,
        TagCount: 3957,
        Filterlevel: "A",
      }];

      yield ctx.render('dfind', {
        hotWorkList,
        hotAuthorList,
        tags,
        playList,
        playList2,
      });
    }
  }
  return Controller;
};
