/**
 * Created by army8735 on 2017/10/19.
 */

'use strict';

import util from '../common/util';
import net from '../common/net';

let list = [];
let index = 0;

class ImageView extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let $window = $(window);
      migi.eventBus.on('choosePic', function(l, i) {
        self.show();
        self.tops = $window.scrollTop();
        list = l;
        index = i;
        self.data = list[index];
      });
    });
  }
  @bind data = {}
  @bind tops = 0
  @bind fnLike
  @bind fnFavor
  show() {
    $(this.element).removeClass('fn-hide');
    let parent = window.parent;
    if(parent !== window && parent.upZIndex) {
      parent.upZIndex();
    }
  }
  hide() {
    $(this.element).addClass('fn-hide');
    let parent = window.parent;
    if(parent !== window && parent.downZIndex) {
      parent.downZIndex();
    }
  }
  clickPrev() {
    if(index) {
      let self = this;
      self.data = list[--index];
    }
  }
  clickNext() {
    if(index < list.length - 1) {
      let self = this;
      self.data = list[++index];
    }
  }
  clickClose() {
    this.hide();
  }
  clickLike(e, vd) {
    if(!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
      return;
    }
    let self = this;
    let $vd = $(vd.element);
    if(!$vd.hasClass('loading')) {
      $vd.addClass('loading');
      let data = self.data;
      net.postJSON('/api/works/likeWork', { workID: data.ItemID }, function (res) {
        if(res.success) {
          data.ISLike = res.data === 211;
          self.fnLike = null;
          migi.eventBus.emit('photoLike', data);
        }
        else if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        $vd.removeClass('loading');
      }, function () {
        alert(res.message || util.ERROR_MESSAGE);
        $vd.removeClass('loading');
      });
    }
  }
  clickFavor(e, vd) {
    if(!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
      return;
    }
    let self = this;
    let $vd = $(vd.element);
    let data = self.data;
    if($vd.hasClass('loading')) {
      //
    }
    else if($vd.hasClass('has')) {
      net.postJSON('/api/works/unFavorWork', { workID: data.ItemID }, function (res) {
        if(res.success) {
          data.ISFavor = false;
          self.fnFavor = null;
          migi.eventBus.emit('photoFavor', data);
        }
        else if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        $vd.removeClass('loading');
      }, function () {
        alert(res.message || util.ERROR_MESSAGE);
        $vd.removeClass('loading');
      });
    }
    else {
      net.postJSON('/api/works/favorWork', { workID: data.ItemID }, function (res) {
        if(res.success) {
          data.ISFavor = true;
          self.fnFavor = null;
          migi.eventBus.emit('photoFavor', data);
        }
        else if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        $vd.removeClass('loading');
      }, function () {
        alert(res.message || util.ERROR_MESSAGE);
        $vd.removeClass('loading');
      });
    }
  }
  clickDownload(e) {
    if(!$CONFIG.isLogin) {
      e.preventDefault();
      migi.eventBus.emit('NEED_LOGIN');
    }
  }
  render() {
    return <div class="image-view fn-hide">
      <div class="c" style={ 'top:' + this.tops + 'px' }>
        <img src={ util.autoSsl(util.img__60(this.data.FileUrl)) || '//zhuanquan.xin/img/blank.png' } style={ 'width:' + this.data.Width + 'px;' }/>
        <h3>{ this.data.ItemName }<small>{ this.data.Tips }</small></h3>
        <ul class="btn">
          <li class={ 'like' + (this.data.ISLike || this.fnLike ? ' has' : '') } onClick={ this.clickLike }/>
          <li class={ 'favor' + (this.data.ISFavor || this.fnFavor ? ' has' : '') } onClick={ this.clickFavor }/>
          <li class="download">
            <a href={ this.data.FileUrl }
               target="_blank"
               download={ this.data.ItemName + (this.data.FileUrl ? (/\.\w+$/.exec(this.data.FileUrl)[0] || '') : '') }
               onClick={ this.clickDownload }/>
          </li>
        </ul>
      </div>
      <b class="prev" onClick={ this.clickPrev }/>
      <b class="next" onClick={ this.clickNext }/>
      <b class="close" onClick={ this.clickClose }/>
    </div>;
  }
}

export default ImageView;
