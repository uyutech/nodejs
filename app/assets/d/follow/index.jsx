/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

import './index.less';
import Follow from './Follow.jsx';

let follow = migi.preExist(<Follow hotCircle={ $CONFIG.hotCircle } follows={ $CONFIG.follows }
                                   userFollows={ $CONFIG.userFollows } userFans={ $CONFIG.userFans }
                                   postList={ $CONFIG.postList }/>);
