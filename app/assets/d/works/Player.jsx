/**
 * Created by army8735 on 2017/10/19.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';

let isVStart;
let vOffsetX;
let isStart;
let offsetX;

class Player extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.work) {
      self.setItem(self.props.work);
      self.on(migi.Event.DOM, function() {
        let uid = window.$CONFIG ? $CONFIG.uid : '';
        let key = uid + 'volume';
        self.volume = localStorage[key];
        self.addOrAltMedia();
        self.showFn = true;

        $(document).on('mousemove', this.mousemove.bind(this));
        $(document).on('mouseup', this.mouseup.bind(this));
        $(document).on('mousemove', this.vmousemove.bind(this));
        $(document).on('mouseup', this.vmouseup.bind(this));
      });
      migi.eventBus.on('chooseMusic', function(item) {
        self.currentTime = 0;
        self.setItem(item);
        self.addOrAltMedia();
      });
    }
  }
  @bind item
  @bind type
  @bind workID
  @bind sname
  @bind url
  @bind playNum
  @bind isPlaying
  @bind hasStart
  @bind formatLyrics = {}
  @bind showLyricsMode
  @bind lyricsIndex = 0
  @bind duration
  @bind canControl
  @bind muted
  @bind like
  @bind favor
  @bind cover
  @bind showFn
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
    if(this.av) {
      this.av.element.volume = v;
    }
  }
  show() {
    $(this.element).removeClass('fn-hide hidden');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  hidden() {
    $(this.element).addClass('hidden');
  }
  setItem(item) {
    let self = this;
    self.item = item;
    self.type = item.ItemType;
    self.workID = item.ItemID;
    self.sname = item.ItemName;
    self.url = item.FileUrl;
    self.playNum = item.PlayHis;
    self.formatLyrics = item.formatLyrics || {};
    self.like = item.ISLike;
    self.favor = item.ISFavor;
    self.cover = item.WorksCoverPic;
  }
  addOrAltMedia() {
    let self = this;
    let isPlaying = self.isPlaying;
    self.pause();
    switch(self.type) {
      case 1111:
      case 1113:
        if(!self.audio) {
          self.audio = <audio src={ self.url }
                              onTimeupdate={ self.onTimeupdate.bind(self) }
                              onLoadedmetadata={ self.onLoadedmetadata.bind(self) }
                              onPlaying={ self.onPlaying.bind(self) }
                              onPause={ self.onPause.bind(self) }
                              onProgress={ self.onProgress.bind(self) }
                              preload="meta">
            your browser does not support the audio tag
          </audio>;
          self.audio.appendTo(self.ref.c.element);
        }
        else {
          self.audio.element.src = self.url;
        }
        self.av = self.audio;
        break;
      case 2110:
        if(!self.video) {
          self.video = <video ref="video"
                              src={ self.url }
                              onClick={ self.clickPlay.bind(self) }
                              onTimeupdate={ self.onTimeupdate.bind(self) }
                              onLoadedmetadata={ self.onLoadedmetadata.bind(self) }
                              onPause={ self.onPause.bind(self) }
                              onPlaying={ self.onPlaying.bind(self) }
                              preload="meta"
                              playsinline="true"
                              webkit-playsinline="true">
            your browser does not support the video tag
          </video>;
          self.video.appendTo(self.ref.c.element);
        }
        else {
          self.video.element.src = self.url;
        }
        self.av = self.video;
        break;
    }
    self.volume = self.volume;
    self.av.element.currentTime = self.currentTime = 0;
    if(isPlaying) {
      self.play();
    }
  }
  onTimeupdate(e) {
    let self = this;
    let currentTime = self.currentTime = e.target.currentTime;
    let formatLyrics = self.formatLyrics || {};
    let formatLyricsData = formatLyrics.data;
    if(formatLyrics.is && formatLyricsData.length) {
      let tempIndex = this.lyricsIndex;
      for (let i = 0, len = formatLyricsData.length; i < len; i++) {
        if(currentTime * 1000 >= formatLyricsData[i].timestamp) {
          tempIndex = i;
        }
        else {
          break;
        }
      }
      if(tempIndex !== this.lyricsIndex) {
        this.lyricsIndex = tempIndex;
      }
    }
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
  onPause(e) {
  }
  play() {
    if(this.url) {
      this.av && this.av.element.play();
      this.isPlaying = true;
      this.hasStart = true;
      migi.eventBus.emit('play');
    }
    return this;
  }
  pause() {
    this.av && this.av.element.pause();
    this.isPlaying = false;
    migi.eventBus.emit('pause');
    return this;
  }
  altLyrics() {
    this.showLyricsMode = !this.showLyricsMode;
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
      this.audio.element.volume = 0;
    }
    else {
      this.audio.element.volume = this.volume;
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
      this.av.element.currentTime = this.currentTime = Math.floor(this.duration * percent);
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
      this.av.element.currentTime = this.currentTime = currentTime;
    }
  }
  setBarPercent(percent) {
    percent *= 100;
    $(this.ref.vol.element).css('width', percent + '%');
    $(this.ref.p.element).css('-moz-transform', `translateX(${percent}%)`);
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
      let data = self.item;
      net.postJSON('/api/works/likeWork', { workID: self.workID }, function (res) {
        if(res.success) {
          data.ISLike = self.like = res.data === 211;
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
    let data = self.item;
    if($vd.hasClass('loading')) {
      //
    }
    else if($vd.hasClass('has')) {
      net.postJSON('/api/works/unFavorWork', { workID: self.workID }, function (res) {
        if(res.success) {
          data.ISFavor = self.favor = false;
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
      net.postJSON('/api/works/favorWork', { workID: self.workID }, function (res) {
        if(res.success) {
          data.ISFavor = self.favor = true;
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
    return <div class={ 'player fn-hide' } style={ 'background-image:url("' + (this.cover || '//zhuanquan.xin/img/blank.png') + '")' }>
      <h3>{ this.sname }</h3>
      <div class="num fn-hide">
        <small class="play">{ this.playNum || 0 }</small>
      </div>
      <div class={ 'c' + (this.isPlaying ? ' playing' : '') + (this.type === 2110 ? ' tvideo' : '') } ref="c">
        <div class={ 'lyrics' + (this.hasStart ? '' : ' fn-hide') } ref="lyrics">
          <div class={ 'roll' + (!this.showLyricsMode && this.formatLyrics.data ? '' : ' fn-hide') }>
            <div class="c" ref="lyricsRoll" style={ '-moz-transform:translateX(' + this.lyricsIndex * 20 + 'px);-webkit-transform:translateY(-' + this.lyricsIndex * 20 + 'px);transform:translateY(-' + this.lyricsIndex * 20 + 'px)' }>
              {
                (this.formatLyrics.data || []).map(function(item) {
                  return <pre>{ item.txt || ' ' }</pre>
                })
              }
            </div>
          </div>
          <div class={ 'line' + (this.showLyricsMode && this.formatLyrics.txt ? '' : ' fn-hide') }>
            <pre style={ '-moz-transform:translateX(' + this.lyricsIndex * 20 + 'px);-webkit-transform:translateY(-' + this.lyricsIndex * 20 + 'px);transform:translateY(-' + this.lyricsIndex * 20 + 'px)' }>{ this.formatLyrics.txt }</pre>
          </div>
        </div>
        <b class={ 'start' + ((this.isPlaying || !this.url) ? ' fn-hide' : '') } onClick={ this.clickStart }/>
      </div>
      <div class={ 'fn' + ((this.showFn && this.url) ? '' : ' fn-hidden') } ref="fn">
        <div class="control">
          <b class={ 'lyrics' + (this.showLyricsMode ? '' : ' roll') } onClick={ this.altLyrics }/>
          <div class="volume" ref="volume" onClick={ this.clickVolume }>
            <b class={ 'icon' + (this.muted ? ' muted' : '') } onClick={ this.clickMute }/>
            <b class="vol" style={ 'width:' + this.volume * 100 + '%' }/>
            <b class="p"
               onMouseDown={ this.vmousedown }
               style={ '-moz-transform:translateX(' + this.volume * 100 + '%);-webkit-transform:translateX(' + this.volume * 100 + '%);transform:translateX(' + this.volume * 100 + '%)' }/>
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
          <li class={ 'like' + (this.like ? ' has' : '') } onClick={ this.clickLike }/>
          <li class={ 'favor' + (this.favor ? ' has' : '') } onClick={ this.clickFavor }/>
          <li class="download">
            <a href={ this.url }
               download={ (this.sname || '') + (this.url ? (/\.\w+$/.exec(this.url)[0] || '') : '') }
               onClick={ this.clickDownload }/>
          </li>
          <li class="share" onClick={ this.clickShare }/>
        </ul>
      </div>
    </div>;
  }
}

export default Player;
