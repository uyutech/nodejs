/**
 * Created by army on 2017/6/24.
 */

import DoubleCheck from '../component/doublecheck/DoubleCheck.jsx';
import PlayList from '../component/playlist/PlayList.jsx';

let ajax;
let SortType = '1';
let Parameter = '';
let ajaxL2;

class Work extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.authorID = -1;
    self.on(migi.Event.DOM, function() {
      let doubleCheck = self.ref.doubleCheck;
      doubleCheck.on('changeL1', function(param) {
        if(param) {
          if(ajaxL2) {
            ajaxL2.abort();
          }
          doubleCheck.isLoadindL2 = true;
          util.postJSON('api/author/GetAuthorFilterlevelB', { AuthorID: self.authorID, FilterlevelA: param }, function (res) {
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
    });
  }
  @bind authorID
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  load() {
    let self = this;
    util.postJSON('api/author/GetAuthorWorks', { AuthorID: self.authorID }, function (res) {
      if(res.success) {
        let data = res.data;
        self.ref.doubleCheck.setData(data);
      }
    });
    self.loadPlayList();
  }
  loadPlayList() {
    let self = this;
    if(ajax) {
      ajax.abort();
    }
    ajax = util.postJSON('api/author/SearchWorks', { AuthorID: self.authorID, Parameter, Skip: 0, Take: 10, SortType }, function(res) {
      if(res.success) {
        let data = res.data;
        self.ref.playList.setData(data.data);
      }
    });
    util.postJSON('api/author/SearchWorks', { AuthorID: self.authorID, Parameter, Skip: 1, Take: 10, SortType: '0' }, function(res) {
      if(res.success) {
        let data = res.data;
        self.ref.playList.setData2(data.data);
      }
    });
  }
  switchType(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    SortType = $ul.find('.cur').attr('rel');
    this.loadPlayList();
  }
  render() {
    return <div class="works fn-hide">
      <DoubleCheck ref="doubleCheck" tags={ this.props.tags }/>
      <PlayList ref="playList" dataList={ this.props.playList.data } dataList2={ this.props.playList2.data }/>
    </div>;
  }
}

export default Work;
