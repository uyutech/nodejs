/**
 * Created by army8735 on 2017/10/9.
 */

'use strict';

import My from '../../assets/d/my/My.jsx';

export default function(data) {
  let userInfo = data.userInfo;
  let follows = data.follows;
  let favors = data.favors;
  let now = Date.now();
  let lastUpdateNickNameTime = data.lastUpdateNickNameTime;
  if(lastUpdateNickNameTime) {
    lastUpdateNickNameTime = new Date(lastUpdateNickNameTime);
  }
  else {
    lastUpdateNickNameTime = 0;
  }
  let updateNickNameTimeDiff = now - lastUpdateNickNameTime;

  let my = migi.preRender(<My userInfo={ userInfo } follows={ follows } favors={ favors } updateNickNameTimeDiff={ updateNickNameTimeDiff }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dmy.css')}"/>
</head>
<body>
<div id="page">${my}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.userInfo = ${JSON.stringify(userInfo)};
  $CONFIG.follows = ${JSON.stringify(follows)};
  $CONFIG.favors = ${JSON.stringify(favors)};
  $CONFIG.updateNickNameTimeDiff = ${JSON.stringify(updateNickNameTimeDiff)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dmy.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
