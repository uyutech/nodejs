/**
 * Created by army8735 on 2017/9/7.
 */

import util from '../../d/common/util';
import net from '../../d/common/net';

class Video extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.datas) {
      self.setData(self.props.datas);
      if(self.props.show) {
        self.on(migi.Event.DOM, function() {
          self.addMedia();
        });
      }
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
    let currentTime = this.currentTime = e.target.currentTime;
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
  render() {
    return <div class={ 'video' + (this.props.show ? '' : ' fn-hide') }>
      <div class={ 'c' + ( this.isPlaying ? ' playing' : '') } ref="c">
        <b class={ 'start' + (this.isPlaying ? ' fn-hide' : '') } onClick={ this.clickStart }/>
      </div>
      <div class="fn" ref="fn">
        <div class="control">
          <b class="full" onClick={ this.clickScreen }/>
          <small class="time">{ util.formatTime(this.currentTime * 1000) } / { util.formatTime(this.duration * 1000) }</small>
          <b class={ 'vol' + (this.muted ? ' muted' : '') } onClick={ this.clickMute }/>
        </div>
        <div class="bar">
          <b class={ 'play' + (this.isPlaying ? ' pause' : '') } onClick={ this.clickPlay }/>
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
               download={ this.datas[this.index].ItemName + (/\.\w+$/.exec(this.datas[this.index].FileUrl)[0] || '') }
               onClick={ this.clickDownload }/>
          </li>
          <li class="share" onClick={ this.clickShare }/>
        </ul>
      </div>
    </div>;
  }
}

export default Video;
