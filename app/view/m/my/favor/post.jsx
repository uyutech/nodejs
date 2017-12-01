/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import FavorPost from '../../../../assets/m/my/favor/post/FavorPost.jsx';

export default function(data) {
  let dataList = data.dataList;

  let favorPost = migi.preRender(
    <FavorPost dataList={ dataList }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '我收藏的图片' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mmy_favor_post.css')}"/>
</head>
<body>
<div id="page">${favorPost}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.dataList = ${data.helper.stringify(dataList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mmy_favor_post.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
