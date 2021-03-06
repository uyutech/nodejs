/**
 * Created by army8735 on 2017/12/26.
 */

'use strict';

import Wait from '../../../assets/d/mall/wait/Wait.jsx';

export default function(data) {
  migi.resetUid();

  let productList = data.productList;

  let wait = migi.preRender(
    <Wait productList={ productList }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({
    title: '圈商城',
  })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dmall_wait.css')}"/>
</head>
<body>
<div id="page">${wait}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.productList = ${data.helper.stringify(productList)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dmall_wait.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
