/**
 * Created by army8735 on 2017/9/1.
 */

import './index.less';
import Media from './Media.jsx';
import Intro from './Intro.jsx';
import WorkComment from './WorkComment.jsx';

let ajax;
let commentType = 1;
let firstLoadComment = true;
let barrageTime = 0;

class Work extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let media = self.ref.media;
      let intro = self.ref.intro;
      let workComment = self.ref.workComment;
      media.on('tagChange', function(type) {
        switch (type) {
          case '0':
            workComment.hide();
            intro.show();
            break;
          case '1':
            intro.hide();
            workComment.show();
            if(firstLoadComment) {
              firstLoadComment = false;
              workComment.load();
            }
            break;
        }
      });
      media.on('switchSubWork', function(data) {
        self.subWorkID = data[0].ItemID;
        barrageTime = 0;
      });
      media.on('timeupdate', function(data) {
        barrageTime = data;
      });
      let comment = self.ref.workComment.ref.comment;
      comment.on('chooseSubComment', function(rid, cid, name) {
        self.rootId = rid;
        self.replayId = cid;
        self.replayName = name;
        commentType = 4;
      });
      comment.on('noSubComment', function() {
        self.clickReplay();
      });
    });
  }
  show() {
    $(this.element).removeClass('fn-hide');
    setTimeout(function() {
      this.ref.media.open();
    }.bind(this), 100);
  }
  hide() {
    $(this.element).addClass('fn-hide');
    this.ref.media.clear();
    firstLoadComment = true;
    if(ajax) {
      ajax.abort();
      commentType = 1;
      this.rootId = null;
      this.replayId = null;
      this.replayName = null;
    }
    this.ref.media.close();
    this.ref.intro.show();
    this.ref.workComment.hide();
    $(this.ref.form.element).addClass('fn-hide');
  }
  @bind rootId = null
  @bind replayId = null
  @bind replayName
  @bind hasContent
  @bind id
  @bind loading
  @bind subWorkID
  setId(id) {
    let self = this;
    self.id = id;
    let media = self.ref.media;
    media.setId(id);
    let intro = self.ref.intro;
    intro.setId(id);
    util.postJSON('/api/works/detail', { worksID: id }, function(res) {
      if(res.success) {
        let data = res.data;
        media.setCover(data.cover_Pic);
        media.setWorks(data.Works_Items);
        media.popular = data.Popular;
        intro.tags = data.ReturnTagData || [];
        migi.eventBus.emit('changeTitle', data.Title);
        $(self.ref.form.element).removeClass('fn-hide');
      }
      else {
        alert(res.message);
      }
    });
    self.ref.workComment.id = id;
  }
  clickReplay() {
    this.replayId = null;
    this.replayName = null;
    this.rootId = null;
    commentType = 1;
  }
  input(e, vd) {
    let v = $(vd.element).val().trim();
    this.hasContent = v.length > 0;
    if(!window.IS_LOGIN) {
      migi.eventBus.emit('NEED_LOGIN');
    }
  }
  focus() {
    if(!window.IS_LOGIN) {
      migi.eventBus.emit('NEED_LOGIN');
    }
  }
  click(e) {
    e.preventDefault();
    let self = this;
    if(self.hasContent) {
      let $input = $(this.ref.input.element);
      let content = $input.val();
      let parentID = self.replayId !== null ? self.replayId : -1;
      let rootID = self.rootId !== null ? self.rootId : -1;
      self.loading = true;
      if(ajax) {
        ajax.abort();
      }
      self.ref.media.switchTo(1);
      ajax = util.postJSON('/api/works/addComment', {
        parentID,
        rootID,
        content,
        worksID: self.id,
        workID: self.subWorkID,
        barrageTime
      }, function(res) {
        if(res.success) {
          self.ref.workComment.element.scrollIntoView();
          $input.val('');
          self.hasContent = false;
          if(rootID === -1) {
            self.ref.workComment.ref.comment.addNew(res.data);
            self.ref.workComment.ref.comment.message = '';
          }
          else {
            self.ref.workComment.ref.comment.addChild(res.data);
          }
        }
        else if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        self.loading = false;
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
        self.loading = false;
      });
    }
  }
  render() {
    return <div class="main work">
      <Media ref="media"/>
      <Intro ref="intro"/>
      <WorkComment ref="workComment"/>
      <div class="form fn-hide" ref="form">
        <div class="c">
          <div class={ 'reply' + (this.replayId ? '' : ' fn-hide') } onClick={ this.clickReplay }>{ this.replayName }</div>
          <div class="inputs">
            <input ref="input" type="text" placeholder="回复..." onInput={ this.input } onFocus={ this.focus }/>
          </div>
          <button onClick={ this.click } class={ this.hasContent && !this.loading ? '' : 'dis' }>确定</button>
        </div>
      </div>
    </div>;
  }
}

export default Work;
