/**
 * Created by army8735 on 2017/10/15.
 */

'use strict';

import Upload from '../../assets/d/upload/Upload.jsx';

export default function(data) {
  migi.Element.resetUid();
  let upload = migi.preRender(<Upload/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDTopNav()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dupload.css')}"/>
</head>
<body>
<div id="page">${upload}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dupload.js')}"></script>
</body>
</html>`;
};