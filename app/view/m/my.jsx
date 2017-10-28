/**
 * Created by army8735 on 2017/10/27.
 */

'use strict';

import My from '../../assets/m/my/My.jsx';

export default function(data) {
  let my = migi.preRender(<My follows={ data.follows }/>);

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
  $CONFIG.follows = ${JSON.stringify(data.follows)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mmy.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
