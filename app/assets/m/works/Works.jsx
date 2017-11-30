/**
 * Created by army8735 on 2017/9/18.
 */

import util from '../../d/common/util';
import net from '../../d/common/net';
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
import SubCmt from '../../d/component/subcmt/SubCmt.jsx';
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
    self.setWorks(self.props.worksDetail.Works_Items);
    self.on(migi.Event.DOM, function() {
      let workComment = self.ref.workComment;
      let comment = workComment.ref.comment;
      let subCmt = self.ref.subCmt;
      if(self.worksType === WorksTypeEnum.TYPE.originMusic) {
        let media = self.ref.media;
        media.on('switchTo', function(data) {
          workComment.workID = data.ItemID;
        });
      }
      comment.on('chooseSubComment', function(rid, cid, name) {
        // self.rootID = rid;
        // self.parentID = cid;
        // subCmt.to = name;
        // subCmt.focus();
        location.href = '/subComment?type=3&id=' + self.worksID + '&sid=' + self.workID + '&cid=' + rid;
      });
      comment.on('closeSubComment', function() {
        // self.rootID = -1;
        // self.parentID = -1;
        // subCmt.to = '';
      });
      subCmt.on('focus', function() {
        location.href = '/subComment?type=3&id=' + self.worksID + '&sid=' + self.workID;
      });
    });
  }
  @bind worksID
  @bind workID
  @bind worksType
  @bind rootID = -1
  @bind parentID = -1
  @bind barrageTime = 0
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
      else if(self.worksType === WorksTypeEnum.TYPE.originMusic) {
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
  render() {
    let self = this;
    let state = worksState.getStateStr(self.worksType, this.props.worksDetail.WorkState);
    let tag = self.props.tag;
    if(self.worksType === WorksTypeEnum.TYPE.musicAlbum) {
      return <div class={'works t' + self.worksType}>
        <MusicAlbum ref="musicAlbum"
                    worksID={ this.worksID }
                    workID={ this.workID }
                    cover={ this.props.worksDetail.cover_Pic }
                    workList={ this.workList }/>
        <ul class="sel fn-clear" ref="sel" onClick={ { li: this.clickSel } }>
          <li class={ tag !== 'intro' && tag !== 'comment' ? 'cur' : '' } rel="playList">曲目</li>
          <li class={ tag === 'intro' ? 'cur' : '' } rel="intro">简介</li>
          <li class={ tag === 'comment' ? 'cur' : '' } rel="comment">留言</li>
          {
            state ? <li class="state">{ state }</li> : ''
          }
        </ul>
        <PlayList ref="playList" cover={ this.props.worksDetail.cover_Pic }
                  hidden={ tag === 'intro' || tag === 'comment' }
                  worksID={ this.worksID } workID={ this.workID } workList={ this.workList }/>
        <div class={ 'intro' + (tag === 'intro' ? '' : ' fn-hide') } ref="intro">
          <Describe data={ this.props.worksDetail.Describe }/>
          <Author authorList={ this.authorList }/>
          {
            this.props.worksDetail.WorkTimeLine && this.props.worksDetail.WorkTimeLine.length
              ? <Timeline datas={ this.props.worksDetail.WorkTimeLine }/>
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
                     hidden={ tag !== 'comment' }
                     originTo={ this.props.worksDetail.Title }
                     commentData={ this.props.commentData }/>
        <SubCmt ref="subCmt"
                originTo={ this.props.worksDetail.Title }
                subText="发送"
                tipText="-${n}"
                placeholder="夸夸这个作品吧"/>
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
        <PhotoAlbum ref="photoAlbum" worksID={ this.worksID } labelList={ this.props.labelList }
                    hidden={ tag === 'intro' || tag === 'comment' }/>
        <div class={ 'intro' + (tag === 'intro' ? '' : ' fn-hide') } ref="intro">
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
                     hidden={ tag !== 'comment' }
                     originTo={ this.props.worksDetail.Title }
                     commentData={ this.props.commentData }/>
        <SubCmt ref="subCmt"
                originTo={ this.props.worksDetail.Title }
                subText="发送"
                tipText="-${n}"
                placeholder="夸夸这个作品吧"/>
        <ImageView ref="imageView"/>
      </div>;
    }
    return <div class={ 'works t' + self.worksType }>
      <Media ref="media"
             worksID={ this.worksID }
             workID={ this.workID }
             cover={ this.props.worksDetail.cover_Pic }
             audioData={ this.audioData }
             videoData={ this.videoData }
             first={ first }/>
      <ul class="sel fn-clear" ref="sel" onClick={ { li: this.clickSel } }>
        <li class={ tag !== 'comment' ? 'cur' : '' } rel="intro">简介</li>
        <li class={ tag === 'comment' ? 'cur' : '' } rel="comment">留言</li>
        {
          state ? <li class="state">{ state }</li> : ''
        }
      </ul>
      <div class={ 'intro' + (tag === 'comment' ? ' fn-hide' : '') } ref="intro">
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
          this.lyricData && this.lyricData.value && this.lyricData.value.length && this.lyricData.value[0].Text
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
      <WorkComment ref="workComment"
                   isLogin={ this.props.isLogin }
                   worksID={ this.worksID }
                   workID={ this.workID }
                   hidden={ tag !== 'comment' }
                   originTo={ this.props.worksDetail.Title }
                   commentData={ this.props.commentData }/>
      <SubCmt ref="subCmt"
              originTo={ this.props.worksDetail.Title }
              subText="发送"
              tipText="-${n}"
              placeholder="夸夸这个作品吧"/>
    </div>;
  }
}

export default Works;
