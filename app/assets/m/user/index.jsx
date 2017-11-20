/**
 * Created by army8735 on 2017/11/17.
 */

'use strict';

import './index.less';
import User from './User.jsx';

let user = migi.preExist(<User userInfo={ $CONFIG.userInfo } userPost={ $CONFIG.userPost }
                               followState={ $CONFIG.followState }/>);
