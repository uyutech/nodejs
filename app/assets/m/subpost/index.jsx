/**
 * Created by army8735 on 2017/12/26.
 */

'use strict';

import './index.less';

import SubPost from './SubPost.jsx';

let subPost = migi.preExist(
  <SubPost circleID={ $CONFIG.circleID } circleDetail={ $CONFIG.circleDetail }
           placeholder={ '在' + ($CONFIG.circleDetail.TagName || '转圈') +'圈画个圈吧' }
           to={ $CONFIG.myCircleList } tagList={ $CONFIG.tagList }
           activityLabel={ $CONFIG.activityLabel } tags={ $CONFIG.tags }/>
);
