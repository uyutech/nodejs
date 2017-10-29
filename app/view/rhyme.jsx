/**
 * Created by army8735 on 2017/10/16.
 */

'use strict';

export default function(data) {
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
  <title>异世谣</title>
  <link rel="icon" href="//zhuanquan.xin/img/ba2257a30816928629e0b47f9e6f7b38.png" type="image/x-icon">
  <link rel="stylesheet" href="/public/rcommon.css?1"/>
  <link rel="stylesheet" href="/public/rsingle.css?1"/>
</head>
<body>
<script>
  var IS_LOGIN = ${JSON.stringify(data.isLogin)};
  var uid = ${JSON.stringify(data.uid)};
  var LOGIN_URL = 'https://api.weibo.com/oauth2/authorize?client_id=${data.helper.rhymeAppKey}&redirect_uri=${data.helper.rhymeRedirect}';
  var FOLLOW = ${JSON.stringify(data.follows)};
  var FOLLOW_HETU = '0';
  var FOLLOW_SIXIA = '0';
  var FOLLOW_MUHAN = '0';
  var FOLLOW_MI = '0';
  var FOLLOW_JIEMENG = '0';
  var HETU_ID = '2017000000000001';
  var SIXIA_ID = '2017000000000004';
  var MUHAN_ID = '2017000000000007';
  var MI_ID = '2017000000000012';
  var JIEMENG_ID = '2017000000000002';
</script>
<div id="page" class="page"></div>
<script src="/public/rcommon.js?1"></script>
<script src="/public/rsingle.js?1"></script>
</body>
</html>`;
};
