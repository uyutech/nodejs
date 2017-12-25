/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

import Circling from '../../assets/d/circling/Circling.jsx';

export default function(data) {
  migi.resetUid();

  let myCircleList = data.myCircleList;
  let postList = data.postList;

  let circling = migi.preRender(<Circling myCircleList={ myCircleList } postList={ postList }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({
    title: '转圈',
  })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcircling.css')}"/>
</head>
<body>
<div id="page">${circling}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.myCircleList = ${data.helper.stringify(myCircleList)};
  $CONFIG.postList = ${data.helper.stringify(postList)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dcircling.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
