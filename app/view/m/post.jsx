/**
 * Created by army8735 on 2017/10/28.
 */

'use strict';

import Post from '../../assets/m/post/Post.jsx';

export default function(data) {
  migi.resetUid();

  let isLogin = !!data.ctx.session.uid;
  let id = parseInt(data.id);
  let info = data.info;
  let commentList = data.commentList;

  let post = migi.preRender(
    <Post id={ id }
          info={ info }
          commentList={ commentList }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '画圈详情' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mpost.css')}"/>
</head>
<body>
<div id="page">${post}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.id = ${data.helper.stringify(id)};
  $CONFIG.info = ${data.helper.stringify(info)};
  $CONFIG.commentList = ${data.helper.stringify(commentList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mpost.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
