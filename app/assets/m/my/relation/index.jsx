/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import './index.less';
import Relation from './Relation.jsx';

let relation = migi.preExist(
  <Relation tag={ $CONFIG.tag }
            follows={ $CONFIG.follows }
            userFriends={ $CONFIG.userFriends }
            userFollows={ $CONFIG.userFollows }
            userFollowers={ $CONFIG.userFollowers }/>,
  '#page'
);
