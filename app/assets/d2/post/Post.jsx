/**
 * Created by army8735 on 2018/4/7.
 */

'use strict';

import Comments from './Comments.jsx';

class Post extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div>
      <Comments ref="comments"
                postId={ this.props.postId }
                data={ this.props.comment }/>
    </div>;
  }
}

export default Post;
