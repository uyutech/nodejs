/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import Post from '../../../assets/m/my/post/Post.jsx';

export default function(data) {
  let postList = data.postList;

  let post = migi.preRender(
    <Post postList={ postList }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '我画的圈' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mmy_post.css')}"/>
</head>
<body>
<div id="page">${post}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.postList = ${data.helper.stringify(postList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mmy_post.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
