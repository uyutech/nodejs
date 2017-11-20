/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';
import Comment from '../component/comment/Comment.jsx';
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
    self.isLike = self.props.postData.ISLike;
    self.likeCount = self.props.postData.LikeCount;
    self.on(migi.Event.DOM, function() {
      let subCmt = self.ref.subCmt;
      let comment = self.ref.comment;
      let page = self.ref.page;
      let page2 = self.ref.page2;
      page.on('page', function(i) {
        if(page2) {
          page2.index = i;
        }
        skip = (i - 1) * take;
        self.loadPage();
      });
      if(page2) {
        page2.on('page', function(i) {
          page.index = i;
          skip = (i - 1) * take;
          self.loadPage();
        });
      }
      comment.on('chooseSubComment', function(rid, cid, name) {
        self.rootID = rid;
        self.parentID = cid;
        subCmt.to = name;
        subCmt.focus();
      });
      comment.on('closeSubComment', function() {
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
              comment.prependData(res.data);
              comment.message = '';
            }
            else {
              comment.prependChild(res.data, parentID);
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

      $(self.element).on('click', '.del', function() {
        if(window.confirm('确认删除吗？')) {
          let postID = $(this).attr('rel');
          net.postJSON('/api/post/del', { postID }, function(res) {
            if(res.success) {
              if(parent && parent.setHash) {
                // parent.setHash('/circle/' + $CONFIG.circleID);
                location.reload(true);
              }
            }
            else {
              alert(res.message || util.ERROR_MESSAGE);
            }
          }, function(res) {
            alert(res.message || util.ERROR_MESSAGE);
          });
        }
      });
    });
  }
  @bind rootID = -1
  @bind parentID = -1
  @bind loading
  @bind likeCount
  @bind isLike
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
    ajax = net.postJSON('/api/post/commentList', { postID: self.props.id , skip, take, sortType, myComment, currentCount }, function(res) {
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
    ajax = net.postJSON('/api/post/commentList', { postID: self.props.id , skip, take, sortType, myComment, currentCount }, function(res) {
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
      this.loading = false;
      this.ref.comment.clearData();
      this.load();
    }
  }
  clickLike() {
    let self = this;
    net.postJSON('/api/post/like', { postID: self.props.postData.ID }, function(res) {
      if(res.success) {
        let data = res.data;
        self.isLike = data.ISLike;
        self.likeCount = data.LikeCount;
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function() {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  render() {
    let postData = this.props.postData;
    let html = (postData.Content || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/#(\S.*?)#/g, `<strong>#$1#</strong>`)
      .replace(/(http(?:s)?:\/\/[\w-]+\.[\w]+\S*)/gi, '<a href="$1" target="_blank">$1</a>');
    return <div class="post fn-clear">
      <div class="main">
        <h2>{ postData.Title }</h2>
        <div class={ 'profile fn-clear' + (postData.IsAuthor ? ' author' : '') }>
          {
            postData.IsAuthor
              ? <a class="pic" href={ '/author/' + postData.AuthorID }>
                  <img src={ util.autoSsl(util.img128_128_80(postData.SendUserHead_Url || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png')) }/>
                </a>
              : <a class="pic" href={ '/user/' + postData.SendUserID }>
                  <img src={ util.autoSsl(util.img128_128_80(postData.SendUserHead_Url || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png')) }/>
                </a>
          }
          <div class="txt">
            <div>
              {
                postData.IsAuthor
                  ? <a class="name" href={ '/author/' + postData.AuthorID }>{ postData.SendUserNickName }</a>
                  : <a class="name" href={ '/user/' + postData.SendUserID }>{ postData.SendUserNickName }</a>
              }
              <small class="time">{ util.formatDate(postData.Createtime) }</small>
            </div>
          </div>
          <ul class="circle">
            {
              (postData.Taglist || []).map(function(item) {
                return <li><a href={ '/circle/' + item.TagID }>{ item.TagName }圈</a></li>;
              })
            }
          </ul>
        </div>
        <div class="wrap">
          <p class="con" dangerouslySetInnerHTML={ html }/>
          {
            postData.Image_Post
              ?
              <div class="imgs">
                {
                  postData.Image_Post.map(function(item) {
                    return <a href={ item.FileUrl } target="_blank">
                      <img src={ util.autoSsl(util.img1200__80(item.FileUrl)) }/>
                    </a>;
                  })
                }
              </div>
              : ''
          }
          <ul class="btn fn-clear">
            <li class={ 'like' + (this.isLike ? ' has' : '') } onClick={ this.clickLike }>{ this.likeCount }</li>
            {
              postData.IsOwn ? <li class="del" rel={ postData.ID }/> : ''
            }
          </ul>
          <b class="arrow"/>
        </div>
        <div class="box">
          <h4>回复</h4>
          <div class="fn">
            <ul class="type fn-clear" onClick={ { li: this.switchType2 } }>
              <li class="cur" rel="0">全部<small>{ this.props.replyData.Count }</small></li>
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
          <Comment ref="comment"
                 zanUrl="/api/post/likeComment"
                 subUrl="/api/post/subCommentList"
                 delUrl="/api/post/delComment"
                 data={ this.props.replyData.data }/>
          {
            this.props.replyData.Size > take
              ? <Page ref="page2" total={ Math.ceil(this.props.replyData.Size / take) }/>
              : ''
          }
        </div>
        <SubCmt ref="subCmt"
                subText="回复"
                originTo={ postData.SendUserNickName }
                placeholder="交流一下吧~"/>
      </div>
    </div>;
  }
}

export default Post;
