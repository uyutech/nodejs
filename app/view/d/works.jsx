/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

import Works from '../../assets/d/works/Works.jsx';

export default function(data) {
  let isLogin = !!data.ctx.session.uid;
  let worksID = data.worksID;
  let workID = data.workID;
  let worksDetail = data.worksDetail;
  let commentData = data.commentData;
  let labelList = data.labelList;

  let works = migi.preRender(<Works
    isLogin={ isLogin }
    worksID={ worksID }
    workID={ workID }
    worksDetail={ worksDetail }
    labelList={ labelList }
    commentData={ commentData }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: worksDetail.Title })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dworks.css')}"/>
</head>
<body>
<div id="page">${works}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.worksID = ${JSON.stringify(worksID)};
  $CONFIG.workID = ${JSON.stringify(workID)};
  $CONFIG.worksDetail = ${JSON.stringify(worksDetail)};
  $CONFIG.labelList = ${JSON.stringify(labelList)};
  $CONFIG.commentData = ${JSON.stringify(commentData)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dworks.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
