/**
 * Created by army8735 on 2017/12/22.
 */

'use strict';

import History from '../../../assets/m/mall/history/History.jsx';

export default function(data) {
  migi.resetUid();

  let productList = data.productList;

  let history = migi.preRender(
    <History/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '过往福利' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mmall_history.css')}"/>
</head>
<body>
<div id="page">${history}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.productList = ${data.helper.stringify(productList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mmall_history.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
