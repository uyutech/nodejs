/**
 * Created by army8735 on 2017/9/19.
 */

import util from '../../d/common/util';
import net from '../../d/common/net';
import Comment from '../../d/component/comment/Comment.jsx';
import Page from '../../d/component/page/Page.jsx';

let skip = 0;
let take = 10;
let sortType = 0;
let myComment = 0;
let currentCount = 0;
let ajax;
let loadEnd;

class AuthorComment extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.authorID = self.props.authorID;
    self.on(migi.Event.DOM, function() {
      let page = self.ref.page;
      page.on('page', function(i) {
        skip = (i - 1) * take;
        self.loadPage();
      });
      let comment = self.ref.comment;
      comment.on('chooseSubComment', function(rid, cid, name) {
        self.rootID = rid;
        self.parentID = cid;
      });
      comment.on('closeSubComment', function() {
        self.rootID = -1;
        self.parentID = -1;
      });
    });
  }
  @bind loading
  @bind authorID
  @bind rootID = -1
  @bind parentID = -1
  show() {
    let self = this;
    $(self.element).removeClass('fn-hide');
  }
  hide() {
    let self = this;
    $(self.element).addClass('fn-hide');
    skip = -1;
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
    ajax = net.postJSON('/api/author/commentList', { authorID: self.authorID , skip, take, sortType, myComment, currentCount }, function(res) {
      if(res.success) {
        let data = res.data;
        // currentCount = data.Size;
        skip += take;
        if(data.data.length) {
          comment.message = '';
          comment.appendData(res.data.data);
          page.total = Math.ceil(currentCount / take);
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
    ajax = net.postJSON('/api/author/commentList', { authorID: self.authorID , skip, take, sortType, myComment, currentCount }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
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
    currentCount = 0;
    sortType = rel;
    skip = 0;
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
    currentCount = 0;
    myComment = rel;
    skip = 0;
    if(ajax) {
      ajax.abort();
    }
    loadEnd = false;
    this.loading = false;
    this.ref.comment.clearData();
    this.load();
  }
  render() {
    return <div class={ 'comments' + (this.props.show ? '' : ' fn-hide') }>
      <div class="fn">
        <ul class="type fn-clear" onClick={ { li: this.switchType2 } }>
          <li class="cur" rel="0">全部评论<small>{ this.props.commentData.Size }</small></li>
          {
            this.props.isLogin
              ? <li rel="1">我的</li>
              : ''
          }
        </ul>
        <ul class="type2 fn-clear" onClick={ { li: this.switchType } }>
          <li class="cur" rel="0">最新</li>
          <li rel="1">最热</li>
        </ul>
      </div>
      <Page ref="page" total={ Math.ceil(this.props.commentData.Size / take) }/>
      <div class="warn">
        <div class="t fn-clear">
          <img class="pic" src="//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png"/>
          <div class="txt">
            <div>
              <span class="name">圈儿</span>
              <small class="time">{ util.formatDate(1508739460298) }</small>
            </div>
          </div>
        </div>
        <div class="c">
          <pre>自从积分活动开启，我们感受到了大家满满的热情，感谢支持！m(_ _)m

转圈系统运用了人工智能算法，所以会根据大家留言内容不同对积分数量进行相应地微调。所以请尽量不要发表重复或没有意义的留言哦( •̥́ ˍ •̀ )
也建议大家不要把一段内容在短时间内拆开分多条发布，悄悄告诉大家，这样获得的积分反而比合在一起的要少哦~

希望大家转圈开心，都能得想要的福利∗ > ɞ &lt;∗很快会有越来越多的新功能解锁哦！</pre>
          <b class="arrow"/>
        </div>
      </div>
      <Comment ref="comment"
               zanUrl="/api/author/likeComment"
               subUrl="/api/author/subCommentList"
               delUrl="/api/author/delComment"
               data={ this.props.commentData.data }/>
    </div>;
  }
}

export default AuthorComment;
