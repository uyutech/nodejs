/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import './index.less';
import FavorPic from './FavorPic.jsx';

let favorPic = migi.preExist(
  <FavorPic dataList={ $CONFIG.dataList }/>,
  '#page'
);
