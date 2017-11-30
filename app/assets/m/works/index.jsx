/**
 * Created by army8735 on 2017/9/11.
 */

import './index.less';

import Works from './Works.jsx';

let works = migi.preExist(<Works
  isLogin={ $CONFIG.isLogin }
  worksID={ $CONFIG.worksID }
  workID={ $CONFIG.workID }
  comment={ $CONFIG.comment }
  worksDetail={ $CONFIG.worksDetail }
  labelList={ $CONFIG.labelList }
  commentData={ $CONFIG.commentData }/>);
