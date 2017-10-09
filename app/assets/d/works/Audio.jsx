/**
 * Created by army on 2017/6/11.
 */

import net from '../common/net';
import util from '../common/util';
import LyricsParser from './LyricsParser.jsx';

let lyricsIndex = -1;
let lyricsHeight = [];
let $lyricsRoll;

let offsetX;

class Audio extends migi.Component {
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
  @bind fileUrl
  @bind isLike
  @bind isFavor
  @bind workIndex = 0
  @bind lineLyrics
  @bind rollLyrics = []
  @bind showLyricsMode
  @bind currentTime
  @bind duration
  @bind showLyrics
  @bind title
  @bind canControl
  setData(data) {
    let self = this;
    self.data = data;
    self.isLike = data[0].ISLike;
    self.isFavor = data[0].ISFavor;
    self.fileUrl = data[0].FileUrl;
    self.title = data[0].ItemName;
    self.tips = data.map(function(item) {
      return item.Tips || '普通版';
    });
    data.forEach(function(item) {
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
    self.rollLyrics = data[0].formatLyrics.data;
    self.lineLyrics = data[0].formatLyrics.txt;
    self.on(migi.Event.DOM, function() {
      let count = 0;
      $lyricsRoll = $(self.ref.lyricsRoll.element);
      $lyricsRoll.find('pre').each(function () {
        lyricsHeight.push(count);
        count += 20;
      });
    });
    return this;
  }
  addMedia() {
    let audio = <audio src={ this.fileUrl }
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
  }
  show() {
    $(this.element).removeClass('fn-hide');
    if(!this.audio) {
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
    let item = this.data[this.workIndex];
    let formatLyrics = item.formatLyrics;
    let formatLyricsData = formatLyrics.data;
    if(formatLyrics.is && formatLyricsData.length) {
      let tempIndex = lyricsIndex;
      for (let i = 0, len = formatLyricsData.length; i < len; i++) {
        if(currentTime * 1000 >= formatLyricsData[i].timestamp) {
          tempIndex = i;
        }
        else {
          break;
        }
      }
      if(tempIndex !== lyricsIndex) {
        // console.log(lyricsIndex, tempIndex);
        lyricsIndex = tempIndex;
        this.lineLyrics = formatLyricsData[lyricsIndex].txt;
        $lyricsRoll.find('.cur').removeClass('cur');
        $lyricsRoll.find('pre').eq(lyricsIndex).addClass('cur');
        $lyricsRoll.css('-webkit-transform', `translate3d(0,${-lyricsHeight[lyricsIndex]}px,0)`);
        $lyricsRoll.css('transform', `translate3d(0,${-lyricsHeight[lyricsIndex]}px,0)`);
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
  onPause(e) {}
  play() {
    this.audio.element.play();
    this.showLyrics = true;
    return this;
  }
  pause() {
    this.audio.element.pause();
    return this;
  }
  currentTime(t) {
    this.audio.element.currentTime = t;
    return this;
  }
  altLyrics() {
    this.showLyricsMode = !this.showLyricsMode;
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
      let $progress = $(this.ref.onProgress.element);
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
    return <div class={ 'audio' + (this.props.show ? '' : ' fn-hide') }>
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
      <h3>{ this.title }</h3>
      <div class={ 'lyrics' }>
        <div class={ 'roll' + (!this.showLyricsMode ? '' : ' fn-hide') }>
          <div class="c" ref="lyricsRoll">
            {
              (this.rollLyrics || []).map(function(item) {
                return <pre>{ item.txt || '&nbsp;' }</pre>
              })
            }
          </div>
        </div>
        <pre class={ 'line' + (this.showLyricsMode ? '' : ' fn-hide') }>{ this.lineLyrics }</pre>
      </div>
      <div class="fn">
        <div class="control">
          <b class="lyrics" onClick={ this.altLyrics }/>
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

export default Audio;
