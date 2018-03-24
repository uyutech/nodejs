/**
 * Created by army8735 on 2017/12/26.
 */

'use strict';

import Mall from '../../assets/d/mall/Mall.jsx';

export default function(data) {
  migi.resetUid();

  let productList = data.productList;

  let mall = migi.preRender(
    <Mall productList={ productList }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({
    title: '圈商城',
  })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dmall.css')}"/>
</head>
<body>
<div id="page">${mall}</div>
${data.helper.getDTopNav({ pageId: 5 })}
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.productList = ${data.helper.stringify(productList)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dmall.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
