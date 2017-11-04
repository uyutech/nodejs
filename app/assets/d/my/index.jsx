/**
 * Created by army8735 on 2017/9/21.
 */

import './index.less';

import My from './My.jsx';

let my = migi.preExist(<My userInfo={ $CONFIG.userInfo } follows={ $CONFIG.follows } favors={ $CONFIG.favors }
                           updateNickNameTimeDiff={ $CONFIG.updateNickNameTimeDiff }
                           updateHeadTimeDiff={ $CONFIG.updateHeadTimeDiff }/>);
