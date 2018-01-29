/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

import './index.less';

import Works from './Works.jsx';

let works = migi.preExist(
  <Works worksID={ $CONFIG.worksID }
         workID={ $CONFIG.workID }
         worksInfo={ $CONFIG.worksInfo }
         worksWorkList={ $CONFIG.worksWorkList }
         worksCommentData={ $CONFIG.worksCommentData }/>
);
