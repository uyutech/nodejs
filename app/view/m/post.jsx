/**
 * Created by army8735 on 2017/10/28.
 */

'use strict';

import Post from '../../assets/m/post/Post.jsx';

export default function(data) {
  let isLogin = data.isLogin;
  let id = data.id;
  let postData = data.postData;
  let commentData = data.commentData;

  let post = migi.preRender(<Post
    isLogin={ isLogin }
    id={ id }
    postData={ postData }
    commentData={ commentData }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title:postData.Title })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mpost.css')}"/>
</head>
<body>
<div id="page">${post}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.id = ${JSON.stringify(id)};
  $CONFIG.postData = ${JSON.stringify(postData)};
  $CONFIG.commentData = ${JSON.stringify(commentData)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mpost.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
