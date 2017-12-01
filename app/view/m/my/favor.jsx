/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import Favor from '../../../assets/m/my/favor/Favor.jsx';

export default function(data) {
  let dataList = data.dataList;

  let favor = migi.preRender(
    <Favor dataList={ dataList }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '我收藏的音乐' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mmy_favor.css')}"/>
</head>
<body>
<div id="page">${favor}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.dataList = ${data.helper.stringify(dataList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mmy_favor.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
