/**
 * Created by army8735 on 2017/10/9.
 */

'use strict';

import My from '../../assets/d/my/My.jsx';

export default function(data) {
  let userInfo = data.userInfo;
  let follows = data.follows;
  let favors = data.favors;

  let my = migi.preRender(<My userInfo={ userInfo } follows={ follows } favors={ favors }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDTopNav()}
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
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dmy.js')}"></script>
</body>
</html>`;
};
