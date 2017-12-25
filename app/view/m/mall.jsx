/**
 * Created by army8735 on 2017/12/22.
 */

'use strict';

import Mall from '../../assets/m/mall/Mall.jsx';

export default function(data) {
  migi.resetUid();

  let productList = data.productList;

  let mall = migi.preRender(
    <Mall productList={ productList }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '圈商城' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mmall.css')}"/>
</head>
<body>
<div id="page">${mall}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.productList = ${data.helper.stringify(productList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mmall.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
