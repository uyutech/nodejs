/**
 * Created by army8735 on 2018/4/23.
 */

'use strict';

import Works from '../../assets/m2/works/Works.jsx';

export default function(data) {
  migi.resetUid();

  let isLogin = !!data.ctx.session.uid;
  let worksId = parseInt(data.worksId);
  let workId = data.workId;
  let info = data.info;
  let collection = data.collection;
  let commentList = data.commentList;

  let works = migi.preRender(
    <Works worksId={ worksId }
           workId={ workId }
           info={ info }
           collection={ collection }
           commentList={ commentList }/>);
  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: info.title })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mworks2.css')}"/>
</head>
<body>
<div id="page">${works}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.worksId = ${data.helper.stringify(worksId)};
  $CONFIG.workId = ${data.helper.stringify(workId)};
  $CONFIG.info = ${data.helper.stringify(info)};
  $CONFIG.collection = ${data.helper.stringify(collection)};
  $CONFIG.commentList = ${data.helper.stringify(commentList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mworks2.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
