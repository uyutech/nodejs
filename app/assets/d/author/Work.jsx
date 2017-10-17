/**
 * Created by army on 2017/6/24.
 */

import net from '../common/net';
import util from '../common/util';
import DoubleCheck from '../component/doublecheck/DoubleCheck.jsx';
import PlayList from '../component/playlist/PlayList.jsx';

let ajax;
let sortType = '1';
let parameter = '';
let ajaxL2;

class Work extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.authorID = self.props.authorID;
    self.on(migi.Event.DOM, function() {
      let doubleCheck = self.ref.doubleCheck;
      doubleCheck.on('changeL1', function(param) {
        if(param) {
          if(ajaxL2) {
            ajaxL2.abort();
          }
          doubleCheck.isLoadindL2 = true;
          net.postJSON('/api/author/tagB', { authorID: self.authorID, tagA: param }, function (res) {
            if(res.success) {
              let data = res.data;
              doubleCheck.checkL2();
              doubleCheck.setCacheL2(param, data);
              doubleCheck.tagList2 = data;
              doubleCheck.change();
              // doubleCheck.autoWidth2();
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
        if(temp !== parameter) {
          parameter = temp;
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
  loadPlayList() {
    let self = this;
    if(ajax) {
      ajax.abort();
    }
    ajax = net.postJSON('/api/author/searchWorks', { authorID: self.authorID, parameter, skip: 0, take: 10, sortType }, function(res) {
      if(res.success) {
        let data = res.data;
        self.ref.playList.dataList = data.data;
      }
    });
    // net.postJSON('api/author/SearchWorks', { AuthorID: self.authorID, parameter, skip: 1, take: 10, sortType: '0' }, function(res) {
    //   if(res.success) {
    //     let data = res.data;
    //     self.ref.playList.setData2(data.data);
    //   }
    // });
  }
  switchType(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    sortType = $ul.find('.cur').attr('rel');
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
