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
  let worksChildren = data.worksChildren;
  let worksComment = data.worksComment;

  let works = migi.preRender(
    <Works worksId={ worksId }
           workId={ workId }
           worksInfo={ worksInfo }
           worksChildren={ worksChildren }
           worksComment={ worksComment }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: worksInfo.worksTitle })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dworks.css')}"/>
</head>
<body>
<div id="page">${works}</div>
${data.helper.getDTopNav({ pageId: 1 })}
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.worksId = ${data.helper.stringify(worksId)};
  $CONFIG.workId = ${data.helper.stringify(workId)};
  $CONFIG.worksInfo = ${data.helper.stringify(worksInfo)};
  $CONFIG.worksChildren = ${data.helper.stringify(worksChildren)};
  $CONFIG.worksComment = ${data.helper.stringify(worksComment)};
</script>
${data.helper.getStat()}
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dworks2.js')}" defer="defer"></script>
</body>
</html>`;
};
