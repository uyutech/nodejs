/**
 * Created by army on 2017/6/11.
 */

import net from '../common/net';
import util from '../common/util';
import lrcParser from './lrcParser';

let isVStart;
let vOffsetX;
let isStart;
let offsetX;

class Audio extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.list = self.props.list || [];
    self.list.forEach(function(item) {
      let l = {};
      if(lrcParser.isLrc(item.lrc)) {
        l.is = true;
        l.data = lrcParser.parse(item.lrc);
        let s = '';
        l.data.forEach(function(item) {
          s += item.txt + '\n';
        });
        l.txt = s;
      }
      else {
        l.is = false;
        l.txt = item.lrc;
      }
      item.formatLrc = l;
    });
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
  @bind hasStart
  @bind lrcMode
  @bind lrcIndex = 0
  @bind duration
  @bind canControl
  @bind muted
  @bind fnLike
  @bind fnFavor
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
    if(this.audio) {
      this.audio.element.volume = v;
    }
  }
  addMedia() {
    let audio = <audio src={ this.list[this.index || 0].url }
                       onTimeupdate={ this.onTimeupdate.bind(this) }
                       onLoadedmetadata={ this.onLoadedmetadata.bind(this) }
                       onCanplaythrough={ this.onCanplaythrough.bind(this) }
                       onPlaying={ this.onPlaying.bind(this) }
                       onPause={ this.onPause.bind(this) }
                       onEnded={ this.onEnded.bind(this) }
                       onProgress={ this.onProgress.bind(this) }
                       preload="meta"
                       playsinline="true"
                       webkit-playsinline="true">
        your browser does not support the audio tag
      </audio>;
    this.audio = audio;
    audio.appendTo(this.element);
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
    let item = this.list[this.index || 0];
    let formatLrc = item.formatLrc;
    let formatLrcData = formatLrc.data;
    if(formatLrc.is && formatLrcData.length) {
      let tempIndex = this.lrcIndex;
      for (let i = 0, len = formatLrcData.length; i < len; i++) {
        if(currentTime * 1000 >= formatLrcData[i].timestamp) {
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
      this.audio.element.play();
      this.isPlaying = true;
      this.hasStart = true;
      net.postJSON('/api/works/addPlayCount', { workID: this.list[this.index || 0].id });
    }
    return this;
  }
  pause() {
    this.audio && this.audio.element.pause();
    this.isPlaying = false;
    return this;
  }
  clickType(e, vd, tvd) {
    if(this.index !== tvd.props.rel) {
      this.index = tvd.props.rel;
      this.audio.element.src = this.list[this.index || 0].url;
      this.pause();
      this.emit('switchTo', this.list[this.index || 0]);
      if(parent && parent !== window && parent.setHash) {
        parent.setHash('/works/' + this.props.worksId + '/' + this.list[this.index].id, true);
      }
    }
  }
  altLyrics() {
    this.lrcMode = !this.lrcMode;
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
      this.audio.element.currentTime = this.currentTime = Math.floor(this.duration * percent);
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
      this.audio.element.currentTime = this.currentTime = currentTime;
    }
  }
  setBarPercent(percent) {
    if(isNaN(percent)) {
      percent = 0;
    }
    percent *= 100;
    percent = Math.min(percent, 100);
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
    return <div class={ 'audio' + (this.visible ? '' : ' fn-hide')
      + (this.list[this.index || 0].url ? '' : ' empty') }>
      <ul class={ 'type fn-clear' + ((this.index, this.list || []).length === 1 ? ' single' : '') }
          onClick={ this.clickType }>
        {
          (this.index, this.list || []).map(function(item, index) {
            return <li class={ (this.index === undefined ? index === 0 : this.index === index) ? 'cur' : '' }
                       rel={ index }>{ item.tips || item.typeName }</li>;
          }.bind(this))
        }
      </ul>
      <h3>{ this.list[this.index || 0].title }</h3>
      <div class="c">
        <div class={ 'lyrics' + (this.hasStart ? '' : ' fn-hidden') } ref="lyrics">
          <div class={ 'roll' + (!this.lrcMode && this.list[this.index || 0].formatLrc.data ? '' : ' fn-hide') }>
            <div class="c" ref="lyricsRoll" style={ '-moz-transform:translateX(' + this.lrcIndex * 20 + 'px);-webkit-transform:translateY(-' + this.lrcIndex * 20 + 'px);transform:translateY(-' + this.lrcIndex * 20 + 'px)' }>
              {
                (this.list[this.index || 0].formatLrc.data || []).map(function(item) {
                  return <pre>{ item.txt || ' ' }</pre>
                })
              }
            </div>
          </div>
          <div class={ 'line' + (this.lrcMode && this.list[this.index || 0].formatLrc.txt ? '' : ' fn-hide') }>
            <pre style={ '-moz-transform:translateX(' + this.lrcIndex * 20 + 'px);-webkit-transform:translateY(-' + this.lrcIndex * 20 + 'px);transform:translateY(-' + this.lrcIndex * 20 + 'px)' }>{ this.list[this.index || 0].formatLrc.txt }</pre>
          </div>
        </div>
        <b class={ 'start' + (this.isPlaying ? ' fn-hide' : '') }
           onClick={ this.clickStart }/>
      </div>
      <div class={ 'fn' + (this.canControl ? ' can' : '') }
           ref="fn">
        <div class="control">
          <b class={ 'lyrics' + (this.lrcMode ? '' : ' roll') }
             onClick={ this.altLyrics }/>
          <div class="volume"
               ref="volume"
               onClick={ this.clickVolume }>
            <b class={ 'icon' + (this.muted ? ' muted' : '') }
               onClick={ this.clickMute }/>
            <b class="vol"
               style={ 'width:' + this.volume * 100 + '%' }/>
            <b class="p"
               onMouseDown={ this.vmousedown }
               style={ '-moz-transform:translateX(' + this.volume * 100 + '%);-webkit-transform:translateX(' + this.volume * 100 + '%);transform:translateX(' + this.volume * 100 + '%)' }/>
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

export default Audio;
