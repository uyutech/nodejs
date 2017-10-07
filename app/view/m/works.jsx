/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

import TopNav from '../../assets/m/component/topnav/TopNav.jsx';
import BotNav from '../../assets/m/component/botnav/BotNav.jsx';
import Works from '../../assets/m/works/Works.jsx';

export default function(data) {
  migi.Element.resetUid();
  let worksID = data.worksID;
  let worksDetail = data.worksDetail;
  let commentData = data.commentData;

  let works = migi.preRender(<Works worksID={ worksID } worksDetail={ worksDetail } commentData={ commentData }/>);
  let topNav = migi.preRender(<TopNav/>);
  let botNav = migi.preRender(<BotNav/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMTopNav({title:worksDetail.Title})}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mworks.css')}"/>
</head>
<body>
<div id="page">${works}</div>
${topNav}
${botNav}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.worksID = ${JSON.stringify(worksID)};
  $CONFIG.worksDetail = ${JSON.stringify(worksDetail)};
  $CONFIG.commentData = ${JSON.stringify(commentData)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mworks.js')}"></script>
</body>
</html>`;
};
