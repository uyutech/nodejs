/**
 * Created by army8735 on 2017/9/18.
 */

import './index.less';

import Author from './Author.jsx';

let author = migi.preExist(<Author
  isLogin={ $CONFIG.isLogin }
  authorID={ $CONFIG.authorID }
  tag={ $CONFIG.tag }
  authorDetail={ $CONFIG.authorDetail }
  homeDetail={ $CONFIG.homeDetail }
  album={ $CONFIG.album }
  commentData={ $CONFIG.commentData }
  hotPlayList={ $CONFIG.hotPlayList }/>);
