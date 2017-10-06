/**
 * Created by army8735 on 2017/9/1.
 */

import util from '../common/util';
import net from '../common/net';
import Author from './Author.jsx';
import Audio from './Audio.jsx';
import Video from './Video.jsx';
import itemTemplate from './itemTemplate';

let currentTime = 0;
let duration = 0;

let isStart;
let isMove;
let offsetX;

let audio;
let video;
let first;
let last;

class Media extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.setWorks(this.props.worksDetail.Works_Items);

    self.on(migi.Event.DOM, function() {
      let $play = $(this.ref.play.element);
      audio = self.ref.audio;
      video = self.ref.video;
      if(first === 'audio') {
        last = audio;
      }
      else if(first === 'video') {
        last = video;
      }
      audio.on('timeupdate', function (data) {
        currentTime = data;
        let percent = currentTime / duration;
        self.setBarPercent(percent);
        self.emit('timeupdate', Math.floor(currentTime * 1000));
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
  setWorks(works) {
    let self = this;
    let workHash = {};
    let workList = [];
    let authorList = [];
    works.forEach(function(item) {
      // 先按每个小作品类型排序其作者
      migi.sort(item.Works_Item_Author, itemTemplate(item.ItemType).authorSort || function() {});
      // 将每个小作品根据小类型映射到大类型上，再归类
      let bigType = itemTemplate(item.ItemType).bigType;
      workHash[bigType] = workHash[bigType] || [];
      workHash[bigType].push(item);
    });
    Object.keys(workHash).forEach(function(k) {
      workList.push({
        bigType: k,
        value: workHash[k],
      });
    });
    migi.sort(workList, function(a, b) {
      return a.bigType > b.bigType;
    });
    workList.forEach(function(works) {
      let authors = [];
      works.value.forEach(function(work) {
        authors = authors.concat(work.Works_Item_Author);
      });
      // 去重
      let hash = {};
      for(let i = 0; i < authors.length; i++) {
        let author = authors[i];
        let key = author.ID + ',' + author.WorksAuthorType;
        if(hash[key]) {
          authors.splice(i--, 1);
        }
        else {
          hash[key] = true;
        }
      }
      // 合并
      hash = {};
      let nAuthors = [];
      authors.forEach(function(author) {
        if(hash.hasOwnProperty(author.WorksAuthorType)) {
          nAuthors[hash[author.WorksAuthorType]].list.push(author);
        }
        else {
          hash[author.WorksAuthorType] = nAuthors.length;
          nAuthors.push({
            type: author.WorksAuthorType,
            list: [author]
          });
        }
      });
      authorList.push(nAuthors);
    });
    self.authorList = authorList;

    workList.forEach(function(item) {
      if(item.bigType === 'audio') {
        self.hasAudio = true;
        self.audioData = item.value;
      }
      else if(item.bigType === 'video') {
        self.hasVideo = true;
        self.videoData = item.value;
      }
    });
    if(self.hasAudio) {
      first = 'audio';
    }
    else if(self.hasVideo) {
      first = 'video';
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
    if(this.canControl) {
      let $play = $(vd.element);
      if($play.hasClass('pause')) {
        last.pause();
      }
      else {
        last.play();
      }
      $play.toggleClass('pause');
    }
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
  start(e) {
    if(this.canControl && e.touches.length === 1) {
      isStart = true;
      last.pause();
      $(this.ref.play.element).removeClass('pause');
    }
  }
  move(e) {
    if(isStart) {
      isMove = true;
      e.preventDefault();
      let x = e.touches[0].pageX;
      let percent = x / WIDTH;
      this.setBarPercent(percent);
      currentTime = Math.floor(duration * percent);
    }
  }
  end() {
    if(isMove) {
      last.currentTime(currentTime);
    }
    isStart = isMove = false;
  }
  down(e) {
    e.preventDefault();
    if(this.canControl) {
      isStart = true;
      offsetX = $(this.ref.progress.element).offset().left;
    }
  }
  setBarPercent(percent) {
    percent *= 100;
    $(this.ref.has.element).css('width', percent + '%');
    $(this.ref.pgb.element).css('-webkit-transform', `translate3d(${percent}%,0,0)`);
    $(this.ref.pgb.element).css('transform', `translate3d(${percent}%,0,0)`);
  }
  clear() {
    audio.clear().hide();
    video.clear().hide();
    duration = currentTime = 0;
    last = null;
    this.canControl = false;
    $(this.ref.play.element).removeClass('pause');
    $(this.ref.has.element).removeAttr('style');
    $(this.ref.pgb.element).removeAttr('style');
    $(this.ref.type.element).find('li').addClass('fn-hide').removeClass('cur');
  }
  clickType(e, vd, tvd) {
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
      let type = tvd.props.rel;
      if(type === 'audio') {
        video.pause().hide();
        last = audio.show().currentTime(0);
      }
      else if(type === 'video') {
        audio.pause().hide();
        last = video.show().currentTime(0);
      }
      this.canControl = last.hasLoaded;
      duration = last.duration;
      $(this.ref.play.element).removeClass('pause');
      this.emit('switchSubWork', last.data);
    }
  }
  switchTo(index) {
    $(this.ref.tags.element).find('li').eq(index).click();
  }
  render() {
    return <div class="media" style={ `background-image:url(${this.props.worksDetail.cover_Pic || '//zhuanquan.xin/img/blank.png'})` }>
      <Author ref="author" authorList={ this.authorList }/>
      <div class="c" ref="c">
        <Audio ref="audio" data={ this.audioData } show={ first === 'audio' }/>
        <Video ref="video" data={ this.videoData } show={ first === 'video' }/>
      </div>
      <div class={ 'progress' + (this.canControl ? '' : ' dis') } onClick={ this.clickProgress } ref="progress">
        <div class="has" ref="has"/>
        <div class="pbg" ref="pgb">
          <div class="point" ref="point"
               onTouchStart={ this.start } onTouchMove={ this.move } onTouchEnd={ this.end }/>
        </div>
      </div>
      <div class="bar">
        <div class="prev dis"/>
        <div class="play" ref="play" onClick={ this.clickPlay }/>
        <div class="next dis"/>
      </div>
      <ul class="type" ref="type" onClick={ { li: this.clickType } }>
        <li class={ 'audio' + (this.hasAudio ? '' : ' fn-hide') + (first === 'audio' ? ' cur' : '') } rel="audio">音频</li>
        <li class={ 'video' + (this.hasVideo ? '' : ' fn-hide') + (first ==='video' ? ' cur' : '') } rel="video">视频</li>
      </ul>
      <div class="tags" ref="tags" onClick={ { li: this.clickTag } }>
        <ul>
          <li class="cur" rel="1"><span>评论</span></li>
        </ul>
      </div>
    </div>;
  }
}

export default Media;
