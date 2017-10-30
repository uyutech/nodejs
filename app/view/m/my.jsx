/**
 * Created by army8735 on 2017/10/27.
 */

'use strict';

import My from '../../assets/m/my/My.jsx';

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
    lastUpdateNickNameTime = now;
  }
  let updateNickNameTimeDiff = now - lastUpdateNickNameTime;

  let my = migi.preRender(<My userInfo={ userInfo } follows={ follows } favors={ favors } updateNickNameTimeDiff={ updateNickNameTimeDiff }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '我的' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mmy.css')}"/>
</head>
<body>
<div id="page">${my}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.userInfo = ${JSON.stringify(userInfo)};
  $CONFIG.follows = ${JSON.stringify(data.follows)};
  $CONFIG.favors = ${JSON.stringify(favors)};
  $CONFIG.updateNickNameTimeDiff = ${JSON.stringify(updateNickNameTimeDiff)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mmy.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
