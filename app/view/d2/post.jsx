/**
 * Created by army8735 on 2018/4/7.
 */

'use strict';

import Post from '../../assets/d2/post/Post.jsx';

export default function(data) {
  migi.resetUid();

  let isLogin = !!data.ctx.session.uid;
  let postId = parseInt(data.postId);
  let info = data.info;
  let comment = data.comment;

  let author = migi.preRender(
    <Post postId={ postId }
          info={ info }
          comment={ comment }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: '画圈' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dworks.css')}"/>
</head>
<body>
<div id="page">${author}</div>
${data.helper.getDTopNav({ pageId: 11 })}
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.postId = ${data.helper.stringify(postId)};
  $CONFIG.info = ${data.helper.stringify(info)};
  $CONFIG.comment = ${data.helper.stringify(comment)};
</script>
${data.helper.getStat()}
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dpost2.js')}" defer="defer"></script>
</body>
</html>`;
};
