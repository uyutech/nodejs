/**
 * Created by army8735 on 2018/7/10.
 */

'use strict';

import Prize from '../../assets/jsgm/prize/Prize.jsx';
import bot from '../../assets/jsgm/common/bot';

export default function(data) {
  migi.resetUid();

  let prize = migi.preRender(
    <Prize/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: '今时古梦词作招募大赛' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/jcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/jsgm_prize.css')}"/>
</head>
<body>
${prize}
${bot}
<script>
  ${data.helper.$CONFIG}
</script>
<script src="${data.helper.getAssetUrl('/jcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/jsgm_prize.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
