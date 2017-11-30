/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

import Follow from '../../assets/m/follow/Follow.jsx';

export default function(data) {
  let hotCircle = data.hotCircle;
  let follows = data.follows;
  let userFollows = data.userFollows;
  let userFans = data.userFans;

  let follow = migi.preRender(<Follow hotCircle={ hotCircle } follows={ follows } userFollows={ userFollows }
                                      userFans={ userFans }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '关注' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mfollow.css')}"/>
</head>
<body>
${data.helper.getMTopMenu(2)}
<div id="page">${follow}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.hotCircle = ${data.helper.stringify(hotCircle)};
  $CONFIG.follows = ${data.helper.stringify(follows)};
  $CONFIG.userFollows = ${data.helper.stringify(userFollows)};
  $CONFIG.userFans = ${data.helper.stringify(userFans)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mfollow.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
