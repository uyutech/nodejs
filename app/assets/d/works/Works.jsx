/**
 * Created by army8735 on 2017/9/21.
 */

import Title from './Title.jsx';
import Media from './Media.jsx';
import itemTemplate from './itemTemplate';
import Author from './Author.jsx';
import Text from './Text.jsx';
import Lyric from './Lyric.jsx';
import Poster from './Poster.jsx';
import Timeline from './Timeline.jsx';
import InspComment from './InspComment.jsx';
import WorkComment from './WorkComment.jsx';
import PhotoAlbum from './PhotoAlbum.jsx';
import AddLabelPanel from './AddLabelPanel.jsx';
import ImageView from './ImageView.jsx';
import WorksTypeEnum from './WorksTypeEnum';
import LyricsParser from './LyricsParser.jsx';
import PlayList from './PlayList.jsx';
import MusicAlbum from './MusicAlbum.jsx';
import Describe from './Describe.jsx';

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
      else if(self.worksType === WorksTypeEnum.TYPE.musicAlbum) {
        let musicAlbum = self.ref.musicAlbum;
        let cover = musicAlbum.ref.cover;
        let $type = $(self.ref.type.element);
        cover.on('start', function() {
          musicAlbum.start();
          $type.find('.cover').removeClass('cur');
          $type.find('.player').addClass('cur');
        });
        migi.eventBus.on('chooseMusic', function() {
          $type.find('.cover').removeClass('cur');
          $type.find('.player').addClass('cur');
        });
      }
      // let addLabel = self.ref.addLabelPanel;
      // migi.eventBus.on('add-label', function() {
      //   addLabel.show();
      // });
    });
  }
  @bind worksID
  @bind workID
  @bind worksType
  @bind isManager
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
      return;
    }
    else if(self.worksType === WorksTypeEnum.TYPE.photoAlbum) {
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
  }
  clickType(e, vd, tvd) {
    let self = this;
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
      let type = tvd.props.rel;
      if(self.worksType === WorksTypeEnum.TYPE.musicAlbum) {
        self.ref.musicAlbum.switchType(type);
      }
      else {
        self.ref.media.switchType(type);
      }
    }
  }
  render() {
    let self = this;
    if(self.worksType === WorksTypeEnum.TYPE.musicAlbum) {
      return <div class={ 'works fn-clear t' + self.worksType }>
        <Title ref="title" worksType={ self.worksType }
               detail={ self.props.worksDetail }/>
        {
          self.props.worksDetail.WorkTimeLine && self.props.worksDetail.WorkTimeLine.length
            ? <Timeline datas={ self.props.worksDetail.WorkTimeLine }/>
            : ''
        }
        <div class="main">
          <ul class="type fn-clear" ref="type" onClick={ { li: this.clickType } }>
            <li class="cover cur" rel="cover">封面</li>
            <li class="player" rel="player">播放</li>
          </ul>
          <MusicAlbum ref="musicAlbum"
                      worksID={ self.worksID }
                      workID={ self.workID }
                      cover={ self.props.worksDetail.cover_Pic }
                      workList={ self.workList }/>
          <div class="box">
            <Describe data={ self.props.worksDetail.Describe }/>
            <Author list={ self.props.worksDetail.GroupAuthorTypeHash }/>
            {
              self.props.worksDetail.WorksAuthorComment
                ? <InspComment ref="inspComment"
                               commentData={ self.props.worksDetail.WorksAuthorComment }/>
                : ''
            }
          </div>
        </div>
        <div class="side">
          <ul class="sel fn-clear" ref="sel">
            <li class="cur">曲目</li>
          </ul>
          <div class="box box-fn-top-left">
            <PlayList ref="playList" cover={ self.props.worksDetail.cover_Pic }
                      workList={ self.workList } worksID={ self.worksID } workID={ self.workID }/>
          </div>
          <WorkComment ref="workComment"
                       isLogin={ self.props.isLogin }
                       worksID={ self.worksID }
                       workID={ self.workID }
                       originTo={ self.props.worksDetail.Title }
                       commentData={ self.props.commentData }/>
        </div>
      </div>;
    }
    if(self.worksType === WorksTypeEnum.TYPE.photoAlbum) {
      return <div class={ 'works fn-clear t' + self.worksType }>
        <Title ref="title" worksType={ self.worksType }
               detail={ self.props.worksDetail }/>
        <div class="main">
          <PhotoAlbum worksID={ self.worksID } labelList={ self.props.labelList }/>
        </div>
        <div class="side">
          <div class="box">
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
                       originTo={ self.props.worksDetail.Title }
                       commentData={ self.props.commentData }/>
        </div>
        <AddLabelPanel ref="addLabelPanel" worksID={ self.worksID }/>
        <ImageView ref="imageView"/>
      </div>;
    }
    return <div class={ 'works fn-clear t' + self.worksType }>
      <Title ref="title" worksType={ self.worksType }
             detail={ self.props.worksDetail }/>
      <div class="main">
        <ul class="type fn-clear" ref="type" onClick={ { li: this.clickType } }>
          {
            self.videoData
              ? <li class={ 'video' + (first ==='video' ? ' cur' : '') } rel="video">视频</li>
              : ''
          }
          {
            self.audioData
              ? <li class={ 'audio' + (first === 'audio' ? ' cur' : '') } rel="audio">音频</li>
              : ''
          }
          {/*<li class="link" rel="link">站外链接</li>*/}
        </ul>
        <Media ref="media"
               worksID={ self.worksID }
               workID={ self.workID }
               cover={ self.props.worksDetail.cover_Pic }
               audioData={ self.audioData }
               videoData={ self.videoData }
               first={ first }/>
        <WorkComment ref="workComment"
                     isLogin={ self.props.isLogin }
                     worksID={ self.worksID }
                     workID={ self.workID }
                     originTo={ self.props.worksDetail.Title }
                     commentData={ self.props.commentData }/>
      </div>
      <div class="side">
        <ul class="sel fn-clear" ref="sel">
          <li class="cur">简介</li>
        </ul>
        <div class="box box-fn-top-left">
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
            self.lyricData && self.lyricData.value && self.lyricData.value.length
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
      </div>
      <AddLabelPanel ref="addLabelPanel" worksID={ self.worksID }/>
    </div>;
  }
}

export default Works;
