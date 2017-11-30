/**
 * Created by army8735 on 2017/11/11.
 */

'use strict';

import SubPost from '../../assets/m/circle/SubPost.jsx';

export default function(data) {
  let isPublic = data.ctx.session.isPublic;
  let circleID = data.circleID;
  let circleDetail = data.circleDetail;
  let hotCircleList = data.hotCircleList;

  let subPost = migi.preRender(<SubPost circleID={ circleID } circleDetail={ circleDetail }
                                        placeholder={ '在' + (circleDetail.TagName || '转圈') +'圈画个圈吧' }
                                        isPublic={ isPublic } to={ hotCircleList }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '发新帖子' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcpost.css')}"/>
</head>
<body>
<div id="page">${subPost}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.circleID = ${data.helper.stringify(circleID)};
  $CONFIG.circleDetail = ${data.helper.stringify(circleDetail)};
  $CONFIG.hotCircleList = ${data.helper.stringify(hotCircleList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mcpost.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
