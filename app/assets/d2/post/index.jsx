/**
 * Created by army8735 on 2018/4/7.
 */

'use strict';

import Post from './Post.jsx';

let author = migi.preExist(
  <Post postId={ $CONFIG.postId }
          info={ $CONFIG.info }
          comment={ $CONFIG.comment }/>
);
