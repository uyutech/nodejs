/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

import Works from '../../assets/m/works/Works.jsx';

export default function(data) {
  let isLogin = !!data.ctx.session.uid;
  let worksID = data.worksID;
  let worksDetail = data.worksDetail;
  let commentData = data.commentData;
  let labelList = data.labelList;

  let works = migi.preRender(<Works
    isLogin={ isLogin }
    worksID={ worksID }
    worksDetail={ worksDetail }
    labelList={ labelList }
    commentData={ commentData }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({title:worksDetail.Title})}
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
