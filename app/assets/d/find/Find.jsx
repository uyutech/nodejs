/**
 * Created by army8735 on 2017/9/21.
 */

import Banner from './Banner.jsx';
import HotWork from '../component/hotwork/HotWork.jsx';
import HotCollection from '../component/hotcollection/HotCollection.jsx';
import HotAuthor from '../component/hotauthor/HotAuthor.jsx';
import DoubleCheck from '../component/doublecheck/DoubleCheck.jsx';
import PlayList from '../component/playlist/PlayList.jsx';

let ajax;
let SortType = '1';
let Parameter = '';
let ajaxL2;

class Find extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let doubleCheck = self.ref.doubleCheck;
      doubleCheck.on('changeL1', function(param) {
        if(param) {
          if(ajaxL2) {
            ajaxL2.abort();
          }
          doubleCheck.isLoadindL2 = true;
          util.postJSON('api/find/GetAuthorFilterlevelB', { FilterlevelA: param }, function (res) {
            if(res.success) {
              let data = res.data;
              doubleCheck.tagList2 = data;
              doubleCheck.autoWidth2();
              doubleCheck.setCacheL2(param, data);
              doubleCheck.checkL2();
            }
            doubleCheck.isLoadindL2 = false;
          }, function() {
            doubleCheck.isLoadindL2 = false;
          });
        }
      });
      doubleCheck.on('change', function(lA, lB) {
        let temp = lA.concat(lB);
        temp = temp.length ? JSON.stringify(temp) : '';
        if(temp !== Parameter) {
          Parameter = temp;
          self.loadPlayList();
        }
      });
      let hotWork = self.ref.hotWork;
      hotWork.on('change', function() {
        util.postJSON('api/find/Hot_works_List', function(res) {
          if(res.success) {
            let data = res.data;
            hotWork.dataList = data;
          }
        });
      });
    });
  }
  load() {
    let self = this;
    util.postJSON('api/find/Hot_works_List', function(res) {
      if(res.success) {
        let data = res.data;
        self.ref.hotWork.dataList = data;
      }
    });
    util.postJSON('api/find/Hot_Author_List', function(res) {
      if(res.success) {
        let data = res.data;
        self.ref.hotAuthor.dataList = data;
      }
    });
    util.postJSON('api/find/GetTag', { Skip:0, Take: 10 }, function(res) {
      if(res.success) {
        let data = res.data;
        data.FilterlevelA = [{
          ID: 0,
          TagName: '音乐',
          TagType: 0,
          TagCount: 3957,
          Filterlevel: "A",
        }];
        self.ref.doubleCheck.setData(data);
      }
      self.loadPlayList();
    });
  }
  loadPlayList() {
    let self = this;
    if(ajax) {
      ajax.abort();
    }
    ajax = util.postJSON('api/find/GetFindWorkList', { Parameter, Skip: 0, Take: 10, SortType }, function(res) {
      if(res.success) {
        let data = res.data;
        self.ref.playList.setData(data.data);
      }
    });
  }
  render() {
    return <div class="find">
      <Banner/>
      <HotWork ref="hotWork" title="推荐作品" dataList={ this.props.hotWorkList }/>
      <HotCollection ref="hotCollection" title="推荐专辑"/>
      <HotAuthor ref="hotAuthor" title="推荐作者" dataList={ this.props.hotAuthorList }/>
      <DoubleCheck ref="doubleCheck" tags={ this.props.tags }/>
      <PlayList ref="playList" dataList={ this.props.playList.data } dataList2={ this.props.playList2.data }/>
    </div>;
  }
}

export default Find;
