/**
 * Created by army8735 on 2017/9/21.
 */

import net from '../common/net';
import util from '../common/util';
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
import Album from './Album.jsx';

let first;

class Works extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.worksID = self.props.worksID;
    self.worksType = self.props.worksDetail.WorkType;
    self.setWorks(self.props.worksDetail.Works_Items);
    self.on(migi.Event.DOM, function() {
      let media = self.ref.media;
      let workComment = self.ref.workComment;
      if(media) {
        media.on('switchTo', function(data) {
          workComment.workID = data.ItemID;
        });
      }
    });
  }
  @bind worksID
  @bind worksType
  setWorks(works) {
    let self = this;
    let workHash = {};
    let workList = [];
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
    self.authorList = authorTypeList;

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

    if(self.videoData) {
      first = 'video';
      self.workID = self.videoData[0].ItemID;
    }
    else if(self.audioData) {
      first = 'audio';
      self.workID = self.audioData[0].ItemID;
    }
  }
  clickType(e, vd, tvd) {
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
      let type = tvd.props.rel;
      this.ref.media.switchType(type);
    }
  }
  render() {
    let self = this;
    if(self.worksType === 11) {
      return <div class={ 'works fn-clear t' + self.worksType }>
        <Title ref="title"
               worksDetail={ this.props.worksDetail }
               authorList={ this.authorList }/>
        <div class="main">
          <Album worksID={ this.props.worksID }/>
        </div>
        <div class="side">
          <div class="info">
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
                         worksID={ this.props.worksID }
                         commentData={ this.props.worksDetail.WorksAuthorComment }/>
          </div>
          <WorkComment ref="workComment"
                       isLogin={ this.props.isLogin }
                       worksID={ this.props.worksID }
                       workID={ this.workID }
                       commentData={ this.props.commentData }/>
        </div>
      </div>;
    }
    return <div class={ 'works fn-clear t' + self.worksType }>
      <Title ref="title"
             worksDetail={ this.props.worksDetail }
             authorList={ this.authorList }/>
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
          <li class="link" rel="link">站外链接</li>
        </ul>
        <Media ref="media"
               worksID={ this.props.worksID }
               cover={ this.props.worksDetail.cover_Pic }
               audioData={ this.audioData }
               videoData={ this.videoData }
               first={ first }/>
        <WorkComment ref="workComment"
                     isLogin={ this.props.isLogin }
                     worksID={ this.props.worksID }
                     workID={ this.workID }
                     commentData={ this.props.commentData }/>
      </div>
      <div class="side">
        <ul class="sel fn-clear" ref="sel">
          <li class="cur">简介</li>
        </ul>
        <div class="info">
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
                       worksID={ this.props.worksID }
                       commentData={ this.props.worksDetail.WorksAuthorComment }/>
          {
            this.posterData
              ? <Poster datas={ this.posterData }/>
              : ''
          }
        </div>
      </div>
    </div>;
  }
}

export default Works;
