/**
 * Created by army8735 on 2017/9/1.
 */

import net from '../common/net';
import util from '../common/util';
import Comment from '../component/comment/Comment.jsx';

let skip = -1;
let take = 10;
let sortType = 0;
let myComment = 0;
let currentCount = 0;
let ajax;
let ajaxMore;
let loadEnd;

class WorkComment extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.id = self.props.id;
    let commentData = self.props.commentData;
    currentCount = commentData.Size;
    skip += take;
    if(!commentData.data.length) {
      loadEnd = true;
    }

    self.on(migi.Event.DOM, function() {
      let $window = $(window);
      $window.on('scroll', function() {
        self.checkMore();
      });
    });
  }
  @bind showComment
  @bind rootId = null
  @bind replayId = null
  @bind replayName
  @bind hasContent
  @bind loading
  @bind id
  show() {
    let self = this;
    $(self.element).removeClass('fn-hide');
    self.showComment = true;
  }
  hide() {
    let self = this;
    $(self.element).addClass('fn-hide');
    self.showComment = false;
    skip = -1;
  }
  load() {
    let self = this;
    self.ref.comment.message = '读取中...';
    if(ajax) {
      ajax.abort();
    }
    if(ajaxMore) {
      ajaxMore.abort();
    }
    self.loading = true;
    ajax = net.postJSON('/api/works/commentList', { id: self.id , skip, take, sortType, myComment, currentCount }, function(res) {
      if(res.success) {
        let data = res.data;
        currentCount = data.Size;
        skip += take;
        if(data.data.length) {
          self.ref.comment.message = '';
          self.ref.comment.appendData(res.data.data);
        }
        else {
          self.ref.comment.appendData(res.data.data);
          self.ref.comment.message = '暂无评论';
          loadEnd = true;
        }
      }
      else {
        if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        self.ref.comment.message = res.message || util.ERROR_MESSAGE;
      }
      self.loading = false;
    }, function(res) {
      self.ref.comment.message = res.message || util.ERROR_MESSAGE;
      self.loading = false;
    });
  }
  checkMore() {
    let $window = $(window);
    let self = this;
    let WIN_HEIGHT = $window.height();
    let HEIGHT = $(document.body).height();
    let bool;
    bool = $window.scrollTop() + HEIGHT + 30 > WIN_HEIGHT;
    if(self.showComment && !self.loading && !loadEnd && bool) {
      self.loading = true;
      ajaxMore = net.postJSON('api/works/GetToWorkMessage_List', { WorkID: self.worksID , skip, take, sortType, myComment, currentCount }, function(res) {
        if(res.success) {
          let data = res.data;
          currentCount = data.Size;
          skip += take;
          if(data.data.length) {
            self.ref.comment.appendData(data.data);
            if(data.data.length < take) {
              self.ref.comment.message = '已经到底了';
              loadEnd = true;
            }
          }
          else {
            loadEnd = true;
            self.ref.comment.message = '已经到底了';
          }
        }
        else {
          self.ref.comment.message = res.message || util.ERROR_MESSAGE;
        }
        self.loading = false;
      }, function(res) {
        self.ref.comment.message = res.message || util.ERROR_MESSAGE;
        self.loading = false;
      });
    }
  }
  switchType(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    let rel = $ul.find('.cur').attr('rel');
    currentCount = 0;
    sortType = rel;
    skip = -1;
    if(ajax) {
      ajax.abort();
    }
    if(ajaxMore) {
      ajaxMore.abort();
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
    skip = -1;
    if(ajax) {
      ajax.abort();
    }
    if(ajaxMore) {
      ajaxMore.abort();
    }
    loadEnd = false;
    this.loading = false;
    this.ref.comment.clearData();
    this.load();
  }
  render() {
    return <div class="comments">
      <ul class="type2 fn-clear" onClick={ { li: this.switchType2 } }>
        <li class="cur" rel="0">全部</li>
        <li rel="1">我的</li>
      </ul>
      <ul class="type fn-clear" onClick={ { li: this.switchType } }>
        <li class="cur" rel="0">最新</li>
        <li rel="1">最热</li>
      </ul>
      <Comment ref="comment"
               zanUrl="api/works/AddWorkCommentLike"
               subUrl="api/works/GetTocomment_T_List"
               delUrl="api/works/DeleteCommentByID"
               data={ this.props.commentData.data }/>
    </div>;
  }
}

export default WorkComment;
