/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';
import Comment from '../../d/component/comment/Comment.jsx';
import SubCmt from '../../d/component/subcmt/SubCmt.jsx';
import ImageView from './ImageView.jsx';

let take = 30;
let skip = take;
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
    self.isFavor = self.props.postData.ISFavor;
    self.favorCount = self.props.postData.FavorCount;
    self.loadEnd = self.props.replyData.Size <= take;
    self.on(migi.Event.DOM, function() {
      let $window = $(window);
      $window.on('scroll', function() {
        self.checkMore($window);
      });

      let subCmt = self.ref.subCmt;
      let comment = self.ref.comment;
      comment.on('chooseSubComment', function(rid, cid, name, n) {
        subCmt.to = name;
        self.rid = rid;
        self.cid = cid;
        if(!n || n === '0') {
          location.href = '/subComment?type=1&id=' + self.props.postData.ID + '&cid=' + cid + '&rid=' + rid;
        }
      });
      comment.on('closeSubComment', function() {
        subCmt.to = '';
      });
      subCmt.on('focus', function() {
        if(subCmt.to) {
          location.href = '/subComment?type=1&id=' + self.props.postData.ID + '&cid=' + self.cid + '&rid=' + self.rid;
        }
        else {
          location.href = '/subComment?type=1&id=' + self.props.postData.ID;
        }
      });

      let $root = $(self.element);
      $root.on('click', '.imgs img', function() {
        migi.eventBus.emit('choosePic', self.props.postData.Image_Post, $(this).attr('rel'), self.isLike);
      });

      let imageView = self.ref.imageView;
      imageView.on('clickLike', function() {
        self.clickLike();
      });
    });
  }
  @bind rootID = -1
  @bind parentID = -1
  @bind loading
  @bind loadEnd
  @bind isLike
  @bind likeCount
  @bind isFavor
  @bind favorCount
  @bind rid
  @bind cid
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
    let comment = self.ref.comment;
    if(ajax) {
      ajax.abort();
    }
    self.loading = true;
    comment.message = '正在加载...';
    ajax = net.postJSON('/api/post/commentList',
      { postID: self.props.id, skip, take, sortType, myComment, currentCount }, function(res) {
      if(res.success) {
        let data = res.data;
        if(data.data.length) {
          comment.appendData(res.data.data);
          comment.message = '';
        }
        else {
          comment.message = '已经到底了';
          self.loadEnd = true;
        }
        skip += take;
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
    sortType = rel;
    skip = 0;
    if(ajax) {
      ajax.abort();
    }
    this.loading = false;
    this.loadEnd = false;
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
      myComment = rel;
      skip = 0;
      if(ajax) {
        ajax.abort();
      }
      this.loading = false;
      this.loadEnd = false;
      this.ref.comment.clearData();
      this.load();
    }
  }
  clickFavor(e, vd) {
    if(!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
      return;
    }
    let $li = $(vd.element);
    if($li.hasClass('loading')) {
      return;
    }
    $li.addClass('loading');
    let self = this;
    let postID = self.props.postData.ID;
    let url = '/api/post/favor';
    if(self.isFavor) {
      url = '/api/post/unFavor';
    }
    net.postJSON(url, { postID }, function(res) {
      if(res.success) {
        let data = res.data;
        self.isFavor = data.State === 'favorWork';
        self.favorCount = data.FavorCount || '收藏';
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      $li.removeClass('loading');
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      $li.removeClass('loading');
    });
  }
  clickShare() {
    migi.eventBus.emit('SHARE', location.origin + '/post/' + this.props.postData.ID);
  }
  clickLike(e, vd) {
    if(!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
      return;
    }
    let $li = $(vd.element);
    if($li.hasClass('loading')) {
      return;
    }
    $li.addClass('loading');
    let self = this;
    let postID = self.props.postData.ID;
    net.postJSON('/api/post/like', { postID }, function(res) {
      if(res.success) {
        let data = res.data;
        self.isLike = self.ref.imageView.isLike = data.State === 'likeWordsUser';
        self.likeCount = data.LikeCount || '点赞';
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      $li.removeClass('loading');
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      $li.removeClass('loading');
    });
  }
  clickDel(e, vd) {
    if(window.confirm('确认删除吗？')) {
      let postID = this.props.postData.ID;
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
  }
  render() {
    let postData = this.props.postData;
    let html = (postData.Content || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/#([^#\n]+?)#/g, `<a href="/tag/$1">#$1#</a>`)
      .replace(/(http(?:s)?:\/\/[\w-]+\.[\w]+\S*)/gi, '<a href="$1" target="_blank">$1</a>');
    let replyData = this.props.replyData;
    return <div class="post">
      <h2>{ postData.Title }</h2>
      <div class={ 'profile fn-clear' + (postData.IsAuthor ? ' author' : '') }>
        {
          postData.IsAuthor
            ? <a class="pic" href={ '/author/' + postData.AuthorID }>
              <img src={ util.autoSsl(util.img128_128_80(postData.SendUserHead_Url
                || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png')) }/>
            </a>
            : <a class="pic" href={ '/user/' + postData.SendUserID }>
              <img src={ util.autoSsl(util.img128_128_80(postData.SendUserHead_Url
                || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png')) }/>
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
        <div class="circle">
          <ul>
            {
              (postData.Taglist || []).map(function(item) {
                if(item.CirclingList && item.CirclingList.length) {
                  return <li><a href={ '/circle/' + item.CirclingList[0].CirclingID }>{ item.CirclingList[0].CirclingName }圈</a></li>;
                }
                return <li><span>{ item.TagName }</span></li>;
              })
            }
          </ul>
        </div>
      </div>
      <div class="wrap">
        <p class="con" dangerouslySetInnerHTML={ html }/>
        {
          postData.Image_Post
            ?
            <div class="imgs">
              {
                postData.Image_Post.map(function(item, i) {
                  return <img src={ util.autoSsl(util.img720__80(item.FileUrl)) } rel={ i }/>;
                })
              }
            </div>
            : ''
        }
        <b class="arrow"/>
        <ul class="btn">
          <li class="share" onClick={ this.clickShare }><b/><span>分享</span></li>
          <li class={ 'favor' + (this.isFavor ? ' has' : '') } onClick={ this.clickFavor }>
            <b/><span>{ this.favorCount || '收藏' }</span>
          </li>
          <li class={ 'like' + (this.isLike ? ' has' : '') } onClick={ this.clickLike }>
            <b/><span>{ this.likeCount || '点赞' }</span>
          </li>
          <li class="comment">
            <a href={ '/subComment?type=1&id=' + this.props.postData.ID }>
              <b/><span>{ postData.CommentCount || '评论' }</span>
            </a>
          </li>
          { postData.IsOwn ? <li class="del" onClick={ this.clickDel }><b/></li> : '' }
        </ul>
      </div>
      <div class="box">
        <a name="comment"/>
        <h4>回复</h4>
        <div class="fn">
          <ul class="type fn-clear" onClick={ { li: this.switchType2 } }>
            <li class="cur" rel="0">全部<small>{ replyData.Count }</small></li>
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
        <Comment ref="comment"
               zanUrl="/api/post/likeComment"
               subUrl="/api/post/subCommentList"
               delUrl="/api/post/delComment"
               data={ replyData.data }
               message={ (!replyData.Size || replyData.Size > take) ? '' : '已经到底了' }/>
      </div>
      <SubCmt ref="subCmt"
              tipText="-${n}"
              subText="回复"
              originTo={ postData.SendUserNickName }
              placeholder="交流一下吧~"/>
      <ImageView ref="imageView" dataList={ postData.Image_Post } isLike={ this.isLike }/>
    </div>;
  }
}

export default Post;
