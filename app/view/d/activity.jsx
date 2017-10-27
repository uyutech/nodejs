/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import Activity from '../../assets/d/activity/Activity.jsx';

export default function(data) {
  migi.Element.resetUid();
  let isLogin = data.isLogin;
  let id = data.id;
  let postData = data.postData;
  let commentData = data.commentData;

  let activity = migi.preRender(<Activity
    isLogin={ isLogin }
    id={ id }
    postData={ postData }
    commentData={ commentData }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({
    title: postData.Title,
  })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dactivity.css')}"/>
</head>
<body>
<div id="page">${ activity }</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.id = ${JSON.stringify(id)};
  $CONFIG.postData = ${JSON.stringify(postData)};
  $CONFIG.commentData = ${JSON.stringify(commentData)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dactivity.js')}"></script>
</body>
</html>`;
};
