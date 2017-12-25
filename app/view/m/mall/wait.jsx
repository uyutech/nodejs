/**
 * Created by army8735 on 2017/12/22.
 */

'use strict';

import Wait from '../../../assets/m/mall/wait/Wait.jsx';

export default function(data) {
  migi.resetUid();

  let productList = data.productList;

  let wait = migi.preRender(
    <Wait productList={ productList }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '等待收货' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mmall_wait.css')}"/>
</head>
<body>
<div id="page">${wait}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.productList = ${data.helper.stringify(productList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mmall_wait.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
