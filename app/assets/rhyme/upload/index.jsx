/**
 * Created by army8735 on 2018/6/30.
 */

'use strict';

import './index.less';

import Upload from './Upload.jsx';

let upload = migi.preExist(
  <Upload info={ $CONFIG.info }
          originWorks={ $CONFIG.originWorks }/>
);
