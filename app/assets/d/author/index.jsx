/**
 * Created by army8735 on 2017/9/21.
 */

import './index.less';

import Author from './Author.jsx';

let author = migi.preExist(<Author
  isLogin={ $CONFIG.isLogin }
  authorID={ $CONFIG.authorID }
  authorDetail={ $CONFIG.authorDetail }
  homeDetail={ $CONFIG.homeDetail }
  tags={ $CONFIG.tags }
  playList={ $CONFIG.playList }
  playList2={ $CONFIG.playList2 }
  commentData={ $CONFIG.commentData }/>);
