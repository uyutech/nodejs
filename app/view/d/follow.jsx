/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

import Follow from '../../assets/d/follow/Follow.jsx';

export default function(data) {
  let hotCircle = data.hotCircle;
  let follows = data.follows;
  let userFollows = data.userFollows;
  let userFans = data.userFans;
  let postList = data.postList;

  let follow = migi.preRender(<Follow hotCircle={ hotCircle } follows={ follows } userFollows={ userFollows }
                                      userFans={ userFans } postList={ postList }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({
    title: '关注',
  })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dfollow.css')}"/>
</head>
<body>
<div id="page">${follow}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.hotCircle = ${data.helper.stringify(hotCircle)};
  $CONFIG.follows = ${data.helper.stringify(follows)};
  $CONFIG.userFollows = ${data.helper.stringify(userFollows)};
  $CONFIG.userFans = ${data.helper.stringify(userFans)};
  $CONFIG.postList = ${data.helper.stringify(postList)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dfollow.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
