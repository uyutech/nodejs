/**
 * Created by army8735 on 2018/3/10.
 */

'use strict';

import Home from '../../assets/m/index/Home.jsx';

export default function(data) {
  migi.resetUid();

  let home = migi.preRender(<Home/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mindex.css')}"/>
</head>
<body>
<div id="page">${home}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mindex.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
