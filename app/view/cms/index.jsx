/**
 * Created by army8735 on 2018/5/20.
 */

'use strict';

import Home from '../../assets/cms/index/Home.jsx';

export default function(data) {
  migi.resetUid();

  let home = migi.preRender(<Home/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/cindex.css')}"/>
</head>
<body>
${home}
${data.helper.getDTopNav({ pageId: 0 })}
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/cindex.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
