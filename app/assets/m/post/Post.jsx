/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';
import Reply from './Reply.jsx';
import SubCmt from '../../d/component/subcmt/SubCmt.jsx';

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
      let $window = $(window);
      $window.on('scroll', function() {
        self.checkMore($window);
      });

      let subCmt = self.ref.subCmt;
      let reply = self.ref.reply;
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

      $(self.element).on('click', '.del', function() {
        if(window.confirm('确认删除吗？')) {
          let postID = $(this).attr('rel');
          net.postJSON('/api/post/del', { postID }, function(res) {
            if(res.success) {
              location.reload(true);
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
  @bidn loadEnd
  @bind likeCount
  @bind isLike
  checkMore($window) {
    let self = this;
    let WIN_HEIGHT = $window.height();
    let HEIGHT = $(document.body).height();
    let bool;
    bool = !$(self.element).hasClass('fn-hide') && $window.scrollTop() + WIN_HEIGHT + 30 > HEIGHT;
    if(!self.loading && !self.loadEnd && bool) {
      self.load();
    }
  }
  load() {
    let self = this;
    let reply = self.ref.reply;
    if(ajax) {
      ajax.abort();
    }
    self.loading = true;
    reply.message = '正在加载...';
    ajax = net.postJSON('/api/post/commentList', { postID: self.props.id, skip, take, sortType, myComment, currentCount }, function(res) {
      if(res.success) {
        let data = res.data;
        // currentCount = data.Size;
        if(data.data.length) {
          reply.message = '';
          reply.appendData(res.data.data);
        }
        else {
          reply.message = skip === 0 ? '暂无回复' : '已经到底了';
          self.loadEnd = true;
        }
        skip += take;
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
    return <div class="post">
      <h2>{ postData.Title }</h2>
      <div class={ 'profile fn-clear' + (postData.IsAuthor ? ' author' : '') }>
        <img class="pic" src={ util.autoSsl(util.img128_128_80(postData.SendUserHead_Url || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png')) }/>
        <div class="txt">
          <div>
            <span class="name">{ postData.SendUserNickName }</span>
            <small class="time">{ util.formatDate(postData.Createtime) }</small>
          </div>
        </div>
      </div>
      <div class="wrap">
        <pre class="con">{ postData.Content }</pre>
        {
          postData.Image_Post
            ?
            <div class="imgs">
              {
                postData.Image_Post.map(function(item) {
                  return <img src={ util.autoSsl(util.img600_600_80(item.FileUrl)) }/>
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
        <Reply ref="reply"
               zanUrl="/api/post/likeComment"
               subUrl="/api/post/subCommentList"
               delUrl="/api/post/delComment"
               data={ this.props.replyData.data }/>
      </div>
      <SubCmt ref="subCmt"
              tipText="-${n}"
              subText="回复"
              originTo={ postData.SendUserNickName }
              placeholder="交流一下吧~"/>
    </div>;
  }
}

export default Post;
