/**
 * Created by army8735 on 2018/1/30.
 */

'use strict';

import Page from '../component/page/Page.jsx';
import Comment from '../component/comment/Comment.jsx';

let take = 10;

class WorksComment extends migi.Component {
  constructor(...data) {
    super(...data);
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
            total={ Math.ceil(this.props.worksCommentData.size / take) }/>
      <Comment ref="comment"
               data={ this.props.worksCommentData.data }/>
    </div>;
  }
}

export default WorksComment;
