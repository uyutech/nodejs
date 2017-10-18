/**
 * Created by army8735 on 2017/10/18.
 */

'use strict';

import Collection from '../../assets/d/collection/Collection.jsx';

export default function(data) {
  let collection = migi.preRender(<Collection/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDTopNav()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcollection.css')}"/>
</head>
<body>
<div id="page">${collection}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dcollection.js')}"></script>
</body>
</html>`;
};
