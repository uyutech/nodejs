/**
 * Created by army8735 on 2018/4/7.
 */

'use strict';

import PostList from '../component/postlist/PostList.jsx';
import Comments from './Comments.jsx';

class Post extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="post fn-clear">
      <div class="main">
        <PostList ref="postList"
                  visible={ true }
                  single={ true }
                  disabledClickPerson={ true }
                  data={ this.props.info }/>
        <Comments ref="comments"
                  id={ this.props.id }
                  data={ this.props.commentList }/>
      </div>
    </div>;
  }
}

export default Post;
