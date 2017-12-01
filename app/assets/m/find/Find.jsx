/**
 * Created by army on 2017/6/18.
 */

import util from '../../d/common/util';
import net from '../../d/common/net';
import Banner from './Banner.jsx';
import HotWork from '../component/hotwork/HotWork.jsx';
import HotAuthor from '../component/hotauthor/HotAuthor.jsx';
import HotMusicAlbum from '../component/hotmusicalbum/HotMusicAlbum.jsx';
import HotCircle from '../component/hotcircle/HotCircle.jsx';
import HotPlayList from '../../d/component/hotplaylist/HotPlayList.jsx';
import HotPic from '../component/hotpic/HotPic.jsx';
import SubCmt from '../../d/component/subcmt/SubCmt.jsx';

let take = 30;
let skip = 10;
let take2 = 10;
let skip2 = 0;
let type = '0';

class Find extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let subCmt = self.ref.subCmt;
      subCmt.on('click', function() {
        location.href = '/circle/post';
      });
      let $window = $(window);
      $window.on('scroll', function() {
        self.checkMore($window);
      });
      migi.eventBus.on('poolEnd', function() {
        self.loading2 = false;
        if(type === '1') {
          self.message = self.loadEnd2 ? '已经到底了' : '';
        }
      });
    });
  }
  @bind loading
  @bind loadEnd
  @bind loading2
  @bind loadEnd2
  @bind message
  checkMore($window) {
    let self = this;
    let WIN_HEIGHT = $window.height();
    let HEIGHT = $(document.body).height();
    let bool;
    bool = $window.scrollTop() + WIN_HEIGHT + 30 > HEIGHT;
    if(!self.loading && bool) {
      if(type === '0') {
        self.load();
      }
      else if(type === '1') {
        self.load2();
      }
    }
  }
  load() {
    let self = this;
    if(self.loading || self.loadEnd) {
      return;
    }
    let hotPlayList = self.ref.hotPlayList;
    self.loading = true;
    self.message = '正在加载...';
    net.postJSON('/api/find/hotPlayList', { skip, take }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
        hotPlayList.appendData(data.data);
        if(!data.data.length || data.data.length < take) {
          self.loadEnd = true;
          if(type === '0') {
            self.message = '已经到底了';
          }
        }
        else {
          if(type === '0') {
            self.message = '';
          }
        }
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      self.loading = false;
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      self.loading = false;
    });
  }
  load2() {
    let self = this;
    if(self.loading2 || self.loadEnd2) {
      return;
    }
    self.loading2 = true;
    let hotPic = self.ref.hotPic;
    self.message = '正在加载...';
    net.postJSON('/api/find/hotPicList', { skip: skip2, take: take2 }, function(res) {
      if(res.success) {
        let data = res.data;
        skip2 += take2;
        if(!data.data.length || data.data.length < take2) {
          self.loadEnd2 = true;
          if(type === '1') {
            self.message = '已经到底了';
          }
        }
        else {
          if(type === '1') {
            self.message = '正在渲染图片....';
          }
        }
        hotPic.appendData(data.data);
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
        self.message = '';
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      self.message = '';
    });
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  clickChangeWork() {
    let self = this;
    net.postJSON('/api/find/hotWorkList', function(res) {
      if(res.success) {
        self.ref.hotWork.setData(res.data);
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  clickType(e, vd, tvd) {
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
      let rel = type = tvd.props.rel;
      let hotPlayList = this.ref.hotPlayList;
      let hotPic = this.ref.hotPic;
      if(rel === '0') {
        hotPic.hide();
        hotPlayList.show();
        this.message = this.loadEnd ? '已经到底了' : '';
      }
      else if(rel === '1') {
        hotPlayList.hide();
        hotPic.show();
        this.message = this.loadEnd2 ? '已经到底了' : '';
        if(skip2 === 0) {
          this.load2();
        }
      }
    }
  }
  render() {
    return <div class="find">
      <Banner dataList={ this.props.banner }/>
      <h4>推荐圈子</h4>
      <HotCircle ref="HotCircle" dataList={ this.props.hotCircleList }/>
      <h4>热门作品<small onClick={ this.clickChangeWork }>换一批</small></h4>
      <HotWork ref="hotWork" dataList={ this.props.hotWorkList }/>
      <h4>热门专辑</h4>
      <HotMusicAlbum ref="hotMusicAlbum" dataList={ this.props.hotMusicAlbumList }/>
      <h4>入驻作者</h4>
      <HotAuthor ref="hotAuthor" dataList={ this.props.hotAuthorList }/>
      <ul class="type fn-clear" ref="type" onClick={ { li: this.clickType } }>
        <li class="ma cur" rel="0">音乐</li>
        <li class="pic" rel="1">美图</li>
      </ul>
      <HotPlayList ref="hotPlayList" dataList={ this.props.hotPlayList.data }/>
      <HotPic ref="hotPic" hidden={ true }/>
      <div class="message">{ this.message }</div>
      <SubCmt ref="subCmt"
              tipText="-${n}"
              subText="发送"
              readOnly={ true }
              placeholder={ '小小的提示：现在可以把一个圈画在好几个圈子里哦！' }/>
    </div>;
  }
}

export default Find;
