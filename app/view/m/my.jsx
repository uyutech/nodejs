/**
 * Created by army8735 on 2017/10/27.
 */

'use strict';

import My from '../../assets/m/my/My.jsx';

export default function(data) {
  let userInfo = data.userInfo;
  let bonusPoint = data.bonusPoint;
  let now = Date.now();
  let lastUpdateNickNameTime = data.lastUpdateNickNameTime;
  if(lastUpdateNickNameTime) {
    lastUpdateNickNameTime = new Date(lastUpdateNickNameTime);
  }
  else {
    lastUpdateNickNameTime = 0;
  }
  let updateNickNameTimeDiff = now - lastUpdateNickNameTime;
  let lastUpdateHeadTime = data.lastUpdateHeadTime;
  if(lastUpdateHeadTime) {
    lastUpdateHeadTime = new Date(lastUpdateHeadTime);
  }
  else {
    lastUpdateHeadTime = 0;
  }
  let updateHeadTimeDiff = now - lastUpdateHeadTime;

  let my = migi.preRender(<My userInfo={ userInfo } bonusPoint={ bonusPoint }
                              updateNickNameTimeDiff={ updateNickNameTimeDiff }
                              updateHeadTimeDiff={ updateHeadTimeDiff }/>);

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
  $CONFIG.userInfo = ${data.helper.stringify(userInfo)};
  $CONFIG.follows = ${data.helper.stringify(data.follows)};
  $CONFIG.bonusPoint = ${data.helper.stringify(bonusPoint)};
  $CONFIG.updateNickNameTimeDiff = ${data.helper.stringify(updateNickNameTimeDiff)};
  $CONFIG.updateHeadTimeDiff = ${data.helper.stringify(updateHeadTimeDiff)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mmy.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
