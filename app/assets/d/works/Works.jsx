/**
 * Created by army8735 on 2017/9/21.
 */

import net from '../common/net';
import util from '../common/util';
import Title from './Title.jsx';
import Media from './Media.jsx';
import WorkComment from './WorkComment.jsx';
import itemTemplate from './itemTemplate';
import InspComment from './InspComment.jsx';

let first;

class Works extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.worksID = self.props.worksID;
    self.setWorks(self.props.worksDetail.Works_Items);
  }
  @bind worksID
  @bind workID
  @bind rootID = -1
  @bind parentID = -1
  @bind content
  @bind barrageTime = 0
  @bind hasCommentContent
  @bind isCommentSending
  setWorks(works) {
    let self = this;
    let workHash = {};
    let workList = [];
    let authorList = [];
    let authorHash = {};
    works.forEach(function(item) {
      // 将每个小作品根据小类型映射到大类型上，再归类
      let bigType = itemTemplate(item.ItemType).bigType;
      if(bigType) {
        workHash[bigType] = workHash[bigType] || [];
        workHash[bigType].push(item);
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
        value: workHash[k],
      });
    });
    authorHash = {};
    let tempHash = {
      901: 1,
      111: 1,
      112: 1,
      121: 2,
      122: 2,
      411: 2,
      421: 2,
      131: 2,
      134: 2,
      141: 2,
      211: 3,
      312: 3,
      311: 3,
      313: 3,
      351: 3,
      331: 3,
      332: 3,
    };
    authorList.forEach(function(item) {
      let type = tempHash[item.WorksAuthorType] || 3;
      authorHash[type] = authorHash[type] || [];
      authorHash[type].push(item);
    });
    authorList = [];
    if(authorHash[1]) {
      let seq = [901, 111, 112];
      migi.sort(authorHash[1], function(a, b) {
        return seq.indexOf(a.WorksAuthorType) > seq.indexOf(b.WorksAuthorType);
      });
      authorList.push(authorHash[1]);
    }
    if(authorHash[2]) {
      let seq = [121, 122, 411, 421, 131, 134, 141];
      migi.sort(authorHash[2], function(a, b) {
        return seq.indexOf(a.WorksAuthorType) > seq.indexOf(b.WorksAuthorType);
      });
      authorList.push(authorHash[2]);
    }
    if(authorHash[3]) {
      let seq = [211, 312, 311, 313, 351, 331, 332];
      migi.sort(authorHash[3], function(a, b) {
        return seq.indexOf(a.WorksAuthorType) > seq.indexOf(b.WorksAuthorType);
      });
      authorList.push(authorHash[3]);
    }
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
      else if(item.bigType === 'text') {
        self.hasText = true;
        self.textData = item.value;
      }
    });
    if(self.hasAudio) {
      first = 'audio';
      self.workID = self.audioData[0].ItemID;
    }
    else if(self.hasVideo) {
      first = 'video';
      self.workID = self.videoData[0].ItemID;
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
  input(e, vd) {
    if(!window.$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
    }
    else {
      let v = $(vd.element).val().trim();
      this.hasCommentContent = v.length > 0;
    }
  }
  focus(e, vd) {
    if(!window.$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
    }
  }
  submit(e) {
    e.preventDefault();
    let self = this;
    if(self.hasCommentContent) {
      let $input = $(this.ref.input.element);
      let rootID = self.rootID;
      self.isCommentSending = true;
      net.postJSON('/api/works/addComment', {
        parentID: self.parentID,
        rootID,
        content: $input.val(),
        worksID: self.worksID,
        workID: self.workID,
        barrageTime: self.barrageTime,
      }, function(res) {
        if(res.success) {
          $input.val('');
          self.hasCommentContent = false;
          if(rootID === -1) {
            self.ref.workComment.ref.comment.prependData(res.data);
            self.ref.workComment.ref.comment.message = '';
          }
          else {
            self.ref.workComment.ref.comment.prependChild(res.data);
          }
        }
        else if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        self.isCommentSending = false;
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
        self.isCommentSending = false;
      });
    }
  }
  render() {
    return <div class="works fn-clear">
      <Title ref="title"
             worksDetail={ this.props.worksDetail }
             authorList={ this.authorList }/>
      <div class="main">
        <ul class="type fn-clear" ref="type" onClick={ { li: this.clickType } }>
          {
            this.hasAudio
              ? <li class={ 'audio' + (first === 'audio' ? ' cur' : '') } rel="audio">音频</li>
              : ''
          }
          {
            this.hasVideo
              ? <li class={ 'video' + (first ==='video' ? ' cur' : '') } rel="video">视频</li>
              : ''
          }
        </ul>
        <Media ref="media"
               audioData={ this.audioData }
               videoData={ this.videoData }
               first={ first }/>
        <WorkComment ref="workComment"
                     isLogin={ this.props.isLogin }
                     worksID={ this.props.worksID }
                     commentData={ this.props.commentData }/>
      </div>
      <div class="side">
        <ul class="sel fn-clear" ref="sel">
          <li class="cur">简介</li>
          <li>站外链接</li>
        </ul>
        <div class="info">
          <h4>文案</h4>
          <pre class="intro">
              {
                (this.textData || []).map(function(item) {
                  return item.Text;
                })
              }
            </pre>
          <h4>创作灵感</h4>
          <InspComment ref="inspComment"
                       worksID={ this.props.worksID }
                       commentData={ this.props.worksDetail.WorksAuthorComment }/>
        </div>
      </div>
      <div class="form">
        <form class="fn-clear" ref="form" onSubmit={ this.submit }>
          <input type="text" class="text" ref="input" placeholder="夸夸这个作品吧"
                 onInput={ this.input } onFocus={ this.focus } maxlength="120"/>
          <input type="submit" class={ 'submit' + (this.hasCommentContent && !this.isCommentSending ? '' : ' dis') } value="发布评论"/>
        </form>
      </div>
    </div>;
  }
}

export default Works;
