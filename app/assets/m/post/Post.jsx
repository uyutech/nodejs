/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import PostComment from './PostComment.jsx';

class Post extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="post fn-clear">
      <h2>{ this.props.postData.Title }</h2>
      <h3><img src="//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png"/>圈儿</h3>
      <div class="wrap">
        <div class="con" dangerouslySetInnerHTML={ this.props.postData.Content }/>
        <b class="arrow"/>
      </div>
      <PostComment ref="postComment"
                       id={ this.props.id }
                       isLogin={ this.props.isLogin }
                       commentData={ this.props.commentData }/>
    </div>;
  }
}

export default Post;
