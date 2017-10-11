/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import TopNav from '../assets/d/component/topnav/TopNav.jsx';
import Activity from '../assets/activity/Activity.jsx';

export default function(data) {
  migi.Element.resetUid();
  let userInfo = data.userInfo;
  let id = data.id;
  let postData = data.postData;console.log(postData);

  let topNav = migi.preRender(<TopNav userInfo={ userInfo }/>);
  let activity = migi.preRender(<Activity postData={ postData }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDTopNav({
    title: postData.Title,
  })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon2.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/activity.css')}"/>
</head>
<body>
${topNav}
<div id="page">${ activity }</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.userInfo = ${JSON.stringify(userInfo)};
  $CONFIG.id = ${JSON.stringify(id)};
  $CONFIG.postData = ${JSON.stringify(postData)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon2.js')}"></script>
<script src="${data.helper.getAssetUrl('/activity.js')}"></script>
</body>
</html>`;
};
