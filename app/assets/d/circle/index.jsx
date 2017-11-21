/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

import './index.less';

import Circle from './Circle.jsx';

let circle = migi.preExist(<Circle circleDetail={ $CONFIG.circleDetail } postList={ $CONFIG.postList }
                                   hotCircleList={ $CONFIG.hotCircleList }/>);
