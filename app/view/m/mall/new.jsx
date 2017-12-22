/**
 * Created by army8735 on 2017/12/22.
 */

'use strict';

import New from '../../../assets/m/mall/new/New.jsx';

export default function(data) {
  let productList = data.productList;

  let n = migi.preRender(
    <New productList={ productList }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '新福利' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mmall_new.css')}"/>
</head>
<body>
<div id="page">${n}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.productList = ${data.helper.stringify(productList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mmall_new.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
