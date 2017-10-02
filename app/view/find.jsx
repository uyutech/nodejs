/**
 * Created by army8735 on 2017/10/1.
 */

'use strict';

import TopNav from '../assets/m/component/topnav/TopNav.jsx';
import BotNav from '../assets/m/component/botnav/BotNav.jsx';
import Find from '../assets/m/find/Find.jsx';

export default function(data) {
  migi.Element.resetUid();
  let hotWorkList = data.hotWorkList;
  let hotAuthorList = data.hotAuthorList;
  let tags = data.tags;
  let playList = data.playList;

  let find = migi.preRender(<Find
    hotWorkList={ hotWorkList }
    hotAuthorList={ hotAuthorList }
    tags={ tags }
    playList={ playList }/>);
  let topNav = migi.preRender(<TopNav kw={ '' }/>);
  let botNav = migi.preRender(<BotNav/>);

  return `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <meta charset="UTF-8"/>
  <title>发现</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  <meta name="renderer" content="webkit"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
  <meta name="format-detection" content="telephone=no"/>
  <meta name="format-detection" content="email=no"/>
  <meta name="wap-font-scale" content="no"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
  <link rel="stylesheet" href="${ data.helper.getAssetUrl('/common.css') }"/>
  <link rel="stylesheet" href="${ data.helper.getAssetUrl('/find.css') }"/>
</head>
<body>
<div id="page">${ find }</div>
${ topNav }
${ botNav }
<script>
  var $CONFIG = {
    kw: '',
    hotWorkList: ${ JSON.stringify(hotWorkList) },
    hotAuthorList: ${ JSON.stringify(hotAuthorList) },
    tags: ${ JSON.stringify(tags) },
    playList: ${ JSON.stringify(playList) },
  };
</script>
<script src="${ data.helper.getAssetUrl('/common.js') }"></script>
<script src="${ data.helper.getAssetUrl('/find.js') }"></script>
</body>
</html>`;
};
