/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import './index.less';

import Post from './Post.jsx';

let post = migi.preExist(<Post
  postData={ $CONFIG.postData }
  id={ $CONFIG.id }
  commentData={ $CONFIG.commentData }
  isLogin={ $CONFIG.isLogin }/>);
