/**
 * Created by army8735 on 2017/11/11.
 */

'use strict';

import './mcpost.less';

import SubPost from './SubPost.jsx';

let subPost = migi.preExist(<SubPost circleID={ $CONFIG.circleID } circleDetail={ $CONFIG.circleDetail }
                                     placeholder={ '在' + ($CONFIG.circleDetail.TagName || '转圈') +'圈画个圈吧' }
                                     isPublic={ $CONFIG.isPublic } head={ $CONFIG.head }
                                     to={ $CONFIG.hotCircleList }/>);
