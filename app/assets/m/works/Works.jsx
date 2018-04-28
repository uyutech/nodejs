/**
 * Created by army8735 on 2017/9/18.
 */

import Media from './Media.jsx';
import itemTemplate from '../../d/works/itemTemplate';
import PhotoAlbum from './PhotoAlbum.jsx';
import Author from '../../d/works/Author.jsx';
import Timeline from '../../d/works/Timeline.jsx';
import Text from '../../d/works/Text.jsx';
import Lyric from '../../d/works/Lyric.jsx';
import InspComment from '../../d/works/InspComment.jsx';
import Poster from '../../d/works/Poster.jsx';
import WorkComment from './WorkComment.jsx';
import WorksTypeEnum from '../../d/works/WorksTypeEnum';
import LyricsParser from '../../d/works/LyricsParser.jsx';
import MusicAlbum from './MusicAlbum.jsx';
import PlayList from '../../d/works/PlayList.jsx';
import ImageView from './ImageView.jsx';
import worksState from '../../d/works/worksState';
import Describe from '../../d/works/Describe.jsx';

let first;

class Works extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.worksID = self.props.worksID;
    self.workID = self.props.workID;
    self.worksType = self.props.worksDetail.WorkType;
    self.setWorks(self.props.worksDetail.Works_Items || []);
    self.on(migi.Event.DOM, function() {
      let workComment = self.ref.workComment;
      if(self.worksType === WorksTypeEnum.TYPE.originMusic) {
        let media = self.ref.media;
        media.on('switchTo', function(data) {
          workComment.workID = data.ItemID;
        });
      }
      self.url = /(iPhone|iPod|ios)/i.test(navigator.userAgent)
        ? 'https://itunes.apple.com/cn/app/id1331367220'
        : 'https://circling.net.cn/android/circling-0.6.6.apk';
    });
  }
  @bind worksID
  @bind workID
  @bind worksType
  @bind rootID = -1
  @bind parentID = -1
  @bind barrageTime = 0
  @bind rid
  @bind cid
  @bind url
  setWorks(works) {
    let self = this;
    let workList = [];
    let authorList = self.props.worksDetail.Works_Author || [];
    if(self.worksType === WorksTypeEnum.TYPE.musicAlbum) {
      works.forEach(function(item) {
        let type = itemTemplate.workType(item.ItemType).bigType;
        if(type === 'audio') {
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
          workList.push(item);
        }
        else if(type === 'video') {
          workList.push(item);
        }
      });
      self.workList = workList;

      self.setAuthors(authorList);
      return;
    }
    else if(self.worksType === WorksTypeEnum.TYPE.photoAlbum) {
      self.setAuthors(self.props.worksDetail.Works_Author || []);
      return;
    }
    let workHash = {};
    works.forEach(function(item) {
      // 将每个小作品根据小类型映射到大类型上，再归类
      let type = itemTemplate.workType(item.ItemType);
      let bigType = type.bigType;
      let name = type.display || type.name;
      if(bigType) {
        workHash[bigType] = workHash[bigType] || {
          name,
          value: [],
        };
        workHash[bigType].value.push(item);
        authorList = authorList.concat(item.Works_Item_Author);
      }
    });
    Object.keys(workHash).forEach(function(k) {
      workList.push({
        bigType: k,
        name: workHash[k].name,
        value: workHash[k].value,
      });
    });

    workList.forEach(function(item) {
      if(item.bigType === 'audio') {
        self.audioData = item.value;
      }
      else if(item.bigType === 'video') {
        self.videoData = item.value;
      }
      else if(item.bigType === 'text') {
        self.textData = item;
      }
      else if(item.bigType === 'poster') {
        self.posterData = item;
      }
      else if(item.bigType === 'lyric') {
        self.lyricData = item;
      }
    });

    if(self.workID) {
      if(self.videoData) {
        self.videoData.forEach(function(item) {
          if(item.ItemID.toString() === self.workID) {
            first = 'video';
          }
        });
      }
      if(self.audioData) {
        self.audioData.forEach(function(item) {
          if(item.ItemID.toString() === self.workID) {
            first = 'audio';
          }
        });
      }
    }
    else {
      if(self.videoData) {
        first = 'video';
        self.workID = self.videoData[0].ItemID;
      }
      else if(self.audioData) {
        first = 'audio';
        self.workID = self.audioData[0].ItemID;
      }
    }

    self.setAuthors(authorList);
  }
  setAuthors(authors) {
    let self = this;
    let hash = {};
    let typeHash = {};
    (authors || []).forEach(function(item) {
      hash[item.ID] = item;
      typeHash[item.WorksAuthorType] = typeHash[item.WorksAuthorType] || {
        hash: {},
        list: [],
      };
      let type = typeHash[item.WorksAuthorType];
      if(!type.hash.hasOwnProperty(item.ID)) {
        type.hash[item.ID] = true;
        type.list.push(item);
      }
    });
    self.isManager = hash.hasOwnProperty(self.props.authorID);
  }
  clickSel(e, vd, tvd) {
    let self = this;
    //最后一个可能是文本节点
    if(!tvd || !tvd.name) {
      return;
    }
    let $li = $(tvd.element);
    if(!$li.hasClass('cur') && !$li.hasClass('state')) {
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
      let rel = tvd.props.rel;
      history.replaceState(null, '', '?tag=' + rel);
      if(self.worksType === WorksTypeEnum.TYPE.musicAlbum) {
        if(rel === 'playList') {
          $(self.ref.workComment.element).addClass('fn-hide');
          $(self.ref.intro.element).addClass('fn-hide');
          $(self.ref.playList.element).removeClass('fn-hide');
        }
        else if(rel === 'intro') {
          $(self.ref.workComment.element).addClass('fn-hide');
          $(self.ref.playList.element).addClass('fn-hide');
          $(self.ref.intro.element).removeClass('fn-hide');
        }
        else if(rel === 'comment') {
          $(self.ref.intro.element).addClass('fn-hide');
          $(self.ref.playList.element).addClass('fn-hide');
          $(self.ref.workComment.element).removeClass('fn-hide');
        }
      }
      else if(self.worksType === WorksTypeEnum.TYPE.photoAlbum) {
        if(rel === 'photoAlbum') {
          $(self.ref.workComment.element).addClass('fn-hide');
          $(self.ref.intro.element).addClass('fn-hide');
          $(self.ref.photoAlbum.element).removeClass('fn-hide');
          if(self.props.tag !== 'intro' && self.props.tag !== 'comment') {
            self.ref.photoAlbum.load($(window));
          }
        }
        else if(rel === 'intro') {
          $(self.ref.workComment.element).addClass('fn-hide');
          $(self.ref.photoAlbum.element).addClass('fn-hide');
          $(self.ref.intro.element).removeClass('fn-hide');
        }
        else if(rel === 'comment') {
          $(self.ref.intro.element).addClass('fn-hide');
          $(self.ref.photoAlbum.element).addClass('fn-hide');
          $(self.ref.workComment.element).removeClass('fn-hide');
        }
      }
      else {
        if(rel === 'intro') {
          $(self.ref.workComment.element).addClass('fn-hide');
          $(self.ref.intro.element).removeClass('fn-hide');
        }
        else if(rel === 'comment') {
          $(self.ref.intro.element).addClass('fn-hide');
          $(self.ref.workComment.element).removeClass('fn-hide');
        }
      }
    }
  }
  clickDownload() {
    if(/(iPhone|iPod|ios)/i.test(navigator.userAgent)) {
      this.ref.tip.element.classList.remove('fn-hide');
    }
  }
  clickTip() {
    this.ref.tip.element.classList.add('fn-hide');
  }
  render() {
    let self = this;
    let state = worksState.getStateStr(self.worksType, self.props.worksDetail.WorkState);
    let tag = self.props.tag;
    if(self.worksType === WorksTypeEnum.TYPE.musicAlbum) {
      return <div class={'works t' + self.worksType}>
        <MusicAlbum ref="musicAlbum"
                    worksID={ self.worksID }
                    workID={ self.workID }
                    cover={ self.props.worksDetail.cover_Pic }
                    workList={ self.workList }/>
        <ul class="sel fn-clear" ref="sel" onClick={ { li: this.clickSel } }>
          <li class={ tag !== 'intro' && tag !== 'comment' ? 'cur' : '' } rel="playList">曲目</li>
          <li class={ tag === 'intro' ? 'cur' : '' } rel="intro">简介</li>
          <li class={ tag === 'comment' ? 'cur' : '' } rel="comment">留言</li>
          {
            state ? <li class="state">{ state }</li> : ''
          }
        </ul>
        <PlayList ref="playList" cover={ self.props.worksDetail.cover_Pic }
                  hidden={ tag === 'intro' || tag === 'comment' }
                  worksID={ self.worksID } workID={ self.workID } workList={ self.workList }/>
        <div class={ 'intro' + (tag === 'intro' ? '' : ' fn-hide') } ref="intro">
          <Describe title="专辑简介" data={ self.props.worksDetail.Describe }/>
          <Author list={ self.props.worksDetail.GroupAuthorTypeHash }/>
          {
            self.props.worksDetail.WorkTimeLine && self.props.worksDetail.WorkTimeLine.length
              ? <Timeline datas={ self.props.worksDetail.WorkTimeLine }/>
              : ''
          }
          {
            self.props.worksDetail.WorksAuthorComment
              ? <InspComment ref="inspComment"
                             commentData={ self.props.worksDetail.WorksAuthorComment }/>
              : ''
          }
        </div>
        <WorkComment ref="workComment"
                     isLogin={ self.props.isLogin }
                     worksID={ self.worksID }
                     workID={ self.workID }
                     hidden={ tag !== 'comment' }
                     originTo={ self.props.worksDetail.Title }
                     commentData={ self.props.commentData }/>
      </div>;
    }
    if(self.worksType === WorksTypeEnum.TYPE.photoAlbum) {
      return <div class={ 'works t' + self.worksType }>
        <ul class="sel fn-clear" ref="sel" onClick={ { li: this.clickSel } }>
          <li class={ tag !== 'intro' && tag !== 'comment' ? 'cur' : '' } rel="photoAlbum">相册</li>
          <li class={ tag === 'intro' ? 'cur' : '' } rel="intro">简介</li>
          <li class={ tag === 'comment' ? 'cur' : '' } rel="comment">留言</li>
          {
            state ? <li class="state">{ state }</li> : ''
          }
        </ul>
        <PhotoAlbum ref="photoAlbum" worksID={ self.worksID } labelList={ self.props.labelList }
                    hidden={ tag === 'intro' || tag === 'comment' }/>
        <div class={ 'intro' + (tag === 'intro' ? '' : ' fn-hide') } ref="intro">
          <Author list={ self.props.worksDetail.GroupAuthorTypeHash }/>
          {
            self.props.worksDetail.WorkTimeLine && self.props.worksDetail.WorkTimeLine.length
              ? <Timeline datas={ self.props.worksDetail.WorkTimeLine }/>
              : ''
          }
          {
            self.textData && self.textData.value && self.textData.value.length
              ? <Text datas={ self.textData }/>
              : ''
          }
          {
            self.props.worksDetail.WorksAuthorComment
              ? <InspComment ref="inspComment"
                             commentData={ self.props.worksDetail.WorksAuthorComment }/>
              : ''
          }
        </div>
        <WorkComment ref="workComment"
                     isLogin={ self.props.isLogin }
                     worksID={ self.worksID }
                     workID={ self.workID }
                     hidden={ tag !== 'comment' }
                     originTo={ self.props.worksDetail.Title }
                     commentData={ self.props.commentData }/>
        <ImageView ref="imageView"/>
      </div>;
    }
    return <div class={ 'works t' + self.worksType }>
      <Media ref="media"
             worksID={ self.worksID }
             workID={ self.workID }
             cover={ self.props.worksDetail.cover_Pic }
             audioData={ self.audioData }
             videoData={ self.videoData }
             first={ first }/>
      <ul class="sel fn-clear" ref="sel" onClick={ { li: this.clickSel } }>
        <li class={ tag !== 'comment' ? 'cur' : '' } rel="intro">简介</li>
        <li class={ tag === 'comment' ? 'cur' : '' } rel="comment">留言</li>
        {
          state ? <li class="state">{ state }</li> : ''
        }
      </ul>
      <div class={ 'intro' + (tag === 'comment' ? ' fn-hide' : '') } ref="intro">
        {
          self.props.worksDetail.Describe
            ? <Describe title="简介" data={ self.props.worksDetail.Describe }/>
            : ''
        }
        <Author list={ self.props.worksDetail.GroupAuthorTypeHash }/>
        {
          self.props.worksDetail.WorkTimeLine && self.props.worksDetail.WorkTimeLine.length
            ? <Timeline datas={ self.props.worksDetail.WorkTimeLine }/>
            : ''
        }
        {
          self.textData && self.textData.value && self.textData.value.length
            ? <Text datas={ self.textData }/>
            : ''
        }
        {
          self.lyricData && self.lyricData.value && self.lyricData.value.length && self.lyricData.value[0].Text
            ? <Lyric datas={ self.lyricData }/>
            : ''
        }
        {
          self.props.worksDetail.WorksAuthorComment
            ? <InspComment ref="inspComment"
                           commentData={ self.props.worksDetail.WorksAuthorComment }/>
            : ''
        }
        {
          self.posterData
            ? <Poster datas={ self.posterData }/>
            : ''
        }
      </div>
      <WorkComment ref="workComment"
                   isLogin={ self.props.isLogin }
                   worksID={ self.worksID }
                   workID={ self.workID }
                   hidden={ tag !== 'comment' }
                   originTo={ self.props.worksDetail.Title }
                   commentData={ self.props.commentData }/>
      <div class="app">
        <div class="txt">
          <div>
            <h4>每天转个圈 玩转每个圈</h4>
            <p>一个充满正能量的作品展示、创作平台~</p>
          </div>
          <a href={ this.url }
             target="_blank"
             onClick={ this.clickDownload }>下载</a>
        </div>
      </div>
      <div class="tip fn-hide"
           ref="tip"
           onClick={ this.clickTip }>
        <span>ios下载如果没有反应，请点击右上角，选择在safari浏览器中打开</span>
      </div>
    </div>;
  }
}

export default Works;
