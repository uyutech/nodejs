/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';
import Reply from './Reply.jsx';
import SubCmt from '../component/subcmt/SubCmt.jsx';
import Page from '../component/page/Page.jsx';

let skip = 10;
let take = 10;
let sortType = 0;
let myComment = 0;
let currentCount = 0;
let ajax;

class Post extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let subCmt = self.ref.subCmt;
      let reply = self.ref.reply;
      let page = self.ref.page;
      let page2 = self.ref.page2;
      page.on('page', function(i) {
        page2.index = i;
        skip = (i - 1) * take;
        self.loadPage();
      });
      page2.on('page', function(i) {
        page.index = i;
        skip = (i - 1) * take;
        self.loadPage();
      });
      reply.on('chooseSubComment', function(rid, cid, name) {
        self.rootID = rid;
        self.parentID = cid;
        subCmt.to = name;
      });
      reply.on('closeSubComment', function() {
        self.rootID = -1;
        self.parentID = -1;
        subCmt.to = null;
      });
      subCmt.on('submit', function(content) {
        subCmt.isCommentSending = true;
        let rootID = self.rootID;
        let parentID = self.parentID;
        net.postJSON('/api/post/addComment', {
          parentID,
          rootID,
          postID: self.props.id,
          content,
        }, function(res) {
          if(res.success) {
            subCmt.value = '';
            subCmt.hasCommentContent = false;
            if(rootID === -1) {
              reply.prependData(res.data);
              reply.message = '';
            }
            else {
              reply.prependChild(res.data);
            }
          }
          else if(res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          }
          else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          subCmt.isCommentSending = false;
        }, function(res) {
          alert(res.message || util.ERROR_MESSAGE);
          subCmt.isCommentSending = false;
        });
      });
    });
  }
  @bind rootID = -1
  @bind parentID = -1
  @bind loading
  load() {
    let self = this;
    let reply = self.ref.reply;
    let page = self.ref.page;
    let page2 = self.ref.page2;
    reply.message = '读取中...';
    if(ajax) {
      ajax.abort();
    }
    self.loading = true;
    ajax = net.postJSON('/api/post/commentList', { postID: self.props.id , skip, take, sortType, myComment, currentCount }, function(res) {
      if(res.success) {
        let data = res.data;
        currentCount = data.Size;
        skip += take;
        if(data.data.length) {
          reply.message = '';
          reply.appendData(res.data.data);
          page.total = page2.total = Math.ceil(currentCount / take);
        }
        else {
          reply.appendData(res.data.data);
          reply.message = '暂无评论';
        }
      }
      else {
        if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        reply.message = res.message || util.ERROR_MESSAGE;
      }
      self.loading = false;
    }, function(res) {
      reply.message = res.message || util.ERROR_MESSAGE;
      self.loading = false;
    });
  }
  loadPage() {
    let self = this;
    let reply = self.ref.reply;
    reply.message = '读取中...';
    reply.setData();
    if(ajax) {
      ajax.abort();
    }
    self.loading = true;
    ajax = net.postJSON('/api/post/commentList', { postID: self.props.id , skip, take, sortType, myComment, currentCount }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
        if(data.data.length) {
          reply.message = '';
          reply.appendData(res.data.data);
        }
        else {
          reply.appendData(res.data.data);
          reply.message = '暂无评论';
        }
      }
      else {
        if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        reply.message = res.message || util.ERROR_MESSAGE;
      }
      self.loading = false;
    }, function(res) {
      reply.message = res.message || util.ERROR_MESSAGE;
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
    this.loading = false;
    this.ref.reply.clearData();
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
      this.loading = false;
      this.ref.reply.clearData();
      this.load();
    }
  }
  render() {
    let postData = this.props.postData;
    return <div class="post fn-clear">
      <div class="main">
        <h2>{ postData.Title }</h2>
        <div class="profile fn-clear">
          <img class="pic" src={
            postData.IsAuthor
              ? postData.SendAuthorHead_Url || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png'
              : postData.SendUserHead_Url || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png' }/>
          <div class="txt">
            <div>
              <span class="name">{ postData.SendUserNickName }</span>
              <small class="time">{ util.formatDate(postData.Createtime) }</small>
            </div>
          </div>
        </div>
        <div class="wrap">
          <div class="con" dangerouslySetInnerHTML={ postData.Content }/>
          <b class="arrow"/>
        </div>
        <div class="box">
          <h4>回复</h4>
          <div class="fn">
            <ul class="type fn-clear" onClick={ { li: this.switchType2 } }>
              <li class="cur" rel="0">全部<small>{ this.props.replyData.Size }</small></li>
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
          <Page ref="page" total={ Math.ceil(this.props.replyData.Size / take) }/>
          <Reply ref="reply"
                 zanUrl="/api/post/likeComment"
                 subUrl="/api/post/subCommentList"
                 delUrl="/api/post/delComment"
                 data={ this.props.replyData.data }/>
          <Page ref="page2" total={ Math.ceil(this.props.replyData.Size / take) }/>
        </div>
        <SubCmt ref="subCmt"
                subText="回复帖子"
                placeholder="夸夸这个帖子吧"/>
      </div>
    </div>;
  }
}

export default Post;
