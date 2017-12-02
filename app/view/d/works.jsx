/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

import Works from '../../assets/d/works/Works.jsx';

export default function(data) {
  let isLogin = !!data.ctx.session.uid;
  let authorID = data.ctx.session.authorID;
  let worksID = data.worksID;
  let workID = data.workID;
  let worksDetail = data.worksDetail;
  let commentData = data.commentData;
  let labelList = data.labelList;

  // 完成公开1，未完成公开2，未完成保密3
  if(worksDetail.WorkState === 3) {
    return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dworks.css')}"/>
</head>
<body>
<div id="page"><h1 class="private">此作品尚未完成公开</h1></div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
  }

  let works = migi.preRender(<Works
    isLogin={ isLogin }
    authorID={ authorID }
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
  $CONFIG.worksID = ${data.helper.stringify(worksID)};
  $CONFIG.workID = ${data.helper.stringify(workID)};
  $CONFIG.worksDetail = ${data.helper.stringify(worksDetail)};
  $CONFIG.labelList = ${data.helper.stringify(labelList)};
  $CONFIG.commentData = ${data.helper.stringify(commentData)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dworks.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
