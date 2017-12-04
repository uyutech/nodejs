/**
 * Created by army8735 on 2017/12/4.
 */

'use strict';

import Private from '../../../assets/m/my/private/Private.jsx';

export default function(data) {
  let privateInfo = data.privateInfo;

  let pri = migi.preRender(
    <Private privateInfo={ privateInfo }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '收货信息' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mmy_private.css')}"/>
</head>
<body>
<div id="page">${pri}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.privateInfo = ${data.helper.stringify(privateInfo)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mmy_private.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
