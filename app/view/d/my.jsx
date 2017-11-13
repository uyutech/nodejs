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
  let lastUpdateHeadTime = data.lastUpdateHeadTime;
  if(lastUpdateHeadTime) {
    lastUpdateHeadTime = new Date(lastUpdateHeadTime);
  }
  else {
    lastUpdateHeadTime = 0;
  }
  let updateHeadTimeDiff = now - lastUpdateHeadTime;

  let my = migi.preRender(<My userInfo={ userInfo } follows={ follows } favors={ favors }
                              updateNickNameTimeDiff={ updateNickNameTimeDiff } updateHeadTimeDiff={ updateHeadTimeDiff }/>);

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
  $CONFIG.userInfo = ${data.helper.stringify(userInfo)};
  $CONFIG.follows = ${data.helper.stringify(follows)};
  $CONFIG.favors = ${data.helper.stringify(favors)};
  $CONFIG.updateNickNameTimeDiff = ${data.helper.stringify(updateNickNameTimeDiff)};
  $CONFIG.updateHeadTimeDiff = ${data.helper.stringify(updateHeadTimeDiff)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dmy.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
