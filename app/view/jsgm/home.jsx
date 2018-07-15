/**
 * Created by army8735 on 2018/7/9.
 */

'use strict';

import Home from '../../assets/jsgm/home/Home.jsx';
import bot from '../../assets/jsgm/common/bot';

export default function(data) {
  migi.resetUid();

  let home = migi.preRender(
    <Home/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: '今时古梦词作招募大赛' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/jcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/jsgm_home.css')}"/>
</head>
<body>
${home}
${bot}
<script>
  ${data.helper.$CONFIG}
</script>
<script src="${data.helper.getAssetUrl('/jcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/jsgm_home.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
