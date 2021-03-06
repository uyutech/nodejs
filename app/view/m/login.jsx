/**
 * Created by army8735 on 2017/10/27.
 */

'use strict';

import Login from '../../assets/m/login/Login.jsx';

export default function(data) {
  migi.resetUid();

  let goto = data.goto;

  let login = migi.preRender(<Login goto={ goto }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '登录' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mlogin.css')}"/>
</head>
<body>
<div id="page">${login}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.goto = ${data.helper.stringify(goto)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mlogin.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
