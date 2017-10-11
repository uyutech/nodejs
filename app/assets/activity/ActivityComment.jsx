/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import net from '../d/common/net';
import util from '../d/common/util';
import Comment from '../d/component/comment/Comment.jsx';
import Page from '../d/component/page/Page.jsx';

let skip = 0;
let take = 10;
let sortType = 0;
let myComment = 0;
let currentCount = 0;

class ActivityComment extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="comments">
      <Page ref="page" total={ 1 }/>
      <Comment ref="comment"/>
    </div>;
  }
}

export default ActivityComment;
