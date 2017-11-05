/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

import Circle from '../../assets/d/circle/Circle.jsx';

export default function(data) {
  let isLogin = !!data.ctx.session.uid;
  let circleID = data.circleID;
  let circleDetail = data.circleDetail;
  let postList = data.postList;

  let circle = migi.preRender(<Circle circleDetail={ circleDetail } postList={ postList }/>);

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
  $CONFIG.circleID = ${JSON.stringify(circleID)};
  $CONFIG.circleDetail = ${JSON.stringify(circleDetail)};
  $CONFIG.postList = ${JSON.stringify(postList)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dcircle.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};