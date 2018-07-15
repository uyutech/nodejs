/**
 * Created by army8735 on 2018/7/10.
 */

'use strict';

import Works from '../../assets/jsgm/works/Works.jsx';
import bot from '../../assets/jsgm/common/bot';

export default function(data) {
  migi.resetUid();

  let list = data.list;

  let works = migi.preRender(
    <Works list={ list }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: '今时古梦词作招募大赛' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/jcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/jsgm_works.css')}"/>
</head>
<body>
${works}
${bot}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.list = ${data.helper.stringify(list)};
</script>
<script src="${data.helper.getAssetUrl('/jcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/jsgm_works.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
