/**
 * Created by army8735 on 2018/7/14.
 */

'use strict';

import Single from '../../assets/jsgm/single/Single.jsx';
import bot from '../../assets/jsgm/common/bot';

export default function(data) {
  migi.resetUid();

  let works = data.works;
  let isOwn = data.uid === works.userId;

  let single = migi.preRender(
    <Single works={ works }
            isOwn={ isOwn }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: '今时古梦词作招募大赛' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/jcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/jsgm_single.css')}"/>
</head>
<body>
${single}
${bot}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.works = ${data.helper.stringify(works)};
  $CONFIG.isOwn = ${data.helper.stringify(isOwn)};
  $CONFIG.uid = ${data.helper.stringify(data.uid)};
</script>
<script src="${data.helper.getAssetUrl('/jcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/jsgm_single.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
