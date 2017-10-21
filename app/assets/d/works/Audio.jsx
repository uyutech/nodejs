/**
 * Created by army on 2017/6/11.
 */

import net from '../common/net';
import util from '../common/util';
import LyricsParser from './LyricsParser.jsx';

let isVStart;
let vOffsetX;
let isStart;
let offsetX;

class Audio extends migi.Component {
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
  @bind hasStart
  @bind showLyricsMode
  @bind lyricsIndex = 0
  @bind duration
  @bind canControl
  @bind muted
  @bind fnLike
  @bind fnFavor
  get currentTime() {
    return this._currentTime || 0;
  }
  @bind
  set currentTime(v) {
    this._currentTime = v;
    if(this.audio && v !== this.audio.element.currentTime) {
      this.audio.element.currentTime = v;
    }
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
  setData(datas) {
    let self = this;
    self.datas = datas;
    datas.forEach(function(item) {
      let l = {};
      if(LyricsParser.isLyrics(item.lrc)) {
        l.is = true;
        l.txt = LyricsParser.getTxt(item.lrc);
        l.data = LyricsParser.parse(item.lrc);
      }
      else {
        l.is = false;
        l.txt = item.lrc;
      }
      item.formatLyrics = l;
    });
    return this;
  }
  addMedia() {
    let audio = <audio src={ this.datas[0].FileUrl }
                       onTimeupdate={ this.onTimeupdate.bind(this) }
                       onLoadedmetadata={ this.onLoadedmetadata.bind(this) }
                       onPlaying={ this.onPlaying.bind(this) }
                       onPause={ this.onPause.bind(this) }
                       onProgress={ this.onProgress.bind(this) }
                       preload="meta">
        your browser does not support the audio tag
      </audio>;
    this.audio = audio;
    audio.appendTo(this.element);
    this.volume = this.volume;
  }
  show() {
    $(this.element).removeClass('fn-hide');
    let uid = window.$CONFIG ? $CONFIG.uid : '';
    let key = uid + 'volume';
    this.volume = localStorage[key];
    if(!this.audio) {
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
    let currentTime = this.currentTime = e.target.currentTime;
    let item = this.datas[this.index];
    let formatLyrics = item.formatLyrics;
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
    this.audio.element.play();
    this.isPlaying = true;
    this.hasStart = true;
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
      this.audio.element.src = this.datas[this.index].FileUrl;
      this.emit('switchTo', this.datas[this.index]);
    }
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
    return <div class={ 'audio' + (this.props.show ? '' : ' fn-hide') }>
      <ul class={ 'type fn-clear' + ((this.index, this.datas || []).length === 1 ? ' single' : '') } onClick={ this.clickType }>
        {
          (this.index, this.datas || []).map(function(item, index) {
            return <li class={ this.index === index ? 'cur' : '' } rel={ index }>{ item.Tips || '歌曲' }</li>;
          }.bind(this))
        }
      </ul>
      <h3>{ this.datas[this.index].ItemName }</h3>
      <div class="num">
        <small class="play">{ this.datas[this.index].PlayHis || 0 }</small>
      </div>
      <div class="c">
        <div class={ 'lyrics' + (this.hasStart ? '' : ' fn-hidden') } ref="lyrics">
          <div class={ 'roll' + (!this.showLyricsMode && this.datas[this.index].formatLyrics.data ? '' : ' fn-hide') }>
            <div class="c" ref="lyricsRoll" style={ '-moz-transform:translateX(' + this.lyricsIndex * 20 + 'px);-webkit-transform:translateY(-' + this.lyricsIndex * 20 + 'px);transform:translateY(-' + this.lyricsIndex * 20 + 'px)' }>
              {
                (this.datas[this.index].formatLyrics.data || []).map(function(item) {
                  return <pre>{ item.txt || '&nbsp;' }</pre>
                })
              }
            </div>
          </div>
          <div class={ 'line' + (this.showLyricsMode && this.datas[this.index].formatLyrics.txt ? '' : ' fn-hide') }>
            <pre style={ '-moz-transform:translateX(' + this.lyricsIndex * 20 + 'px);-webkit-transform:translateY(-' + this.lyricsIndex * 20 + 'px);transform:translateY(-' + this.lyricsIndex * 20 + 'px)' }>{ this.datas[this.index].formatLyrics.txt }</pre>
          </div>
        </div>
        <b class={ 'start' + (this.isPlaying ? ' fn-hide' : '') } onClick={ this.clickStart }/>
      </div>
      <div class="fn fn-hidden" ref="fn">
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

export default Audio;
