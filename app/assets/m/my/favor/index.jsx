/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import './index.less';
import Favor from './Favor.jsx';

let favor = migi.preExist(
  <Favor dataList={ $CONFIG.dataList }/>,
  '#page'
);
