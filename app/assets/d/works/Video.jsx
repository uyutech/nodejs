/**
 * Created by army8735 on 2017/9/7.
 */

import util from '../common/util';
import net from '../common/net';

let isVStart;
let vOffsetX;
let isStart;
let offsetX;

class Video extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.datas) {
      self.setData(self.props.datas);
      if(self.props.show) {
        self.on(migi.Event.DOM, function() {
          let uid = window.$CONFIG ? $CONFIG.uid : '';
          let key = uid + 'volume';
          self.volume = localStorage[key];
          self.addMedia();
          $(self.ref.fn.element).removeClass('fn-hidden');
        });
      }
      self.on(migi.Event.DOM, function() {
        $(document).on('mousemove', this.mousemove.bind(this));
        $(document).on('mouseup', this.mouseup.bind(this));
        $(document).on('mousemove', this.vmousemove.bind(this));
        $(document).on('mouseup', this.vmouseup.bind(this));
      });
    }
  }
  @bind datas = []
  @bind index = 0
  @bind isPlaying
  @bind workIndex = 0
  @bind duration
  @bind muted
  @bind fnFavor
  @bind fnLike
  get currentTime() {
    return this._currentTime || 0;
  }
  @bind
  set currentTime(v) {
    this._currentTime = v;
    if(this.video && v !== this.video.element.currentTime) {
      this.video.element.currentTime = v;
    }
  }
  get volume() {
    return this._volume || 0.5;
  }
  @bind
  set volume(v) {
    this._volume = v;
    migi.eventBus.emit('SET_VOLUME', v);
    if(this.video) {
      this.video.element.volume = v;
    }
  }
  setData(datas) {
    let self = this;
    self.datas = datas;
    return this;
  }
  addMedia() {
    let video = <video ref="video"
                       src={ this.datas[this.index].FileUrl }
                       onClick={ this.clickPlay.bind(this) }
                       onTimeupdate={ this.onTimeupdate.bind(this) }
                       onLoadedmetadata={ this.onLoadedmetadata.bind(this) }
                       onPause={ this.onPause.bind(this) }
                       onPlaying={ this.onPlaying.bind(this) }
                       preload="meta"
                       playsinline="true"
                       webkit-playsinline="true">
      your browser does not support the video tag
    </video>;
    this.video = video;
    video.prependTo(this.ref.c.element);
    this.volume = this.volume;
  }
  show() {
    $(this.element).removeClass('fn-hide');
    let uid = window.$CONFIG ? $CONFIG.uid : '';
    let key = uid + 'volume';
    this.volume = localStorage[key];
    if(!this.video) {
      this.addMedia();
    }
    $(this.ref.fn.element).removeClass('fn-hidden');
    return this;
  }
  hide() {
    $(this.element).addClass('fn-hide');
    return this;
  }
  onTimeupdate(e) {
    let currentTime = this._currentTime = e.target.currentTime;
    let percent = currentTime / this.duration;
    this.setBarPercent(percent);
  }
  onProgress(e) {
  }
  onLoadedmetadata(e) {
    this.duration = e.target.duration;
    this.canControl = true;
  }
  onPlaying(e) {
    this.duration = e.target.duration;
  }
  onPause() {
  }
  play() {
    this.video.element.play();
    this.isPlaying = true;
    return this;
  }
  pause() {
    this.video && this.video.element.pause();
    this.isPlaying = false;
    return this;
  }
  clickType(e, vd, tvd) {
    if(this.index !== tvd.props.rel) {
      this.index = tvd.props.rel;
      this.video.element.src = this.datas[this.index].FileUrl;
      this.emit('switchTo', this.datas[this.index]);
    }
  }
  vmousedown(e) {
    e.preventDefault();
    isVStart = true;
    vOffsetX = $(this.ref.volume.element).offset().left;
  }
  vmousemove(e) {
    if(isVStart) {
      e.preventDefault();
      let x = e.pageX;
      let diff = x - vOffsetX;
      let width = $(this.ref.volume.element).width();
      diff = Math.max(0, diff);
      diff = Math.min(width, diff);
      let percent = diff / width;
      this.volume = percent;
    }
  }
  vmouseup() {
    isVStart = false;
  }
  clickStart(e) {
    this.play();
  }
  clickVolume(e) {
    let cn = e.target.className;
    if(cn !== 'p' && cn.indexOf('icon') === -1) {
      let $volume = $(this.ref.volume.element);
      let left = $volume.offset().left;
      let x = e.pageX - left;
      let percent = x / $volume.width();
      this.volume = percent;
    }
  }
  clickMute(e) {
    this.muted = !this.muted;
    if(this.muted) {
      this.video.element.volume = 0;
    }
    else {
      this.video.element.volume = this.volume;
    }
  }
  clickScreen() {
    let video = this.video.element;
    if(video.requestFullscreen) {
      video.requestFullscreen();
    }
    else if(video.mozRequestFullscreen) {
      video.mozRequestFullscreen();
    }
    else if(video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
    else if(video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
    else if(video.webkitEnterFullScreen) {
      video.webkitEnterFullScreen();
    }
  }
  mousedown(e) {
    e.preventDefault();
    if(this.canControl) {
      isStart = true;
      offsetX = $(this.ref.progress.element).offset().left;
      this.pause();
    }
  }
  mousemove(e) {
    if(isStart) {
      e.preventDefault();
      let x = e.pageX;
      let diff = x - offsetX;
      let width = $(this.ref.progress.element).width();
      diff = Math.max(0, diff);
      diff = Math.min(width, diff);
      let percent = diff / width;
      this.setBarPercent(percent);
      this.currentTime = Math.floor(this.duration * percent);
    }
  }
  mouseup() {
    isStart = false;
  }
  clickProgress(e) {
    if(this.canControl && e.target.className !== 'p') {
      let $progress = $(this.ref.progress.element);
      let left = $progress.offset().left;
      let x = e.pageX - left;
      let percent = x / $progress.width();
      let currentTime = Math.floor(this.duration * percent);
      this.currentTime = currentTime;
    }
  }
  setBarPercent(percent) {
    percent *= 100;
    $(this.ref.vol.element).css('width', percent + '%');
    $(this.ref.p.element).css('-webkit-transform', `translateX(${percent}%)`);
    $(this.ref.p.element).css('transform', `translateX(${percent}%)`);
  }
  clickPlay(e) {
    this.isPlaying ? this.pause() : this.play();
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
      let data = self.datas[self.index];
      net.postJSON('/api/works/likeWork', { workID: data.ItemID }, function (res) {
        if(res.success) {
          data.ISLike = res.data === 211;
          self.fnLike = null;
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
    let data = self.datas[self.index];
    if($vd.hasClass('loading')) {
      //
    }
    else if($vd.hasClass('has')) {
      net.postJSON('/api/works/unFavorWork', { workID: data.ItemID }, function (res) {
        if(res.success) {
          data.ISFavor = false;
          self.fnFavor = null;
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
  clickShare() {
    migi.eventBus.emit('SHARE', location.href);
  }
  render() {
    return <div class={ 'video' + (this.props.show ? '' : ' fn-hide') }>
      <ul class={ 'type fn-clear' + ((this.index, this.datas || []).length === 1 ? ' single' : '') } onClick={ this.clickType }>
        {
          (this.index, this.datas || []).map(function(item, index) {
            return <li class={ this.index === index ? 'cur' : '' } rel={ index }>{ item.Tips || '普通版' }</li>;
          }.bind(this))
        }
      </ul>
      <h3 ref="title">{ this.datas[this.index].ItemName }</h3>
      <div class="num">
        <small class="play">{ this.datas[this.index].PlayHis || 0 }</small>
      </div>
      <div class={ 'c' + ( this.isPlaying ? ' playing' : '') } ref="c">
        <b class={ 'start' + (this.isPlaying ? ' fn-hide' : '') } onClick={ this.clickStart }/>
      </div>
      <div class="fn fn-hidden" ref="fn">
        <div class="control">
          <b class="full" onClick={ this.clickScreen }/>
          <div class="volume" ref="volume" onClick={ this.clickVolume }>
            <b class={ 'icon' + (this.muted ? ' muted' : '') } onClick={ this.clickMute }/>
            <b class="vol" style={ 'width:' + this.volume * 100 + '%' }/>
            <b class="p"
               onMouseDown={ this.vmousedown }
               style={ 'transform:translateX(' + this.volume * 100 + '%);transform:translateX(' + this.volume * 100 + '%)' }/>
          </div>
        </div>
        <div class="bar">
          <b class={ 'play' + (this.isPlaying ? ' pause' : '') } onClick={ this.clickPlay }/>
          <small class="time">{ util.formatTime(this.currentTime * 1000) }</small>
          <small class="time end">{ util.formatTime(this.duration * 1000) }</small>
          <div class="progress" ref="progress" onClick={ this.clickProgress }>
            <b class="load"/>
            <b class="vol" ref="vol"/>
            <b class="p" ref="p" onMouseDown={ this.mousedown }/>
          </div>
        </div>
        <ul class="btn">
          <li class={ 'like' + (this.datas[this.index].ISLike || this.fnLike ? ' has' : '') } onClick={ this.clickLike }/>
          <li class={ 'favor' + (this.datas[this.index].ISFavor || this.fnFavor ? ' has' : '') } onClick={ this.clickFavor }/>
          <li class="download">
            <a href={ this.datas[this.index].FileUrl }
               download={ this.datas[this.index].FileUrl }
               onClick={ this.clickDownload }/>
          </li>
          <li class="share" onClick={ this.clickShare }/>
        </ul>
      </div>
    </div>;
  }
}

export default Video;
