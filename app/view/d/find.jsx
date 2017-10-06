/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

import Find from '../../assets/d/find/Find.jsx';

export default function(data) {
  migi.Element.resetUid();
  let hotWorkList = data.hotWorkList;
  let hotAuthorList = data.hotAuthorList;
  let tags = data.tags;
  let playList = data.playList;
  let playList2 = data.playList;

  let find = migi.preRender(<Find
    hotWorkList={ hotWorkList }
    hotAuthorList={ hotAuthorList }
    tags={ tags }
    playList={ playList }
    playList2={ playList2 }/>);

  return `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <meta charset="UTF-8"/>
  <title>转圈</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  <meta name="renderer" content="webkit"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
  <meta name="format-detection" content="telephone=no"/>
  <meta name="format-detection" content="email=no"/>
  <meta name="wap-font-scale" content="no"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dfind.css')}"/>
</head>
<body>
<div id="page">${find}</div>
<div class="g-botnav">All Rights Reserved 转圈circling 浙ICP备17029501号-2</div>
<script>
  var $CONFIG = {
    hotWorkList: ${JSON.stringify(hotWorkList)},
    hotAuthorList: ${JSON.stringify(hotAuthorList)},
    tags: ${JSON.stringify(tags)},
    playList: ${JSON.stringify(playList)},
    playList2: ${JSON.stringify(playList2)},
  };
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dfind.js')}"></script>
</body>
</html>`;
};
