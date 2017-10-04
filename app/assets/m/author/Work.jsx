/**
 * Created by army on 2017/6/24.
 */

import net from '../common/net';
import util from '../common/util';
import DoubleCheck from '../component/doublecheck/DoubleCheck.jsx';
import PlayList from '../component/playlist/PlayList.jsx';

let ajax;
let SortType = '1';
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
              doubleCheck.tagList2 = data;
              doubleCheck.autoWidth2();
              doubleCheck.setCacheL2(param, data);
              doubleCheck.checkL2();
              doubleCheck.change();
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
    this.ref.doubleCheck.autoWidth();
    this.ref.doubleCheck.autoWidth2();
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  load() {
    let self = this;
    net.postJSON('/api/author/GetAuthorWorks', { AuthorID: self.authorID }, function (res) {
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
    ajax = net.postJSON('/api/author/playList', { authorID: self.authorID, parameter }, function(res) {
      if(res.success) {
        let data = res.data;
        self.ref.playList.setData(data.data);
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
      <div class="bar fn-hide">
        <ul class="btn fn-clear">
          <li class="all">播放全部</li>
          <li class="audio"></li>
          <li class="video"></li>
        </ul>
        <ul class="type fn-clear" onClick={ this.switchType }>
          <li class="cur" rel="1">最热</li>
          <li rel="0">最新</li>
        </ul>
      </div>
      <PlayList ref="playList" dataList={ this.props.playList.data }/>
    </div>;
  }
}

export default Work;
