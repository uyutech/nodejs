/**
 * Created by army8735 on 2017/9/1.
 */

import lrcParser from './lrcParser';
import $util from '../common/util';
import $net from '../common/net';

let loadingLike;
let loadingFavor;
let ajaxLike;
let ajaxFavor;

let isStart;
let WIDTH;
let first = true;
let firstPlay = true;
let dragPlaying;

class Media extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.lrc = {};
    self.lrcIndex = 0;
    self.on(migi.Event.DOM, function() {
      WIDTH = screen.availWidth;
    });
  }
  @bind data
  @bind isPlaying
  @bind lrcMode
  @bind lrcIndex
  @bind lrc
  @bind duration
  @bind currentTime
  @bind canControl
  @bind isLike
  @bind likeCount
  @bind isFavor
  @bind favorCount
  @bind isVideo
  setData(data) {
    let self = this;
    let old = self.data;
    let load = self.ref.load.element;
    if(data === null) {
      // 有数据之前传空无效
      if(first) {
        return;
      }
      self.data = data;
      self.stop();
      self.duration = 0;
      self.isLike = self.isFavor = false;
      self.likeCount = 0;
      self.favorCount = 0;
      self.canControl = false;
      self.lrc = {};
      load.innerHTML = '';
      firstPlay = true;
      if(ajaxLike) {
        ajaxLike.abort();
      }
      if(ajaxFavor) {
        ajaxFavor.abort();
      }
      loadingLike = loadingFavor = false;
      return;
    }

    self.data = data;
    self.isLike = data.isLike;
    self.likeCount = data.likeCount;
    self.favorCount = data.favorCount;
    self.isFavor = data.isFavor;

    // 如果传入相同信息则忽略
    if(old && old.id === data.id && old.kind === data.kind) {
      return;
    }

    self.duration = 0;
    self.currentTime = 0;
    self.canControl = false;
    firstPlay = true;
    self.setBarPercent(0);

    // 除了第一次，每次设置后除非信息相同，否则停止播放
    if(!first) {
      self.stop();
    }
    first = false;

    if(ajaxLike) {
      ajaxLike.abort();
    }
    if(ajaxFavor) {
      ajaxFavor.abort();
    }
    loadingLike = loadingFavor = false;

    // 1音频2视频
    self.isVideo = data.kind === 1;
    let l = {};
    if(lrcParser.isLrc(data.lrc)) {
      l.is = true;
      l.data = lrcParser.parse(data.lrc);
      let s = '';
      l.data.forEach(function(item) {
        s += item.txt + '\n';
      });
      l.txt = s;
    }
    else {
      l.is = false;
      l.txt = data.lrc;
    }
    self.lrc = l;

    if(self.isVideo) {
      self.ref.video.element.src = data.url;
    }
    else {
      self.ref.audio.element.src = data.url;
    }
  }
  onTimeupdate(e) {
    let currentTime = this.currentTime = e.target.currentTime;
    this.duration = e.target.duration;
    let percent = currentTime / this.duration;
    this.setBarPercent(percent);
    this.updateLrc();
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
  onPause(e) {
    this.isPlaying = false;
  }
  onEnded(e) {
    this.isPlaying = false;
    this.emit('end');
  }
  onPlaying(e) {
    this.isPlaying = true;
    this.duration = e.target.duration;
    this.emit('playing', this.duration);
  }
  play() {
    let self = this;
    if(!self.data) {
      return;
    }
    if(self.isVideo) {
      self.ref.video.element.play();
      self.isPlaying = true;
      self.emit('play', self.data);
    }
    else {
      self.ref.audio.element.play();
      self.isPlaying = true;
      self.emit('play', self.data);
    }
    if(firstPlay) {
      firstPlay = false;
      $net.postJSON('/h5/work2/addViews', { id: self.data.id });
    }
  }
  pause() {
    let self = this;
    if(self.isVideo) {
      self.ref.video.element.pause();
      self.isPlaying = false;
      self.emit('pause');
    }
    else {
      self.ref.audio.element.pause();
      self.isPlaying = false;
      self.emit('pause');
    }
  }
  toggle() {
    this.isPlaying ? this.pause() : this.play();
  }
  stop() {
    let self = this;
    if(self.isVideo) {
      self.ref.video.element.pause();
      self.ref.video.element.src = '';
      self.currentTime = 0;
      self.isPlaying = false;
      self.emit('stop');
    }
    else {
      self.ref.audio.element.pause();
      self.ref.audio.element.src = '';
      self.currentTime = 0;
      self.isPlaying = false;
      self.emit('stop');
    }
  }
  repeat() {
    let self = this;
    if(self.isVideo) {
      self.ref.video.currentTime = 0;
    }
    else {
      self.ref.audio.currentTime = 0;
    }
    self.play();
  }
  clickPlay() {
    if(this.data) {
      this.isPlaying ? this.pause() : this.play();
    }
  }
  clickLrcMode() {
    this.lrcMode = !this.lrcMode;
  }
  clickFullScreen() {
    let video = this.ref.video.element;
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
  touchStart(e) {
    e.preventDefault();
    let self = this;
    if(self.canControl && e.touches.length === 1) {
      dragPlaying = self.isPlaying;
      isStart = true;
      self.pause();
    }
  }
  touchMove(e) {
    if(isStart && e.touches.length === 1) {
      e.preventDefault();
      let self = this;
      let diff = e.touches[0].pageX;
      let percent = diff / WIDTH;
      let currentTime = self.duration * percent;
      if(Math.floor(currentTime) !== Math.floor(self.currentTime)) {
        self.currentTime = currentTime;
        self.setBarPercent(percent);
        self.updateLrc();
        if(self.isVideo) {
          self.ref.video.element.currentTime = currentTime;
        }
        else {
          self.ref.audio.element.currentTime = currentTime;
        }
      }
    }
  }
  touchEnd() {
    if(isStart) {
      if(dragPlaying) {
        this.play();
      }
      isStart = false;
    }
  }
  setBarPercent(percent) {
    if(isNaN(percent) || percent < 0) {
      percent = 0;
    }
    percent *= 100;
    percent = Math.min(percent, 100);
    $(this.ref.vol.element).css('width', percent + '%');
    $(this.ref.p.element).css('-webkit-transform', `translateX(${percent}%)`);
    $(this.ref.p.element).css('transform', `translateX(${percent}%)`);
  }
  updateLrc() {
    let lrc = this.lrc;
    let lrcData = lrc.data;
    if(lrc.is && lrcData.length) {
      let tempIndex = this.lrcIndex;
      for (let i = 0, len = lrcData.length; i < len; i++) {
        if(this.currentTime * 1000 >= lrcData[i].timestamp) {
          tempIndex = i;
        }
        else {
          break;
        }
      }
      if(tempIndex !== this.lrcIndex) {
        this.lrcIndex = tempIndex;
      }
    }
  }
  clickLike() {
  }
  clickFavor() {
  }
  clickDownload() {
    let self = this;
    if(!$util.isLogin()) {
      migi.eventBus.emit('NEED_LOGIN');
      return;
    }
  }
  clickShare() {
    let self = this;
    if(!self.data) {
      return;
    }
  }
  render() {
    return <div class="mod-media">
      <div class={ 'c'  + (this.isVideo ? ' is-video' : '') + (this.isPlaying ? ' is-playing' : '') }>
        <div class="cover">
          <img class={ this.lrcMode && this.lrc.data ? 'blur' : '' }
               src={ $util.img((this.data || {}).cover || (this.data || {}).worksCover, 750, 750, 80)
                 || '//zhuanquan.xin/img/blank.png' }/>
        </div>
        <video ref="video"
               poster="//zhuanquan.xin/img/blank.png"
               onTimeupdate={ this.onTimeupdate }
               onLoadedmetadata={ this.onLoadedmetadata }
               onCanplaythrough={ this.onCanplaythrough }
               onProgress={ this.onProgress }
               onPause={ this.onPause }
               onEnded={ this.onEnded }
               onPlaying={ this.onPlaying }
               onClick={ this.toggle }
               preload="meta"
               playsinline="true"
               webkit-playsinline="true"/>
        <audio ref="audio"
               onTimeupdate={ this.onTimeupdate }
               onLoadedmetadata={ this.onLoadedmetadata }
               onCanplaythrough={ this.onCanplaythrough }
               onProgress={ this.onProgress }
               onPause={ this.onPause }
               onEnded={ this.onEnded }
               onPlaying={ this.onPlaying }
               preload="meta"/>
        <div class={ 'lrc' + (this.lrc.data && this.lrc.is ? '' : ' fn-hide') } ref="lrc">
          <div class={ 'roll' + (this.lrcMode && this.lrc.data ? '' : ' fn-hide') }>
            <div class="c"
                 ref="lrcRoll"
                 style={ '-webkit-transform:translateY(-' + this.lrcIndex * 24 + 'px);transform:translateY(-' + this.lrcIndex * 24 + 'px)' }>
              {
                (this.lrc.data || []).map(function(item) {
                  return <pre>{ item.txt || ' ' }</pre>;
                })
              }
            </div>
          </div>
          <div class={ 'line' + (!this.lrcMode && this.lrc.txt ? '' : ' fn-hide') }>
            <pre style={ '-webkit-transform:translateY(-' + this.lrcIndex * 24 + 'px);transform:translateY(-' + this.lrcIndex * 24 + 'px)' }>{ this.lrc.txt }</pre>
          </div>
        </div>
        <div class="control">
          <b class={ 'play' + (this.isPlaying ? ' pause' : '') }
             onClick={ this.clickPlay }/>
          <b class={ 'lrc' + (this.lrc.is ? '' : ' fn-hide') + (this.lrcMode ? ' roll' : '') }
             onClick={ this.clickLrcMode }/>
          <b class="full-screen"
             onClick={ this.clickFullScreen }/>
        </div>
        <b class={ 'start' + (this.isPlaying ? ' fn-hide' : '') } onClick={ this.play }/>
        <div class="time">
          <span class="now">{ $util.formatTime(this.currentTime) }</span>
          <span class="total">{ $util.formatTime(this.duration) }</span>
        </div>
        <div class={ 'progress' + (this.canControl ? ' can' : '') }>
          <div class="load"
               ref="load"/>
          <b class="vol"
             ref="vol"/>
          <b class="p"
             ref="p"
             onTouchStart={ this.touchStart }
             onTouchMove={ this.touchMove }
             onTouchEnd={ this.touchEnd }/>
        </div>
      </div>
      <ul class="btn">
        <li onClick={ this.clickLike }>
          <b class={ 'like' + (this.isLike ? ' liked' : '') }/>
          <span>{ this.likeCount || '点赞' }</span>
        </li>
        <li onClick={ this.clickFavor }>
          <b class={ 'favor' + (this.isFavor ? ' favored' : '') }/>
          <span>{ this.favorCount || '收藏' }</span>
        </li>
        <li onClick={ this.clickShare }>
          <b class="share"/>
          <span>分享</span>
        </li>
      </ul>
    </div>;
  }
}

export default Media;
