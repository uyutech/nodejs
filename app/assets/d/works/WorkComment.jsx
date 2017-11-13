/**
 * Created by army8735 on 2017/9/1.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';
import Comment from '../component/comment/Comment.jsx';
import Page from '../component/page/Page.jsx';
import SubCmt from '../component/subcmt/SubCmt.jsx';

let skip = 0;
let take = 10;
let sortType = 0;
let myComment = 0;
let currentCount = 0;
let ajax;
let loadEnd;

class WorkComment extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.worksID = self.props.worksID;
    self.workID = self.props.workID;
    self.on(migi.Event.DOM, function() {
      let subCmt = self.ref.subCmt;
      let page = self.ref.page;
      let page2 = self.ref.page2;
      let comment = self.ref.comment;
      page.on('page', function(i) {
        page2.index = i;
        skip = (i - 1) * take;
        self.loadPage();
        subCmt.to = '';
      });
      page2.on('page', function(i) {
        page.index = i;
        skip = (i - 1) * take;
        self.loadPage();
        subCmt.to = '';
      });
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
  @bind loading
  @bind worksID
  @bind workID
  @bind rootID = -1
  @bind parentID = -1
  @bind barrageTime = 0
  load() {
    let self = this;
    let comment = self.ref.comment;
    let page = self.ref.page;
    let page2 = self.ref.page2;
    comment.message = '读取中...';
    if(ajax) {
      ajax.abort();
    }
    self.loading = true;
    ajax = net.postJSON('/api/works/commentList', { worksID: self.worksID , skip, take, sortType, myComment, currentCount }, function(res) {
      if(res.success) {
        let data = res.data;
        currentCount = data.Size;
        skip += take;
        if(data.data.length) {
          comment.message = '';
          comment.appendData(res.data.data);
          page.total = page2.total = Math.ceil(currentCount / take);
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
    ajax = net.postJSON('/api/works/commentList', { worksID: self.worksID , skip, take, sortType, myComment, currentCount }, function(res) {
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
  switchType2(e, vd, tvd) {
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
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
  }
  render() {
    return <div class="mod mod-comment box">
      <h4>评论</h4>
      <div class="fn">
        <ul class="type fn-clear" onClick={ { li: this.switchType2 } }>
          <li class="cur" rel="0">全部<small>{ this.props.commentData.Size }</small></li>
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
      <Comment ref="comment"
               zanUrl="/api/works/likeComment"
               subUrl="/api/works/subCommentList"
               delUrl="/api/works/delComment"
               data={ this.props.commentData.data }/>
      <Page ref="page2" total={ Math.ceil(this.props.commentData.Size / take) }/>
      <SubCmt ref="subCmt"
              originTo={ this.props.originTo }
              placeholder="夸夸这个作品吧"/>
    </div>;
  }
}

export default WorkComment;
