/**
 * Created by army8735 on 2017/9/1.
 */

import util from '../../d/common/util';
import net from '../../d/common/net';
import Comment from '../../d/component/comment/Comment.jsx';

let take = 10;
let skip = take;
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
      let $window = $(window);
      $window.on('scroll', function() {
        self.checkMore($window);
      });
      self.loadEnd = self.props.commentData.Size <= take;
    });
  }
  @bind loading
  @bind loadEnd
  @bind worksID
  @bind workID
  @bind barrageTime = 0
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
    ajax = net.postJSON('/api/works/commentList', { worksID: self.worksID, skip, take, sortType, myComment, currentCount }, function(res) {
      if(res.success) {
        let data = res.data;
        if(data.data.length) {
          comment.message = '';
          comment.appendData(res.data.data);
        }
        else {
          comment.message = skip === 0 ? '' : '已经到底了';
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
    return <div class={ 'mod mod-comment' + (this.props.hidden ? ' fn-hide' : '') }>
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
      <Comment ref="comment"
               zanUrl="/api/works/likeComment"
               subUrl="/api/works/subCommentList"
               delUrl="/api/works/delComment"
               data={ this.props.commentData.data }
               message={ (!this.props.commentData.Size || this.props.commentData.Size > take) ? '' : '已经到底了' }/>
    </div>;
  }
}

export default WorkComment;
