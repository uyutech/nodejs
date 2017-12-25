/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

import Circling from '../../assets/m/circling/Circling.jsx';

export default function(data) {
  migi.resetUid();

  let hotCircle = data.hotCircle;
  let postList = data.postList;

  let circling = migi.preRender(<Circling hotCircle={ hotCircle } postList={ postList }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '转圈' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcircling.css')}"/>
</head>
<body>
${data.helper.getMTopMenu(1)}
<div id="page">${circling}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.hotCircle = ${data.helper.stringify(hotCircle)};
  $CONFIG.postList = ${data.helper.stringify(postList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mcircling.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
