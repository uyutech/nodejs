/**
 * Created by army8735 on 2017/9/21.
 */

import './index.less';

import Works from './Works.jsx';
import './admin.jsx';

let works = migi.preExist(<Works
  isLogin={ $CONFIG.isLogin }
  authorID={ $CONFIG.authorID }
  worksID={ $CONFIG.worksID }
  workID={ $CONFIG.workID }
  worksDetail={ $CONFIG.worksDetail }
  labelList={ $CONFIG.labelList }
  commentData={ $CONFIG.commentData }/>);
