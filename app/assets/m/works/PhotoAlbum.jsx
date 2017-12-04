/**
 * Created by army8735 on 2017/10/28.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';
import HotPic from '../component/hotpic/HotPic.jsx';

let skip = 0;
let take = 12;
let sortType = 0;
let tagName = '';
let ajax;

class PhotoAlbum extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let $window = $(window);
      $window.on('scroll', function() {
        self.checkMore($window);
      });
      if(!$(self.element).hasClass('fn-hide')) {
        self.load();
      }

      let $hotPic = $(self.ref.hotPic.element);
      $hotPic.on('click', 'img', function() {});

      migi.eventBus.on('photoLike', function(data) {
        let $li = $('#photo_' + data.ItemID);
        if(data.ISLike) {
          $li.find('.like').addClass('has');
        }
        else {
          $li.find('.like').removeClass('has');
        }
      });
      migi.eventBus.on('photoFavor', function(data) {
        let $li = $('#photo_' + data.ItemID);
        if(data.ISLike) {
          $li.find('.favor').addClass('has');
        }
        else {
          $li.find('.favor').removeClass('has');
        }
      });
    });
  }
  @bind loading
  @bind loadEnd
  @bind message
  load() {
    let self = this;
    if(self.loading) {
      return;
    }
    self.loading = true;
    self.message = '正在加载...';
    if(ajax) {
      ajax.abort();
    }
    ajax = net.postJSON('/api/works/photoList', { worksID: this.props.worksID, skip, take, sortType, tagName }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
        if(skip >= data.Size) {
          self.loadEnd = true;
          self.message = '已经到底了';
        }
        else {
          self.message = '';
        }
        self.ref.hotPic.appendData(data.data);
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      self.loading = false;
    }, function (res) {
      alert(res.message || util.ERROR_MESSAGE);
      self.loading = false;
    });
  }
  checkMore($window) {
    let self = this;
    if($(self.element).hasClass('fn-hide')) {
      return;
    }
    let WIN_HEIGHT = $window.height();
    let HEIGHT = $(document.body).height();
    let bool;
    bool = $window.scrollTop() + WIN_HEIGHT + 30 > HEIGHT;
    if(!self.loading && !self.loadEnd && bool) {
      self.load($window);
    }
  }
  loadImg(cb) {
    let self = this;
    if(ajax) {
      ajax.abort();
    }
    ajax = net.postJSON('/api/works/photoList', { worksID: this.props.worksID, skip, take, sortType, tagName }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
        if(skip >= data.Size) {
          self.loadEnd = true;
        }
        cb(data);
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function (res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  clear() {
    this.ref.hotPic.clear();
    skip = 0;
    self.loadEnd = false;
  }
  switchType(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    let rel = $ul.find('cur').attr('rel');
    sortType = rel;
    skip = 0;
    this.clear();
    this.load($(window));
  }
  switchType2(e, vd, tvd) {
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
      tagName = tvd.props.rel;
      this.clear();
      this.load($(window));
    }
  }
  render() {
    return <div class={ 'mod mod-photoalbum' + (this.props.hidden ? ' fn-hide' : '') }>
      <div class="fn">
        <ul class="type fn-clear" onClick={ { li: this.switchType2 } }>
          <li class="cur" rel="">全部</li>
          {
            (this.props.labelList || []).map(function(item) {
              return <li rel={ item.Tag_Name }>{ item.Tag_Name }</li>;
            })
          }
        </ul>
        <ul class="type2 fn-clear" onClick={ this.switchType }>
          <li class="cur" rel="0">最新</li>
          <li rel="1">最热</li>
        </ul>
      </div>
      <HotPic ref="hotPic"/>
      <div class="message">{ this.message }</div>
    </div>;
  }
}

export default PhotoAlbum;
