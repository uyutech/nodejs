/**
 * Created by army8735 on 2017/10/4.
 */

'use strict';

import TopNav from '../../assets/m/component/topnav/TopNav.jsx';
import BotNav from '../../assets/m/component/botnav/BotNav.jsx';
import Search from '../../assets/m/search/Search.jsx';

export default function(data) {
  migi.resetUid();

  let kw = data.kw;
  let datas = data.datas;

  let search = migi.preRender(<Search kw={ kw } datas={ datas }/>);
  let topNav = migi.preRender(<TopNav kw={ kw }/>);
  let botNav = migi.preRender(<BotNav/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({title:kw})}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/msearch.css')}"/>
</head>
<body>
<div id="page">${ search }</div>
${ topNav }
${ botNav }
<script>
  ${data.helper.$CONFIG}
  $CONFIG.kw = ${JSON.stringify(kw)};
  $CONFIG.datas = ${JSON.stringify(datas)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/msearch.js')}" defer="defer"></script>
</body>
</html>`;
};
