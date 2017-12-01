/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import './index.less';
import FavorPost from './FavorPost.jsx';

let favorPost = migi.preExist(
  <FavorPost dataList={ $CONFIG.dataList }/>,
  '#page'
);
