/**
 * Created by army8735 on 2017/9/19.
 */

import net from '../common/net';
import util from '../common/util';
import Comment from '../component/comment/Comment.jsx';
import Page from '../component/page/Page.jsx';

let skip = 0;
let take = 10;
let sortType = 0;
let myComment = 0;
let ajax;

class AuthorComment extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.authorID = self.props.authorID;
    self.on(migi.Event.DOM, function() {
      let page = self.ref.page;
      let page2 = self.ref.page2;
      page.on('page', function(i) {
        if(page2) {
          page2.index = i;
        }
        skip = (i - 1) * take;
        self.load();
      });
      if(page2) {
        page2.on('page', function(i) {
          page.index = i;
          skip = (i - 1) * take;
          self.load();
        });
      }
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
  }
  load() {
    let self = this;
    let comment = self.ref.comment;
    if(ajax) {
      ajax.abort();
    }
    ajax = net.postJSON('/api/author/commentList', { authorID: self.authorID , skip, take, sortType, myComment }, function(res) {
      if(res.success) {
        let data = res.data;
        comment.setData(res.data.data);
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  switchType(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    let rel = $ul.find('.cur').attr('rel');
    sortType = rel;
    skip = 0;
    this.ref.page.index = 1;
    if(this.ref.page2) {
      this.ref.page2.index = 1;
    }
    if(ajax) {
      ajax.abort();
    }
    this.load();
  }
  switchType2(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    let rel = $ul.find('.cur').attr('rel');
    myComment = rel;
    skip = 0;
    this.ref.page.index = 1;
    if(this.ref.page2) {
      this.ref.page2.index = 1;
    }
    if(ajax) {
      ajax.abort();
    }
    this.load();
  }
  render() {
    return <div class={ 'comments' + (this.props.show ? '' : ' fn-hide') }>
      <div class="fn">
        <ul class="type fn-clear" onClick={ { li: this.switchType2 } }>
          <li class="cur" rel="0">全部评论<small>{ this.props.commentData.Count }</small></li>
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
               zanUrl="/api/author/likeComment"
               subUrl="/api/author/subCommentList"
               delUrl="/api/author/delComment"
               data={ this.props.commentData.data }/>
      {
        this.props.commentData.Size > take
          ? <Page ref="page2" total={ Math.ceil(this.props.commentData.Size / take) }/>
          : ''
      }
    </div>;
  }
}

export default AuthorComment;
