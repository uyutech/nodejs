/**
 * Created by army8735 on 2017/10/10.
 */

'use strict';

import Login from '../../assets/d/login/Login.jsx';

export default function(data) {
  let login = migi.preRender(<Login/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dlogin.css')}"/>
</head>
<body>
<div id="page">${login}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dlogin.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
