/**
 * Created by army8735 on 2017/9/21.
 */

import Audio from './Audio.jsx';
import Video from './Video.jsx';

let WIDTH = 500;
let currentTime = 0;
let duration = 0;

let isStart;
let offsetX;

let audio;
let video;
let last;

class Media extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function () {return;
      let $play = $(this.ref.play.element);
      audio = self.ref.audio;
      video = self.ref.video;
      if(self.props.first === 'audio') {
        last = audio;
      }
      else if(self.props.first === 'video') {
        last = video;
      }
      audio.on('timeupdate', function (data) {
        currentTime = data;
        let percent = currentTime / duration;
        self.setBarPercent(percent);
        self.emit('timeupdate', Math.floor(currentTime * 1000));
        if(last === audio) {
          self.canControl = true;
        }
      });
      audio.on('loadedmetadata', function (data) {
        duration = data.duration;
        if(last === audio) {
          self.canControl = true;
        }
      });
      audio.on('playing', function(data) {
        duration = data.duration;
      });
      audio.on('play', function() {
        $play.addClass('pause');
      });
      audio.on('pause', function() {
        $play.removeClass('pause');
      });
      video.on('timeupdate', function (data) {
        currentTime = data;
        let percent = currentTime / duration;
        self.setBarPercent(percent);
        self.emit('timeupdate', Math.floor(currentTime * 1000));
        if(last === video) {
          self.canControl = true;
        }
      });
      video.on('loadedmetadata', function (data) {
        duration = data.duration;
        if(last === video) {
          self.canControl = true;
        }
      });
      video.on('playing', function(data) {
        duration = data.duration;
      });
      video.on('play', function() {
        $play.addClass('pause');
      });
      video.on('pause', function() {
        $play.removeClass('pause');
      });

      $(document).on('mousemove', this.move2.bind(this));
      $(document).on('mouseup', this.up.bind(this));
    });
  }
  @bind popular = 0
  @bind canControl
  setCover(url) {
    if(url) {
      $(this.element).css('background-image', `url(${url})`);
    }
    else {
      $(this.element).removeAttr('style');
    }
  }
  clickTag(e, vd, tvd) {
    let $ul = $(vd.element);
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
      $ul.find('.cur').removeClass('cur');
      $li.addClass('cur');
      this.emit('tagChange', tvd.props.rel);
    }
  }
  clickPlay(e, vd) {
    let $play = $(vd.element);
    if($play.hasClass('pause')) {
      last.pause();
    }
    else {
      last.play();
    }
    $play.toggleClass('pause');
  }
  clickProgress(e) {
    if(this.canControl && e.target.className !== 'point') {
      offsetX = $(this.ref.progress.element).offset().left;
      let x = e.pageX - offsetX;
      let percent = x / WIDTH;
      let currentTime = Math.floor(duration * percent);
      last.currentTime(currentTime);
    }
  }
  down(e) {
    e.preventDefault();
    if(this.canControl) {
      isStart = true;
      offsetX = $(this.ref.progress.element).offset().left;
    }
  }
  move2(e) {
    if(isStart) {
      e.preventDefault();
      let x = e.pageX;
      let diff = x - offsetX;
      diff = Math.max(0, diff);
      diff = Math.min(WIDTH, diff);
      let percent = diff / WIDTH;
      this.setBarPercent(percent);
      currentTime = Math.floor(duration * percent);
    }
  }
  up() {
    isStart = false;
  }
  setBarPercent(percent) {
    percent *= 100;
    $(this.ref.has.element).css('width', percent + '%');
    $(this.ref.pgb.element).css('-webkit-transform', `translate3d(${percent}%,0,0)`);
    $(this.ref.pgb.element).css('transform', `translate3d(${percent}%,0,0)`);
  }
  switchType(type) {
    if(type === 'audio') {
      this.ref.video.pause().hide();
      this.ref.audio.show();
    }
    else if(type === 'video') {
      this.ref.audio.pause().hide();
      this.ref.video.show();
    }
  }
  render() {
    return <div class="media">
      <Audio ref="audio" data={ this.props.audioData } show={ this.props.first === 'audio' }/>
      <Video ref="video" data={ this.props.videoData } show={ this.props.first === 'video' }/>
    </div>;
  }
}

export default Media;
