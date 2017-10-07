/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

import Works from '../../assets/d/works/Works.jsx';

export default function(data) {
  migi.Element.resetUid();
  let worksID = data.worksID;
  let worksDetail = data.worksDetail;
  let commentData = data.commentData;

  let works = migi.preRender(<Works
    worksID={ worksID }
    worksDetail={ worksDetail }
    commentData={ commentData }/>);

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
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dworks.css')}"/>
</head>
<body>
<div id="page">${works}</div>
<div class="cp-botnav">
  <div class="c">
    <p>Copyright © 2017 Uyutech. All Rights Reserved.<br/>呦悠科技 版权所有 浙ICP备17029501号-2</p>
    <ul class="link fn-clear">
      <li class="weibo"><a href="http://weibo.com/u/6259241863" target="_blank">新浪微博</a></li>
    </ul>
  </div>
</div>
<script>
  var $CONFIG = {
    worksID: ${JSON.stringify(worksID)},
    worksDetail: ${JSON.stringify(worksDetail)},
    commentData: ${JSON.stringify(commentData)},
  };
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dworks.js')}"></script>
</body>
</html>`;
};
