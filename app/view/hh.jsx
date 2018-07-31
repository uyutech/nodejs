/**
 * Created by army8735 on 2018/7/5.
 */

'use strict';

import Hh from '../assets/rhyme/hh/Hh.jsx';

export default function(data) {
  migi.resetUid();

  let character = data.character;
  let disabled = data.disabled;

  let hh = migi.preRender(
    <Hh character={ character }
        disabled={ disabled }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  <meta name="renderer" content="webkit"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
  <meta name="format-detection" content="telephone=no"/>
  <meta name="format-detection" content="email=no"/>
  <meta name="wap-font-scale" content="no"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
  <title>异世交响月</title>
  <link rel="icon" href="//zhuanquan.xin/img/ba2257a30816928629e0b47f9e6f7b38.png" type="image/x-icon">
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/rcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/hh.css')}"/>
</head>
<body>
<div id="page">${hh}</div>
<script>
  ${data.helper.$CONFIG}
  $CONFIG.character = ${data.helper.stringify(character)};
  $CONFIG.disabled = ${data.helper.stringify(disabled)};
</script>
<script src="${data.helper.getAssetUrl('/rcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/hh.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
