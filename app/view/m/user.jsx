/**
 * Created by army8735 on 2017/11/17.
 */

'use strict';

import User from '../../assets/m/user/User.jsx';

export default function(data) {
  let userInfo = data.userInfo;
  let userPost = data.userPost;

  let user = migi.preRender(<User userInfo={ userInfo } userPost={ userPost }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: userInfo.NickName })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/muser.css')}"/>
</head>
<body>
<div id="page">${user}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.userInfo = ${data.helper.stringify(userInfo)};
  $CONFIG.userPost = ${data.helper.stringify(userPost)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/muser.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
