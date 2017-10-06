/**
 * Created by army8735 on 2017/9/21.
 */

import './index.less';

import Works from './Works.jsx';

let works = migi.preExist(<Works
  worksID={ $CONFIG.worksID }
  worksDetail={ $CONFIG.worksDetail }
  commentData={ $CONFIG.commentData }/>);
