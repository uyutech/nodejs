/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

import Works from '../../assets/d2/works/Works.jsx';

export default function(data) {
  migi.resetUid();

  let isLogin = !!data.ctx.session.uid;
  let worksId = parseInt(data.worksId);
  let workId = data.workId;
  let worksInfo = data.worksInfo;
  let worksWorkList = data.worksWorkList;
  let worksCommentData = data.worksCommentData;

  let works = migi.preRender(
    <Works worksId={ worksId }
           workId={ workId }
           worksInfo={ worksInfo }
           worksWorkList={ worksWorkList }
           worksCommentData={ worksCommentData }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: worksInfo.worksTitle })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dworks.css')}"/>
</head>
<body>
<div id="page">${works}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.worksID = ${data.helper.stringify(worksId)};
  $CONFIG.workID = ${data.helper.stringify(workId)};
  $CONFIG.worksInfo = ${data.helper.stringify(worksInfo)};
  $CONFIG.worksWorkList = ${data.helper.stringify(worksWorkList)};
  $CONFIG.worksCommentData = ${data.helper.stringify(worksCommentData)};
</script>
${data.helper.getStat()}
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dworks2.js')}" defer="defer"></script>
</body>
</html>`;
};
