/**
 * Created by army8735 on 2018/7/10.
 */

'use strict';

import Detail from '../../assets/jsgm/detail/Detail.jsx';
import bot from '../../assets/jsgm/common/bot';

export default function(data) {
  migi.resetUid();

  let detail = migi.preRender(
    <Detail/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: '今时古梦词作招募大赛' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/jcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/jsgm_detail.css')}"/>
</head>
<body>
${detail}
${bot}
<script>
  ${data.helper.$CONFIG}
</script>
<script src="${data.helper.getAssetUrl('/jcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/jsgm_detail.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
