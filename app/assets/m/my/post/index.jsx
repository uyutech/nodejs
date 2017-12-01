/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import './index.less';
import Post from './Post.jsx';

let post = migi.preExist(
  <Post postList={ $CONFIG.postList }/>,
  '#page'
);
