/**
 * Created by army8735 on 2018/6/29.
 */

'use strict';

import Home from '../assets/rhyme/ysjxy/Home.jsx';

export default function(data) {
  migi.resetUid();

  let info = data.info;
  let originWorks = data.originWorks;
  let fcList = data.fcList;
  let hhList = data.hhList;
  let fcPrize = data.fcPrize;
  let hhPrize = data.hhPrize;
  let fcPopular = data.fcPopular;
  let hhPopular = data.hhPopular;

  let home = migi.preRender(
    <Home info={ info }
          originWorks={ originWorks }
          fcList={ fcList }
          hhList={ hhList }
          fcPrize={ fcPrize }
          hhPrize={ hhPrize }
          fcPopular={ fcPopular }
          hhPopular={ hhPopular }/>
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
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/ysjxy.css')}"/>
</head>
<body>
${home}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.info = ${data.helper.stringify(info)};
  $CONFIG.originWorks = ${data.helper.stringify(originWorks)};
  $CONFIG.fcList = ${data.helper.stringify(fcList)};
  $CONFIG.hhList = ${data.helper.stringify(hhList)};
  $CONFIG.fcPrize = ${data.helper.stringify(fcPrize)};
  $CONFIG.hhPrize = ${data.helper.stringify(hhPrize)};
  $CONFIG.fcPopular = ${data.helper.stringify(fcPopular)};
  $CONFIG.hhPopular = ${data.helper.stringify(hhPopular)};
</script>
<script src="${data.helper.getAssetUrl('/rcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/ysjxy.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
