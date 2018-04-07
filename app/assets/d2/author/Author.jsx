/**
 * Created by army8735 on 2018/3/29.
 */

'use strict';

import Comments from './Comments.jsx';

class Author extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="author">
      <Comments
        ref="comments"
        authorId={ this.props.authorId }
        data={ this.props.comment }/>
    </div>;
  }
}

export default Author;
