/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import Post from '../../assets/d/post/Post.jsx';

export default function(data) {
  migi.resetUid();

  let isLogin = !!data.ctx.session.uid;
  let id = parseInt(data.id);
  let info = data.info;
  let commentList = data.commentList;

  let author = migi.preRender(
    <Post id={ id }
          info={ info }
          commentList={ commentList }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: '画圈详情' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dpost.css')}"/>
</head>
<body>
<div id="page">${author}</div>
${data.helper.getDTopNav({ pageId: 11 })}
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.id = ${data.helper.stringify(id)};
  $CONFIG.info = ${data.helper.stringify(info)};
  $CONFIG.commentList = ${data.helper.stringify(commentList)};
</script>
${data.helper.getStat()}
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dpost.js')}" defer="defer"></script>
</body>
</html>`;
};
