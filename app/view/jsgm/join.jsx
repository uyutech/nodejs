/**
 * Created by army8735 on 2018/7/10.
 */

'use strict';

import Join from '../../assets/jsgm/join/Join.jsx';
import bot from '../../assets/jsgm/common/bot';

export default function(data) {
  migi.resetUid();

  let nickname = data.nickname;

  let join = migi.preRender(
    <Join nickname={ nickname }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: '今时古梦词作招募大赛' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/jcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/jsgm_join.css')}"/>
</head>
<body>
${join}
${bot}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.nickname = ${data.helper.stringify(nickname)};
</script>
<script src="${data.helper.getAssetUrl('/jcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/jsgm_join.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
