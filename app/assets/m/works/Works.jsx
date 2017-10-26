/**
 * Created by army8735 on 2017/9/18.
 */

import util from '../../d/common/util';
import net from '../../d/common/net';
import Media from './Media.jsx';
import itemTemplate from '../../d/works/itemTemplate';
import Author from '../../d/works/Author.jsx';
import Timeline from '../../d/works/Timeline.jsx';
import Text from '../../d/works/Text.jsx';
import Lyric from '../../d/works/Lyric.jsx';
import InspComment from '../../d/works/InspComment.jsx';
import Poster from '../../d/works/Poster.jsx';
import WorkComment from './WorkComment.jsx';
import SubCmt from '../../d/component/subcmt/SubCmt.jsx';

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
      let comment = workComment.ref.comment;
      let subCmt = self.ref.subCmt;
      if(media) {
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
            if(rootID === -1 && data.RootID === -1) {
              comment.prependData(data);
              comment.message = '';
            }
            else {
              comment.prependChild(data);
            }
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

    if(self.videoData) {
      first = 'video';
      self.workID = self.videoData[0].ItemID;
    }
    else if(self.audioData) {
      first = 'audio';
      self.workID = self.audioData[0].ItemID;
    }
  }
  clickSel(e, vd, tvd) {
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
      let rel = tvd.props.rel;
      if(rel === 'intro') {
        $(this.ref.comments.element).addClass('fn-hide');
        $(this.ref.intro.element).removeClass('fn-hide');
      }
      else {
        $(this.ref.intro.element).addClass('fn-hide');
        $(this.ref.comments.element).removeClass('fn-hide');
      }
    }
  }
  render() {
    return <div class="works">
      <Media ref="media"
             worksID={ this.worksID }
             cover={ this.props.worksDetail.cover_Pic }
             audioData={ this.audioData }
             videoData={ this.videoData }
             first={ first }/>
      <ul class="sel fn-clear" onClick={ { li: this.clickSel } }>
        <li class="cur" rel="intro">简介</li>
        <li rel="comments">留言</li>
      </ul>
      <div class="intro" ref="intro">
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
      <div class="comments fn-hide" ref="comments">
        <WorkComment ref="workComment"
                     isLogin={ this.props.isLogin }
                     worksID={ this.worksID }
                     workID={ this.workID }
                     originTo={ this.props.worksDetail.Title }
                     commentData={ this.props.commentData }/>
      </div>
      <SubCmt ref="subCmt"
              originTo={ this.props.worksDetail.Title }
              subText="发送"
              tipText="-${n}"
              placeholder="夸夸这个作品吧"/>
    </div>;
  }
}

export default Works;
