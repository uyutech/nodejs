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
    self.list = self.props.list || [];
    self.visible = self.props.show;
    if(self.props.show) {
      self.first = true;
      self.on(migi.Event.DOM, function() {
        let uid = window.$CONFIG ? $CONFIG.uid : '';
        let key = uid + 'volume';
        self.volume = localStorage[key];
        self.addMedia();
      });
    }
    self.on(migi.Event.DOM, function() {
      $(document).on('mousemove', self.mousemove.bind(self));
      $(document).on('mouseup', self.mouseup.bind(self));
      $(document).on('mousemove', self.vmousemove.bind(self));
      $(document).on('mouseup', self.vmouseup.bind(self));
    });
  }
  @bind list = []
  @bind index
  @bind isPlaying
  @bind duration
  @bind canControl
  @bind muted
  @bind fnFavor
  @bind fnLike
  @bind visible
  get currentTime() {
    return this._currentTime || 0;
  }
  @bind
  set currentTime(v) {
    this._currentTime = v;
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
  addMedia() {
    let video = <video ref="video"
                       src={ this.list[this.index || 0].url }
                       onClick={ this.clickPlay.bind(this) }
                       onTimeupdate={ this.onTimeupdate.bind(this) }
                       onLoadedmetadata={ this.onLoadedmetadata.bind(this) }
                       onCanplaythrough={ this.onCanplaythrough.bind(this) }
                       onProgress={ this.onProgress.bind(this) }
                       onPause={ this.onPause.bind(this) }
                       onEnded={ this.onEnded.bind(this) }
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
    let self = this;
    if(!self.first) {
      self.first = true;
      let uid = window.$CONFIG ? $CONFIG.uid : '';
      let key = uid + 'volume';
      self.volume = localStorage[key];
      self.addMedia();
    }
    self.visible = true;
    return self;
  }
  hide() {
    this.visible = false;
    return this;
  }
  onTimeupdate(e) {
    let currentTime = this.currentTime = e.target.currentTime;
    this.duration = e.target.duration;
    let percent = currentTime / this.duration;
    this.setBarPercent(percent);
  }
  onProgress(e) {
    let buffered = e.target.buffered;
    if(buffered && buffered.length) {
      let self = this;
      let load = self.ref.load.element;
      load.innerHTML = '';
      for(let i = 0, len = buffered.length; i < len; i++) {
        let start = buffered.start(i);
        let end = buffered.end(i);
        if(self.duration > 0) {
          load.innerHTML += `<b style="left:${Math.floor(start * 100 / self.duration)}%;width:${Math.floor((end - start) * 100 / self.duration)}%"/>`;
        }
      }
    }
  }
  onLoadedmetadata(e) {
    this.duration = e.target.duration;
    this.canControl = true;
    this.onProgress(e);
  }
  onCanplaythrough(e) {
    this.duration = e.target.duration;
    this.canControl = true;
    this.onProgress(e);
  }
  onPlaying(e) {
    this.duration = e.target.duration;
  }
  onPause(e) {
    this.isPlaying = false;
  }
  onEnded(e) {
    this.isPlaying = false;
  }
  play() {
    if(this.list[this.index || 0].url) {
      this.video.element.play();
      this.isPlaying = true;
      net.postJSON('/api/works/addPlayCount', { workId: this.list[this.index || 0].id });
    }
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
      this.video.element.src = this.list[this.index || 0].url;
      this.pause();
      this.emit('switchTo', this.list[this.index || 0]);
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
      this.video.element.currentTime = this.currentTime = Math.floor(this.duration * percent);
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
      this.video.element.currentTime = this.currentTime = currentTime;
    }
  }
  setBarPercent(percent) {
    if(isNaN(percent)) {
      percent = 0;
    }
    percent *= 100;
    percent = Math.min(percent, 100);
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
  }
  clickFavor(e, vd) {
    if(!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
      return;
    }
  }
  clickDownload(e) {
    if(!$CONFIG.isLogin) {
      e.preventDefault();
      migi.eventBus.emit('NEED_LOGIN');
    }
  }
  clickShare() {
    let url = location.origin + '/works/' + this.props.worksId;
    url += '/' + this.list[this.index || 0].id;
    migi.eventBus.emit('SHARE', url);
  }
  render() {
    return <div class={ 'video' + (this.visible ? '' : ' fn-hide')
      + (this.list[this.index || 0].url ? '' : ' empty') }>
      <ul class={ 'type fn-clear' + ((this.index, this.list || []).length === 1 ? ' single' : '') }
          onClick={ this.clickType }>
      {
        (this.index, this.list || []).map(function(item, index) {
          return <li class={ this.index === index ? 'cur' : '' }
                     rel={ index }>{ item.tips || item.typeName }</li>;
        }.bind(this))
      }
      </ul>
      <h3 ref="title">{ this.list[this.index || 0].title }</h3>
      <div class={ 'c' + ( this.isPlaying ? ' playing' : '') }
           ref="c">
        <b class={ 'start' + (this.isPlaying ? ' fn-hide' : '') }
           onClick={ this.clickStart }/>
      </div>
      <div class={ 'fn' + (this.canControl ? ' can' : '') }
           ref="fn">
        <div class="control">
          <b class="full"
             onClick={ this.clickScreen }/>
          <div class="volume"
               ref="volume"
               onClick={ this.clickVolume }>
            <b class={ 'icon' + (this.muted ? ' muted' : '') }
               onClick={ this.clickMute }/>
            <b class="vol"
               style={ 'width:' + this.volume * 100 + '%' }/>
            <b class="p"
               onMouseDown={ this.vmousedown }
               style={ 'transform:translateX(' + this.volume * 100 + '%);transform:translateX(' + this.volume * 100 + '%)' }/>
          </div>
        </div>
        <div class="bar">
          <b class={ 'play' + (this.isPlaying ? ' pause' : '') }
             onClick={ this.clickPlay }/>
          <small class="time">{ util.formatTime(this.currentTime * 1000) }</small>
          <small class="time end">{ util.formatTime(this.duration * 1000) }</small>
          <div class="progress"
               ref="progress"
               onClick={ this.clickProgress }>
            <div class="load" ref="load"/>
            <b class="vol" ref="vol"/>
            <b class="p" ref="p" onMouseDown={ this.mousedown }/>
          </div>
        </div>
        <ul class="btn">
          <li class={ 'like' + ((this.list[this.index || 0] || {}).isLiked || this.fnLike ? ' liked' : '') }
              onClick={ this.clickLike }/>
          <li class={ 'favor' + ((this.list[this.index || 0] || {}).isFavored || this.fnFavor ? ' favored' : '') }
              onClick={ this.clickFavor }/>
          <li class="download">
            <a href={ (this.list[this.index || 0] || {}).url || '#' }
               download={ ((this.list[this.index || 0] || {}).name || '')
                 + ((this.list[this.index || 0] || {}).url
                   ? (/\.\w+$/.exec(this.list[this.index || 0].url)[0] || '')
                   : '') }
               onClick={ this.clickDownload }/>
          </li>
          <li class="share" onClick={ this.clickShare }/>
        </ul>
      </div>
    </div>;
  }
}

export default Video;
