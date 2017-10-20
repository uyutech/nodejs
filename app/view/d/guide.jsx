/**
 * Created by army8735 on 2017/10/20.
 */

'use strict';

import Guide from '../../assets/d/guide/Guide.jsx';

export default function(data) {
  let guide = migi.preRender(<Guide/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDTopNav()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dguide.css')}"/>
</head>
<body>
<div id="page">${ guide }</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dguide.js')}"></script>
</body>
</html>`;
};
