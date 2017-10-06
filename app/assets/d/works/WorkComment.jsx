/**
 * Created by army8735 on 2017/9/1.
 */

import net from '../common/net';
import util from '../common/util';
import Comment from '../component/comment/Comment.jsx';
import Page from '../component/page/Page.jsx';

let Skip = 0;
let Take = 10;
let SortType = 0;
let MyComment = 0;
let CurrentCount = 0;
let ajax;
let loadEnd;

class WorkComment extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let page = self.ref.page;
      page.on('page', function(i) {
        Skip = (i - 1) * Take;
        self.loadPage();
      });
      let comment = self.ref.comment;
      comment.on('chooseSubComment', function(rid, cid, name) {
        self.rootId = rid;
        self.replayId = cid;
        self.replayName = name;
      });
      comment.on('closeSubComment', function() {
        self.clickReplay();
      });
    });
  }
  @bind showComment
  @bind rootId = null
  @bind replayId = null
  @bind replayName
  @bind hasContent
  @bind loading
  @bind worksID
  @bind subWorkID
  @bind barrageTime
  show() {
    let self = this;
    $(self.element).removeClass('fn-hide');
    self.showComment = true;
  }
  hide() {
    let self = this;
    $(self.element).addClass('fn-hide');
    self.showComment = false;
    Skip = 0;
  }
  load() {
    let self = this;
    let comment = self.ref.comment;
    let page = self.ref.page;
    comment.message = '读取中...';
    page.total = 1;
    if(ajax) {
      ajax.abort();
    }
    self.loading = true;
    ajax = net.postJSON('api/works/GetToWorkMessage_List', { WorkID: self.worksID , Skip, Take, SortType, MyComment, CurrentCount }, function(res) {
      if(res.success) {
        let data = res.data;
        CurrentCount = data.Size;
        Skip += Take;
        if(data.data.length) {
          comment.message = '';
          comment.appendData(res.data.data);
          page.total = Math.ceil(CurrentCount / Take);
        }
        else {
          comment.appendData(res.data.data);
          comment.message = '暂无评论';
          loadEnd = true;
        }
      }
      else {
        if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        comment.message = res.message || util.ERROR_MESSAGE;
      }
      self.loading = false;
    }, function(res) {
      comment.message = res.message || util.ERROR_MESSAGE;
      self.loading = false;
    });
  }
  loadPage() {
    let self = this;
    let comment = self.ref.comment;
    comment.message = '读取中...';
    comment.setData();
    if(ajax) {
      ajax.abort();
    }
    self.loading = true;
    ajax = net.postJSON('api/works/GetToWorkMessage_List', { WorkID: self.worksID , Skip, Take, SortType, MyComment, CurrentCount: 0 }, function(res) {
      if(res.success) {
        let data = res.data;
        Skip += Take;
        if(data.data.length) {
          comment.message = '';
          comment.appendData(res.data.data);
        }
        else {
          comment.appendData(res.data.data);
          comment.message = '暂无评论';
          loadEnd = true;
        }
      }
      else {
        if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        comment.message = res.message || util.ERROR_MESSAGE;
      }
      self.loading = false;
    }, function(res) {
      comment.message = res.message || util.ERROR_MESSAGE;
      self.loading = false;
    });
  }
  switchType(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    let rel = $ul.find('.cur').attr('rel');
    CurrentCount = 0;
    SortType = rel;
    Skip = 0;
    if(ajax) {
      ajax.abort();
    }
    loadEnd = false;
    this.loading = false;
    this.ref.comment.clearData();
    this.load();
  }
  switchType2(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    let rel = $ul.find('.cur').attr('rel');
    CurrentCount = 0;
    MyComment = rel;
    Skip = 0;
    if(ajax) {
      ajax.abort();
    }
    loadEnd = false;
    this.loading = false;
    this.ref.comment.clearData();
    this.load();
  }
  clickReplay() {
    this.replayId = null;
    this.replayName = null;
    this.rootId = null;
  }
  input(e, vd) {
    if(window.$CONFIG.isLogin !== 'True') {
      migi.eventBus.emit('NEED_LOGIN');
    }
    else {
      let v = $(vd.element).val().trim();
      this.hasContent = v.length > 0;
    }
  }
  focus(e, vd) {
    if(window.$CONFIG.isLogin !== 'True') {
      migi.eventBus.emit('NEED_LOGIN');
    }
  }
  submit(e) {
    e.preventDefault();
    let self = this;
    if(self.hasContent) {
      let $input = $(this.ref.input.element);
      let Content = $input.val();
      let ParentID = self.replayId !== null ? self.replayId : -1;
      let RootID = self.rootId !== null ? self.rootId : -1;
      self.loading = true;
      util.postJSON('api/works/AddComment', {
        ParentID,
        RootID,
        Content,
        subWorkID: self.subWorkID,
        BarrageTime: self.barrageTime
      }, function(res) {
        if(res.success) {
          $input.val('');
          self.hasContent = false;
          if(RootID === -1) {
            self.ref.comment.prependData(res.data);
            self.ref.comment.message = '';
          }
          else {
            self.ref.comment.prependChild(res.data);
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
    return <div class="comments">
      <h3>评论<small>之后还会增加简介、歌词、翻唱等多种功能，敬请期待-3-</small></h3>
      <b class="line"/>
      <div class="fn fn-clear">
        <ul class="type2 fn-clear" onClick={ { li: this.switchType2 } }>
          <li class="cur" rel="0">全部</li>
          <li rel="1">我的</li>
        </ul>
        <ul class="type fn-clear" onClick={ { li: this.switchType } }>
          <li class="cur" rel="0">最新</li>
          <li rel="1">最热</li>
        </ul>
      </div>
      <div class={ 'reply' + (this.replayId ? '' : ' fn-hidden') } onClick={ this.clickReplay }>回复：{ this.replayName }</div>
      <form class="form" ref="form" onSubmit={ this.submit }>
        <input type="text" class="text" ref="input" placeholder="请输入评论内容" onInput={ this.input } onFocus={ this.focus }/>
        <input type="submit" class={ 'submit' + (this.hasContent && !this.loading ? '' : ' dis') } value="发布评论"/>
      </form>
      <Page ref="page" total={ Math.ceil(this.props.commentData.Size / 10) }/>
      <Comment ref="comment"
               zanUrl="api/works/AddWorkCommentLike"
               subUrl="api/works/GetTocomment_T_List"
               delUrl="api/works/DeleteCommentByID"
               data={ this.props.commentData.data }/>
    </div>;
  }
}

export default WorkComment;
