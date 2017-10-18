/**
 * Created by army8735 on 2017/10/1.
 */

'use strict';

import TopNav from '../../assets/m/component/topnav/TopNav.jsx';
import BotNav from '../../assets/m/component/botnav/BotNav.jsx';
import Find from '../../assets/m/find/Find.jsx';

export default function(data) {
  let hotWorkList = data.hotWorkList;
  let hotAuthorList = data.hotAuthorList;
  let tags = data.tags;
  let playList = data.playList;

  let find = migi.preRender(<Find
    hotWorkList={ hotWorkList }
    hotAuthorList={ hotAuthorList }
    tags={ tags }
    playList={ playList }/>);
  let topNav = migi.preRender(<TopNav/>);
  let botNav = migi.preRender(<BotNav/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMTopNav({title:'发现'})}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mfind.css')}"/>
</head>
<body>
<div id="page">${ find }</div>
${ topNav }
${ botNav }
<script>
  ${data.helper.$CONFIG}
  $CONFIG.hotWorkList = ${JSON.stringify(hotWorkList)};
  $CONFIG.hotAuthorList = ${JSON.stringify(hotAuthorList)};
  $CONFIG.tags = ${JSON.stringify(tags)};
  $CONFIG.playList = ${JSON.stringify(playList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mfind.js')}"></script>
</body>
</html>`;
};
