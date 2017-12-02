/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

import TopNav from '../../assets/d/component/topnav/TopNav.jsx';

export default function(data) {
  let isLogin = !!data.ctx.session.uid;
  let isAuthor = !!data.ctx.session.authorID;
  let userInfo = data.userInfo;
  let authorInfo = data.authorInfo;
  let messages = data.messages;

  let topNav = migi.preRender(<TopNav userInfo={ userInfo }
                                      isLogin={ isLogin } isAuthor={ isAuthor }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dindex.css')}"/>
</head>
<body>
${topNav}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.userInfo = ${data.helper.stringify(userInfo)};
  $CONFIG.authorInfo = ${data.helper.stringify(authorInfo)};
  $CONFIG.messages = ${data.helper.stringify(messages)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dindex.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
