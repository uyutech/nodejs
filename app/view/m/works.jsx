/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

import Works from '../../assets/m/works/Works.jsx';

export default function(data) {
  let isLogin = !!data.ctx.session.uid;
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
  ${data.helper.getMHead()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mworks.css')}"/>
</head>
<body>
<div id="page"><h1 class="private">此作品尚未完成公开</h1></div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
  }

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
  ${data.helper.getMHead({ title: worksDetail.Title })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mworks.css')}"/>
</head>
<body>
<div id="page">${works}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.worksID = ${JSON.stringify(worksID)};
  $CONFIG.workID = ${JSON.stringify(workID)};
  $CONFIG.worksDetail = ${JSON.stringify(worksDetail)};
  $CONFIG.labelList = ${JSON.stringify(labelList)};
  $CONFIG.commentData = ${JSON.stringify(commentData)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mworks.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
