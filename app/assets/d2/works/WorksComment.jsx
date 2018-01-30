/**
 * Created by army8735 on 2018/1/30.
 */

'use strict';

import Page from '../component/page/Page.jsx';
import Comment from '../component/comment/Comment.jsx';
import net from "../../d/common/net";
import util from "../../d/common/util";

let length = 10;
let index = 0;
let ajax;

class WorksComment extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let page = self.ref.page;
      let page2 = self.ref.page2;
      let comment = self.ref.comment;
      page.on('page', function(i) {
        if(page2) {
          page2.index = i;
        }
        index = (i - 1) * length;
        self.loadPage();
        // subCmt.to = '';
      });
      if(page2) {
        page2.on('page', function(i) {
          page.index = i;
          index = (i - 1) * length;
          self.loadPage();
          // subCmt.to = '';
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
    ajax = net.postJSON('/api2/works/commentList', { worksId: self.props.worksId , index, length }, function(res) {
      if(res.success) {
        let data = res.data;
        index += length;
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
    return <div class="mod mod-comment box">
      <h4>评论</h4>
      <div class="fn">
        <ul class="type fn-clear"
            onClick={ { li: this.switchType2 } }>
          <li class="cur" rel="0">全部<small>{ this.props.worksCommentData.size }</small></li>
          {
            this.props.isLogin
              ? <li rel="1">我的</li>
              : ''
          }
        </ul>
        <ul class="type2 fn-clear"
            onClick={ { li: this.switchType } }>
          <li class="cur" rel="0">最新</li>
          <li rel="1">最热</li>
        </ul>
      </div>
      <Page ref="page"
            total={ Math.ceil(this.props.worksCommentData.size / length) }/>
      <Comment ref="comment"
               data={ this.props.worksCommentData.data }/>
      {
        this.props.worksCommentData.size > length
          ? <Page ref="page2" total={ Math.ceil(this.props.worksCommentData.size / length) }/>
          : ''
      }
    </div>;
  }
}

export default WorksComment;
