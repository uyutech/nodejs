/**
 * Created by army8735 on 2018/4/23.
 */

'use strict';

import './index.less';
import Works from './Works.jsx';

let works = migi.preExist(
  <Works worksId={ $CONFIG.worksId }
         workId={ $CONFIG.workId }
         info={ $CONFIG.info }
         collection={ $CONFIG.collection }
         commentList={ $CONFIG.commentList }/>
);
