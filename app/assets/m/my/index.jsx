/**
 * Created by army8735 on 2017/10/27.
 */

'use strict';

import './index.less';

import My from './My.jsx';

let my = migi.preExist(<My userInfo={ $CONFIG.userInfo } follows={ $CONFIG.follows } favors={ $CONFIG.favors }
                           updateNickNameTimeDiff={ $CONFIG.updateNickNameTimeDiff }
                           updateHeadTimeDiff={ $CONFIG.updateHeadTimeDiff }/>);
