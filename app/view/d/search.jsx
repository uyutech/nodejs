/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

import Search from '../../assets/d/search/Search.jsx';

export default function(data) {
  let kw = data.kw;
  let datas = data.datas;

  let search = migi.preRender(<Search datas={ datas }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDTopNav()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dsearch.css')}"/>
</head>
<body>
<div id="page">${ search }</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.kw = ${JSON.stringify(kw)};
  $CONFIG.datas = ${JSON.stringify(datas)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dsearch.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
