/**
 * Created by army8735 on 2017/10/27.
 */

'use strict';

import Login from '../../assets/m/login/Login.jsx';

export default function(data) {
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
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mlogin.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
