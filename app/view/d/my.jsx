/**
 * Created by army8735 on 2017/10/9.
 */

'use strict';

import My from '../../assets/d/my/My.jsx';

export default function(data) {
  migi.resetUid();

  let userInfo = data.userInfo;
  let follows = data.follows;
  let userFollows = data.userFollows;
  let userFans = data.userFans;
  let favors = data.favors;
  let myPost = data.myPost;
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
  let privateInfo = data.privateInfo;
  let coins = data.coins;

  let my = migi.preRender(<My userInfo={ userInfo } follows={ follows } favors={ favors } myPost={ myPost }
                              bonusPoint={ bonusPoint } updateNickNameTimeDiff={ updateNickNameTimeDiff }
                              updateHeadTimeDiff={ updateHeadTimeDiff } userFollows={ userFollows }
                              userFans={ userFans } privateInfo={ privateInfo } coins={ coins }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: '我的' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dmy.css')}"/>
</head>
<body>
<div id="page">${my}</div>
${data.helper.getDTopNav({ pageId: 6 })}
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.userInfo = ${data.helper.stringify(userInfo)};
  $CONFIG.follows = ${data.helper.stringify(follows)};
  $CONFIG.userFollows = ${data.helper.stringify(userFollows)};
  $CONFIG.userFans = ${data.helper.stringify(userFans)};
  $CONFIG.favors = ${data.helper.stringify(favors)};
  $CONFIG.myPost = ${data.helper.stringify(myPost)};
  $CONFIG.bonusPoint = ${data.helper.stringify(bonusPoint)};
  $CONFIG.updateNickNameTimeDiff = ${data.helper.stringify(updateNickNameTimeDiff)};
  $CONFIG.updateHeadTimeDiff = ${data.helper.stringify(updateHeadTimeDiff)};
  $CONFIG.privateInfo = ${data.helper.stringify(privateInfo)};
  $CONFIG.coins = ${data.helper.stringify(coins)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dmy.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
