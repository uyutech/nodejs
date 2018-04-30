/**
 * Created by army8735 on 2018/4/7.
 */

'use strict';

import './index.less';

import Post from './Post.jsx';

let post = migi.preExist(
  <Post id={ $CONFIG.id }
        info={ $CONFIG.info }
        commentList={ $CONFIG.commentList }/>
);
