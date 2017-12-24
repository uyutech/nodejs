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
        if(item.ItemType === 1111 || item.ItemType === 1113) {
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
        else if(item.ItemType === 2110) {
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
    // 按类型将作者整理排序
    let authorList = [];
    itemTemplate.authorType.forEach(function(typeList) {
      let list = [];
      typeList.forEach(function(type) {
        if(typeHash.hasOwnProperty(type)) {
          list = list.concat(typeHash[type].list);
          delete typeHash[type];
        }
      });
      if(list.length) {
        authorList.push(list);
      }
    });
    let unKnowList = [];
    let unKnowHash = {};
    Object.keys(typeHash).forEach(function(type) {
      typeHash[type].list.forEach(function(item) {
        if(!unKnowHash.hasOwnProperty(item.ID)) {
          unKnowHash[item.ID] = true;
          unKnowList.push(item);
        }
      });
    });
    authorList = authorList.concat([unKnowList]);
    self.authorList = authorList;
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
               detail={ this.props.worksDetail }/>
        {
          this.props.worksDetail.WorkTimeLine && this.props.worksDetail.WorkTimeLine.length
            ? <Timeline datas={ this.props.worksDetail.WorkTimeLine }/>
            : ''
        }
        <div class="main">
          <ul class="type fn-clear" ref="type" onClick={ { li: this.clickType } }>
            <li class="cover cur" rel="cover">封面</li>
            <li class="player" rel="player">播放</li>
          </ul>
          <MusicAlbum ref="musicAlbum"
                      worksID={ this.worksID }
                      workID={ this.workID }
                      cover={ this.props.worksDetail.cover_Pic }
                      workList={ this.workList }/>
          <div class="box">
            <Describe data={ this.props.worksDetail.Describe }/>
            <Author authorList={ this.authorList }/>
            {
              this.props.worksDetail.WorksAuthorComment
                ? <InspComment ref="inspComment"
                               commentData={ this.props.worksDetail.WorksAuthorComment }/>
                : ''
            }
          </div>
        </div>
        <div class="side">
          <ul class="sel fn-clear" ref="sel">
            <li class="cur">曲目</li>
          </ul>
          <div class="box box-fn-top-left">
            <PlayList ref="playList" cover={ this.props.worksDetail.cover_Pic }
                      workList={ this.workList } worksID={ this.worksID } workID={ this.workID }/>
          </div>
          <WorkComment ref="workComment"
                       isLogin={ this.props.isLogin }
                       worksID={ this.worksID }
                       workID={ this.workID }
                       originTo={ this.props.worksDetail.Title }
                       commentData={ this.props.commentData }/>
        </div>
      </div>;
    }
    if(self.worksType === WorksTypeEnum.TYPE.photoAlbum) {
      return <div class={ 'works fn-clear t' + self.worksType }>
        <Title ref="title" worksType={ self.worksType }
               detail={ this.props.worksDetail }/>
        <div class="main">
          <PhotoAlbum worksID={ this.worksID } labelList={ this.props.labelList }/>
        </div>
        <div class="side">
          <div class="box">
            <Author authorList={ this.authorList }/>
            {
              this.props.worksDetail.WorkTimeLine && this.props.worksDetail.WorkTimeLine.length
                ? <Timeline datas={ this.props.worksDetail.WorkTimeLine }/>
                : ''
            }
            {
              this.textData && this.textData.value && this.textData.value.length
                ? <Text datas={ this.textData }/>
                : ''
            }
            {
              this.props.worksDetail.WorksAuthorComment
                ? <InspComment ref="inspComment"
                               commentData={ this.props.worksDetail.WorksAuthorComment }/>
                : ''
            }
          </div>
          <WorkComment ref="workComment"
                       isLogin={ this.props.isLogin }
                       worksID={ this.worksID }
                       workID={ this.workID }
                       originTo={ this.props.worksDetail.Title }
                       commentData={ this.props.commentData }/>
        </div>
        <AddLabelPanel ref="addLabelPanel" worksID={ this.worksID }/>
        <ImageView ref="imageView"/>
      </div>;
    }
    return <div class={ 'works fn-clear t' + self.worksType }>
      <Title ref="title" worksType={ self.worksType }
             detail={ this.props.worksDetail }/>
      <div class="main">
        <ul class="type fn-clear" ref="type" onClick={ { li: this.clickType } }>
          {
            this.videoData
              ? <li class={ 'video' + (first ==='video' ? ' cur' : '') } rel="video">视频</li>
              : ''
          }
          {
            this.audioData
              ? <li class={ 'audio' + (first === 'audio' ? ' cur' : '') } rel="audio">音频</li>
              : ''
          }
          {/*<li class="link" rel="link">站外链接</li>*/}
        </ul>
        <Media ref="media"
               worksID={ this.worksID }
               workID={ this.workID }
               cover={ this.props.worksDetail.cover_Pic }
               audioData={ this.audioData }
               videoData={ this.videoData }
               first={ first }/>
        <WorkComment ref="workComment"
                     isLogin={ this.props.isLogin }
                     worksID={ this.worksID }
                     workID={ this.workID }
                     originTo={ this.props.worksDetail.Title }
                     commentData={ this.props.commentData }/>
      </div>
      <div class="side">
        <ul class="sel fn-clear" ref="sel">
          <li class="cur">简介</li>
        </ul>
        <div class="box box-fn-top-left">
          <Author authorList={ this.authorList }/>
          {
            this.props.worksDetail.WorkTimeLine && this.props.worksDetail.WorkTimeLine.length
              ? <Timeline datas={ this.props.worksDetail.WorkTimeLine }/>
              : ''
          }
          {
            this.textData && this.textData.value && this.textData.value.length
              ? <Text datas={ this.textData }/>
              : ''
          }
          {
            this.lyricData && this.lyricData.value && this.lyricData.value.length
              ? <Lyric datas={ this.lyricData }/>
              : ''
          }
          {
            this.props.worksDetail.WorksAuthorComment
              ? <InspComment ref="inspComment"
                             commentData={ this.props.worksDetail.WorksAuthorComment }/>
              : ''
          }
          {
            this.posterData
              ? <Poster datas={ this.posterData }/>
              : ''
          }
        </div>
      </div>
      <AddLabelPanel ref="addLabelPanel" worksID={ this.worksID }/>
    </div>;
  }
}

export default Works;
