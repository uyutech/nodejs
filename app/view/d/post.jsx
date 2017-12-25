/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import Post from '../../assets/d/post/Post.jsx';

export default function(data) {
  migi.resetUid();

  let isLogin = !!data.ctx.session.uid;
  let id = data.id;
  let postData = data.postData;
  let replyData = data.replyData;

  let post = migi.preRender(<Post
    isLogin={ isLogin }
    id={ id }
    postData={ postData }
    replyData={ replyData }/>);

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
  $CONFIG.id = ${data.helper.stringify(id)};
  $CONFIG.postData = ${data.helper.stringify(postData)};
  $CONFIG.replyData = ${data.helper.stringify(replyData)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dpost.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
