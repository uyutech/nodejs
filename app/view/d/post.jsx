/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import Post from '../../assets/d/post/Post.jsx';

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
  ${data.helper.getDHead({
    title: postData.Title,
  })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dpost.css')}"/>
</head>
<body>
<div id="page">${post}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.id = ${JSON.stringify(id)};
  $CONFIG.postData = ${JSON.stringify(postData)};
  $CONFIG.commentData = ${JSON.stringify(commentData)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dpost.js')}"></script>
</body>
</html>`;
};
