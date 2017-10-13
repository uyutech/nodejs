/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import TopNav from '../assets/d/component/topnav/TopNav.jsx';
import Activity from '../assets/activity/Activity.jsx';

export default function(data) {
  migi.Element.resetUid();
  let userInfo = data.userInfo;
  let isLogin = data.isLogin;
  let id = data.id;
  let postData = data.postData;
  let commentData = data.commentData;
  let list = data.list;

  let topNav = migi.preRender(<TopNav userInfo={ userInfo }/>);
  let activity = migi.preRender(<Activity
    isLogin={ isLogin }
    id={ id }
    postData={ postData }
    commentData={ commentData }/>);

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
  $CONFIG.isLogin = ${JSON.stringify(isLogin)};
  $CONFIG.id = ${JSON.stringify(id)};
  $CONFIG.postData = ${JSON.stringify(postData)};
  $CONFIG.commentData = ${JSON.stringify(commentData)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon2.js')}"></script>
<script src="${data.helper.getAssetUrl('/activity.js')}"></script>
</body>
</html>`;
};
