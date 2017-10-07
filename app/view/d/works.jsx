/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

import Works from '../../assets/d/works/Works.jsx';

export default function(data) {
  migi.Element.resetUid();
  let worksID = data.worksID;
  let worksDetail = data.worksDetail;
  let commentData = data.commentData;

  let works = migi.preRender(<Works
    worksID={ worksID }
    worksDetail={ worksDetail }
    commentData={ commentData }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDTopNav()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dworks.css')}"/>
</head>
<body>
<div id="page">${works}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.worksID = ${JSON.stringify(worksID)};
  $CONFIG.worksDetail = ${JSON.stringify(worksDetail)};
  $CONFIG.commentData = ${JSON.stringify(commentData)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dworks.js')}"></script>
</body>
</html>`;
};
