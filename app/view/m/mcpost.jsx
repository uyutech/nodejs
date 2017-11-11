/**
 * Created by army8735 on 2017/11/11.
 */

'use strict';

import SubPost from '../../assets/m/circle/SubPost.jsx';

export default function(data) {
  let head = data.ctx.session.head;
  let isPublic = data.ctx.session.isPublic;
  let circleID = data.circleID;
  let circleDetail = data.circleDetail;

  let subPost = migi.preRender(<SubPost circleID={ circleID } circleDetail={ circleDetail }
                                        placeholder={ '在' + circleDetail.TagName +'圈画个圈吧' }
                                        isPublic={ isPublic } head={ head }/>);

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
  $CONFIG.circleID = ${JSON.stringify(circleID)};
  $CONFIG.circleDetail = ${JSON.stringify(circleDetail)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mcpost.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
