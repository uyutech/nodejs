/**
 * Created by army8735 on 2018/5/20.
 */

'use strict';

import './index.less';

import Home from './Home.jsx';

let home = migi.preExist(
  <Home worksNum={ $CONFIG.worksNum }
        worksLimit={ $CONFIG.worksLimit }
        postNum={ $CONFIG.postNum }
        postLimit={ $CONFIG.postLimit }/>
);
