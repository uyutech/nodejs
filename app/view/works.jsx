/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

import TopNav from '../assets/m/component/topnav/TopNav.jsx';
import BotNav from '../assets/m/component/botnav/BotNav.jsx';
import Works from '../assets/m/works/Works.jsx';

export default function(data) {
  migi.Element.resetUid();
  let id = data.id;
  let worksDetail = data.worksDetail;
  let commentData = data.commentData;

  let works = migi.preRender(<Works id={ id } worksDetail={ worksDetail } commentData={ commentData }/>);
  let topNav = migi.preRender(<TopNav/>);
  let botNav = migi.preRender(<BotNav/>);

  return `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <meta charset="UTF-8"/>
  <title>${worksDetail.Title}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  <meta name="renderer" content="webkit"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
  <meta name="format-detection" content="telephone=no"/>
  <meta name="format-detection" content="email=no"/>
  <meta name="wap-font-scale" content="no"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/common.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/works.css')}"/>
</head>
<body>
<div id="page">${works}</div>
${topNav}
${botNav}
<script>
  var $CONFIG = {
    id: '${id}',
    worksDetail: ${JSON.stringify(worksDetail)},
    commentData: ${JSON.stringify(commentData)},
  };
</script>
<script src="${data.helper.getAssetUrl('/common.js')}"></script>
<script src="${data.helper.getAssetUrl('/works.js')}"></script>
</body>
</html>`;
};
