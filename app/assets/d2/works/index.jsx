/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

import './index.less';

import Works from './Works.jsx';

let works = migi.preExist(
  <Works worksId={ $CONFIG.worksId }
         workId={ $CONFIG.workId }
         info={ $CONFIG.info }
         collection={ $CONFIG.collection }
         author={ $CONFIG.author }
         commentList={ $CONFIG.commentList }/>
);
