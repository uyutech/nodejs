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

const STATE = {
  1: '已完成',
  2: '未完成'
};

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
        self.rootID = rid;
        self.parentID = cid;
        subCmt.to = name;
      });
      comment.on('closeSubComment', function() {
        self.rootID = -1;
        self.parentID = -1;
        subCmt.to = '';
      });
      subCmt.on('submit', function(content) {
        subCmt.invalid = true;
        let rootID = self.rootID;
        let parentID = self.parentID;
        net.postJSON('/api/works/addComment', {
          parentID: parentID,
          rootID: rootID,
          worksID: self.worksID,
          workID: self.workID,
          barrageTime: self.barrageTime,
          content,
        }, function(res) {
          if(res.success) {
            let data = res.data;
            subCmt.value = '';
            if(rootID === -1) {
              comment.prependData(data);
              comment.message = '';
            }
            else {
              comment.prependChild(data);
            }
            self.clickSel(null, self.ref.sel, self.ref.sel.children[self.ref.sel.children.length - 1]);
            migi.eventBus.emit('COMMENT', 'work');
          }
          else if(res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
            subCmt.invalid = false;
          }
          else {
            alert(res.message || util.ERROR_MESSAGE);
            subCmt.invalid = false;
          }
        }, function(res) {
          alert(res.message || util.ERROR_MESSAGE);
          subCmt.invalid = false;
        });
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
      return;
    }
    let workHash = {};
    let authorList = [];
    let authorHash = {};
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
        item.Works_Item_Author.forEach(function (item) {
          authorHash[item.WorksAuthorType] = authorHash[item.WorksAuthorType] || {};
          if(!authorHash[item.WorksAuthorType][item.ID]) {
            authorHash[item.WorksAuthorType][item.ID] = true;
            authorList.push(item);
          }
        });
      }
    });
    Object.keys(workHash).forEach(function(k) {
      workList.push({
        bigType: k,
        name: workHash[k].name,
        value: workHash[k].value,
      });
    });

    authorHash = {};
    let authorType = itemTemplate.authorType;
    let authorTypeHash = {};
    let authorTypeList = [];
    let unknowList = [];
    authorType.forEach(function(list, index) {
      list.forEach(function(item) {
        authorTypeHash[item] = index;
      });
    });
    authorList.forEach(function(item) {
      let i = authorTypeHash[item.WorksAuthorType];
      if(i === undefined) {
        unknowList.push(item);
      }
      else {
        authorTypeList[i] = authorTypeList[i] || [];
        authorTypeList[i].push(item);
      }
    });
    authorList = [];
    authorTypeList.forEach(function(item, index) {
      let seq = itemTemplate.authorType[index];
      migi.sort(item, function(a, b) {
        return seq.indexOf(a.WorksAuthorType) > seq.indexOf(b.WorksAuthorType);
      });
    });
    if(unknowList.length) {
      authorTypeList.push(unknowList);
    }
    self.authorList = [];
    if(self.props.worksDetail.Works_Author && self.props.worksDetail.Works_Author.length) {
      self.authorList.push(self.props.worksDetail.Works_Author);
    }
    self.authorList = self.authorList.concat(authorTypeList);

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
  clickSel(e, vd, tvd) {
    let self = this;
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
      let rel = tvd.props.rel;
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
    if(self.worksType === WorksTypeEnum.TYPE.musicAlbum) {
      return <div class={'works t' + self.worksType}>
        <MusicAlbum ref="musicAlbum"
                    worksID={ this.worksID }
                    workID={ this.workID }
                    cover={ this.props.worksDetail.cover_Pic }
                    workList={ this.workList }/>
        <ul class="sel fn-clear" ref="sel" onClick={ { li: this.clickSel } }>
          <li class="cur" rel="playList">曲目</li>
          <li rel="intro">简介</li>
          <li rel="comment">留言</li>
        </ul>
        <PlayList ref="playList"cover={ this.props.worksDetail.cover_Pic }
                  worksID={ this.worksID } workID={ this.workID } workList={ this.workList }/>
        <div class="intro fn-hide" ref="intro">
          <span class="state">{ STATE[this.props.worksDetail.WorkState] }</span>
          {
            this.props.worksDetail.WorkTimeLine && this.props.worksDetail.WorkTimeLine.length
              ? <Timeline datas={ this.props.worksDetail.WorkTimeLine }/>
              : ''
          }
        </div>
        <WorkComment ref="workComment"
                     isLogin={ this.props.isLogin }
                     worksID={ this.worksID }
                     workID={ this.workID }
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
          <li class="cur" rel="photoAlbum">相册</li>
          <li rel="intro">简介</li>
          <li rel="comment">留言</li>
        </ul>
        <PhotoAlbum ref="photoAlbum" worksID={ this.worksID } labelList={ this.props.labelList }/>
        <div class="intro fn-hide" ref="intro">
          <span class="state">{ STATE[this.props.worksDetail.WorkState] }</span>
          <Author authorList={ [this.props.worksDetail.Works_Author] }/>
          {
            this.props.worksDetail.WorkTimeLine && this.props.worksDetail.WorkTimeLine.length
              ? <Timeline datas={ this.props.worksDetail.WorkTimeLine }/>
              : ''
          }
          {
            this.textData
              ? <Text datas={ this.textData }/>
              : ''
          }
          {
            this.lyricData
              ? <Lyric datas={ this.lyricData }/>
              : ''
          }
          <InspComment ref="inspComment"
                       commentData={ this.props.worksDetail.WorksAuthorComment }/>
        </div>
        <WorkComment ref="workComment"
                     isLogin={ this.props.isLogin }
                     worksID={ this.worksID }
                     workID={ this.workID }
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
        <li class="cur" rel="intro">简介</li>
        <li rel="comment">留言</li>
      </ul>
      <div class="intro" ref="intro">
        <span class="state">{ STATE[this.props.worksDetail.WorkState] }</span>
        <Author authorList={ this.authorList }/>
        {
          this.props.worksDetail.WorkTimeLine && this.props.worksDetail.WorkTimeLine.length
            ? <Timeline datas={ this.props.worksDetail.WorkTimeLine }/>
            : ''
        }
        {
          this.textData
            ? <Text datas={ this.textData }/>
            : ''
        }
        {
          this.lyricData
            ? <Lyric datas={ this.lyricData }/>
            : ''
        }
        <InspComment ref="inspComment"
                     commentData={ this.props.worksDetail.WorksAuthorComment }/>
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
