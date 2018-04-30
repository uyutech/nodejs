/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

import Works from '../../assets/d/works/Works.jsx';

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
  ${data.helper.getDHead({ title: info.title })}
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
  $CONFIG.info = ${data.helper.stringify(info)};
  $CONFIG.collection = ${data.helper.stringify(collection)};
  $CONFIG.commentList = ${data.helper.stringify(commentList)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dworks.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
