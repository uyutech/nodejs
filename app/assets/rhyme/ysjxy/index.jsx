/**
 * Created by army8735 on 2018/6/29.
 */

'use strict';

import './index.less';

import Home from './Home.jsx';

let home = migi.preExist(
  <Home info={ $CONFIG.info }
        originWorks={ $CONFIG.originWorks }/>
);
