/**
 * Created by army8735 on 2018/4/7.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';
import Page from '../component/page/Page.jsx';
import Comment from '../component/comment/Comment.jsx';

let offset = 0;
let ajax;

class Comments extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    let limit = self.props.data ? self.props.data.limit : 10;
    self.on(migi.Event.DOM, function() {
      let page = self.ref.page;
      let page2 = self.ref.page2;
      page.on('page', function(i) {
        if(page2) {
          page2.index = i;
        }
        offset = (i - 1) * limit;
        self.loadPage();
      });
      if(page2) {
        page2.on('page', function(i) {
          page.index = i;
          offset = (i - 1) * limit;
          self.loadPage();
        });
      }
    });
  }
  loadPage() {
    let self = this;
    let comment = self.ref.comment;
    if(ajax) {
      ajax.abort();
    }
    ajax = net.postJSON('/api/post/commentList', { id: self.props.id , offset }, function(res) {
      if(res.success) {
        let data = res.data;
        comment.setData(data.data);
      }
      else {
        if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        comment.message = res.message || util.ERROR_MESSAGE;
      }
    }, function(res) {
      comment.message = res.message || util.ERROR_MESSAGE;
    });
  }
  render() {
    let data = this.props.data || {};
    let total = Math.ceil(((data.count || 1) / data.limit) || 1);
    return <div class="mod mod-comment box">
      <h4>评论</h4>
      <div class="fn">
        <ul class="type fn-clear">
          <li class="cur" rel="0">全部<small>{ data.count || 0 }</small></li>
        </ul>
      </div>
      <Page ref="page"
            total={ total }/>
      <Comment ref="comment"
               data={ data.data || [] }/>
    </div>;
  }
}

export default Comments;
