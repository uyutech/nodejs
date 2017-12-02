/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import FavorPic from '../../../../assets/m/my/favor/pic/FavorPic.jsx';

export default function(data) {
  let dataList = data.dataList;

  let favorPic = migi.preRender(
    <FavorPic dataList={ dataList }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '我收藏的图片' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mmy_favor_pic.css')}"/>
</head>
<body>
<div id="page">${favorPic}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.dataList = ${data.helper.stringify(dataList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mmy_favor_pic.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
