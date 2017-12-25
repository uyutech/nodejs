/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

import Circle from '../../assets/d/circle/Circle.jsx';

export default function(data) {
  migi.resetUid();

  let circleID = data.circleID;
  let circleDetail = data.circleDetail;
  let postList = data.postList;
  let stick = data.stick;
  let myCircleList = data.myCircleList;

  let circle = migi.preRender(
    <Circle circleDetail={ circleDetail } postList={ postList }
            stick={ stick } myCircleList={ myCircleList }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({
    title: circleDetail.TagName,
  })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcircle.css')}"/>
</head>
<body>
<div id="page">${circle}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.circleID = ${data.helper.stringify(circleID)};
  $CONFIG.circleDetail = ${data.helper.stringify(circleDetail)};
  $CONFIG.stick = ${data.helper.stringify(stick)};
  $CONFIG.postList = ${data.helper.stringify(postList)};
  $CONFIG.myCircleList = ${data.helper.stringify(myCircleList)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dcircle.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
