/**
 * Created by army8735 on 2017/10/28.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';

let skip = 0;
let take = 12;
let sortType = 0;
let list = [];
let index = 0;
let tagName = '';
let ajax;

class Album extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let $window = $(window);
      self.load($window);
      $window.on('scroll', function() {
        self.checkMore($window);
      });

      let $c = $(self.ref.c.element);
      $c.on('click', '.like', function() {
        let $b = $(this);
        if($b.hasClass('loading')) {
          return;
        }
        $b.addClass('loading');
        let id = $b.attr('itemID');
        net.postJSON('/api/works/likeWork', { workID: id }, function(res) {
          if(res.success) {
            if(res.data === 211) {
              $b.addClass('has');
            }
            else {
              $b.removeClass('has');
            }
          }
          else if(res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          }
          else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          $b.removeClass('loading');
        }, function (res) {
          alert(res.message || util.ERROR_MESSAGE);
          $b.removeClass('loading');
        });
      });
      $c.on('click', '.favor', function() {
        let $b = $(this);
        if($b.hasClass('loading')) {
          return;
        }
        $b.addClass('loading');
        let id = $b.attr('itemID');
        let url = $b.hasClass('has') ? '/api/works/unFavorWork' : '/api/works/favorWork';
        net.postJSON(url, { workID: id }, function(res) {
          if(res.success) {
            if(url === '/api/works/favorWork') {
              $b.addClass('has');
            }
            else {
              $b.removeClass('has');
            }
          }
          else if(res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          }
          else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          $b.removeClass('loading');
        }, function (res) {
          alert(res.message || util.ERROR_MESSAGE);
          $b.removeClass('loading');
        });
      });
      $c.on('click', 'li', function(e) {
        let $li = $(this);
        if(e.target.nodeName === 'LI' || e.target.nodeName === 'IMG') {
          let index = $li.attr('rel');
          migi.eventBus.emit('choosePic', list, index);
        }
      });
    });
  }
  @bind loading
  @bind loadEnd
  load($window) {
    let self = this;
    if(self.loading) {
      return;
    }
    self.loading = true;
    let $l1 = $(self.ref.l1.element);
    let $l2 = $(self.ref.l2.element);
    function addWaterFall(li) {
      let $min = $l1;
      if($l2.height() < $min.height()) {
        $min = $l2;
      }
      li.appendTo($min[0]);
    }
    self.loadImg(function(data) {
      let length = data.data.length;
      let i = 0;
      // 先把有高宽的直接加入流中
      for(;i < length; i++) {
        let item = data.data[i];
        if(item.Width && item.Height) {
          let li = self.genItem(item);
          addWaterFall(li);
        }
        else {
          break;
        }
      }
      //剩下的先获取高度再加入流
      let num = length - i;
      let count = 0;
      let j = i;
      if(num === 0) {
        self.loading = false;
        if($(document.body).height() <= $window.height() && !self.loadEnd) {
          self.load($window);
        }
      }
      for(;i < length; i++) {
        let item = data.data[i];
        self.loadImgSize(item, function() {
          count++;
          if(count === num) {
            for(;j < length; j++) {
              let item = data.data[j];
              let li = self.genItem(item);
              addWaterFall(li);
            }
            self.loading = false;
            if($(document.body).height() <= $window.height() && !self.loadEnd) {
              self.load($window);
            }
          }
        });
      }
    });
  }
  checkMore($window) {
    let self = this;
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
  genItem(data) {
    list.push(data);
    if(data.Width <= 144) {
      return <li rel={ index++ }>
        <img src={ util.autoSsl(util.img144_(data.FileUrl)) || '//zhuanquan.xin/img/blank.png' } height={ data.Height }/>
        <b class={ 'like' + (data.ISLike ? ' has' : '') } itemID={ data.ItemID }/>
        <b class={ 'favor' + (data.ISFavor ? ' has' : '') } itemID={ data.ItemID }/>
      </li>;
    }
    let height = data.Height * 144 / data.Width;
    return <li rel={ index++ }>
      <img src={ util.autoSsl(util.img144_(data.FileUrl)) || '//zhuanquan.xin/img/blank.png' } height={ height }/>
      <b class={ 'like' + (data.ISLike ? ' has' : '') } itemID={ data.ItemID }/>
      <b class={ 'favor' + (data.ISFavor ? ' has' : '') } itemID={ data.ItemID }/>
    </li>;
  }
  loadImgSize(data, cb) {
    let img = document.createElement('img');
    img.className = 'temp';
    img.src = util.autoSsl(util.img__60(data.FileUrl));
    img.onload = function() {
      data.Width = img.width;
      data.Height = img.height;
      cb();
      document.body.removeChild(img);
    };
    img.onerror = function() {
      data.FileUrl = '//zhuanquan.xin/img/blank.png';
      data.Width = 1;
      data.Height = 100;
      cb();
      document.body.removeChild(img);
    };
    document.body.appendChild(img);
  }
  clear() {
    let self = this;
    let $l1 = $(self.ref.l1.element);
    let $l2 = $(self.ref.l2.element);
    $l1.html('');
    $l2.html('');
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
    return <div class="mod mod-album">
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
      <div class="c" ref="c">
        <div>
          <ul ref="l1"/>
        </div>
        <div>
          <ul ref="l2"/>
        </div>
      </div>
    </div>;
  }
}

export default Album;
