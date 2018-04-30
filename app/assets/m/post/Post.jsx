/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import PostList from '../component/postlist/PostList.jsx';
import CommentBar from '../component/commentbar/CommentBar.jsx';
import Comment from '../component/comment/Comment.jsx';

class Post extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="post">
      <PostList ref="postList"
                visible={ true }
                single={ true }
                data={ this.props.info }/>
      <CommentBar ref="commentBar"/>
      <Comment ref="comment"
               message="下载APP查看更多..."
               data={ this.props.commentList.data }/>
    </div>;
  }
}

export default Post;
