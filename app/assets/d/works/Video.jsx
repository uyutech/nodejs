/**
 * Created by army8735 on 2017/9/7.
 */

import util from '../common/util';
import net from '../common/net';

let offsetX;

class Video extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.data) {
      self.setData(self.props.data);
      if(self.props.show) {
        self.on(migi.Event.DOM, function() {
          self.addMedia();
        });
      }
    }
  }
  @bind cover
  @bind fileUrl
  @bind isLike
  @bind isFavor
  @bind workIndex = 0
  @bind duration
  setData(data) {
    let self = this;
    self.data = data;
    self.isLike = data[0].ISLike;
    self.isFavor = data[0].ISFavor;
    self.fileUrl = data[0].FileUrl;
    self.cover = data[0].VideoCoverPic;
    self.title = data[0].ItemName;
    self.tips = data.map(function(item) {
      return item.Tips || '普通版';
    });
    return this;
  }
  addMedia() {
    let video = <video ref="video"
                       poster={ this.cover }
                       onTimeupdate={ this.onTimeupdate.bind(this) }
                       onLoadedmetadata={ this.onLoadedmetadata.bind(this) }
                       onPause={ this.onPause.bind(this) }
                       onPlaying={ this.onPlaying.bind(this) }
                       preload="meta"
                       playsinline="true"
                       webkit-playsinline="true"
                       src={ this.fileUrl }>
      your browser does not support the video tag
    </video>;
    this.video = video;
    video.after(this.ref.title.element);
  }
  show() {
    $(this.element).removeClass('fn-hide');
    if(!this.video) {
      this.addMedia();
    }
    return this;
  }
  hide() {
    $(this.element).addClass('fn-hide');
    return this;
  }
  onTimeupdate(e) {
    let currentTime = e.target.currentTime;
    let percent = currentTime / this.duration;
    this.setBarPercent(percent);
  }
  progress(e) {
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
    return this;
  }
  pause() {
    this.video.element.pause();
    return this;
  }
  currentTime(t) {
    this.video.element.currentTime = t;
    return this;
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
  clickPlay(e, vd) {
    let $play = $(vd.element);
    if($play.hasClass('pause')) {
      this.pause();
    }
    else {
      this.play();
    }
    $play.toggleClass('pause');
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
      net.postJSON('/api/works/likeWork', { workID: self.data[self.workIndex].ItemID }, function (res) {
        if(res.success) {
          self.isLike = res.data === 211;
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
    if($vd.hasClass('loading')) {
      //
    }
    else if($vd.hasClass('has')) {
      net.postJSON('/api/works/unFavorWork', { workID: self.data[self.workIndex].ItemID }, function (res) {
        if(res.success) {
          self.isFavor = false;
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
      net.postJSON('/api/works/favorWork', { workID: self.data[self.workIndex].ItemID }, function (res) {
        if(res.success) {
          self.isFavor = true;
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
  clickProgress(e) {
    if(this.canControl && e.target.className !== 'p') {
      let $progress = $(this.ref.progress.element);
      offsetX = $progress.offset().left;
      let x = e.pageX - offsetX;
      let percent = x / $progress.width();
      let currentTime = Math.floor(this.duration * percent);
      this.currentTime(currentTime);
    }
  }
  setBarPercent(percent) {
    percent *= 100;
    $(this.ref.vol.element).css('width', percent + '%');
    $(this.ref.p.element).css('-webkit-transform', `translateX(${percent}%)`);
    $(this.ref.p.element).css('transform', `translateX(${percent}%)`);
  }
  clear() {
    this.duration = 0;
    this.fileUrl = '';
    this.lineLyrics = '';
    this.rollLyrics = [];
    return this;
  }
  render() {
    return <div class={ 'video' + (this.props.show ? '' : ' fn-hide') }>
      <ul class="type fn-clear">
        {
          (this.tips || []).map(function(item, index) {
            if(index === 0) {
              return <li class="cur">{ item }</li>;
            }
            return <li>{ item }</li>;
          })
        }
      </ul>
      <h3 ref="title">{ this.title }</h3>
      <div class="fn">
        <div class="control">
          <b class="full"/>
          <div class="volume">
            <b class="icon"/>
            <b class="vol"/>
            <b class="p"/>
          </div>
        </div>
        <div class="bar">
          <b class="play" onClick={ this.clickPlay }/>
          <small class="time">{ util.formatTime(this.currentTime * 1000) }</small>
          <small class="time end">{ util.formatTime(this.duration * 1000) }</small>
          <div class="progress" ref="progress" onClick={ this.clickProgress }>
            <b class="load"/>
            <b class="vol" ref="vol"/>
            <b class="p" ref="p"/>
          </div>
        </div>
        <ul class="btn">
          <li class={ 'like' + (this.isLike ? ' has' : '') } onClick={ this.clickLike }/>
          <li class={ 'favor' + (this.isFavor ? ' has' : '') } onClick={ this.clickFavor }/>
          <li class="download"><a href={ this.fileUrl } download={ this.fileUrl } onClick={ this.clickDownload }/></li>
          <li class="share" onClick={ this.clickShare }/>
        </ul>
      </div>
    </div>;
  }
}

export default Video;
