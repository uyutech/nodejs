/**
 * Created by army8735 on 2017/12/1.
 */

'use strict';

import Relation from '../../../assets/m/my/relation/Relation.jsx';

export default function(data) {
  let tag = data.tag;
  let follows = data.follows;
  let userFriends = data.userFriends;
  let userFollows = data.userFollows;
  let userFollowers = data.userFollowers;

  let relation = migi.preRender(
    <Relation tag={ tag }
              follows={ follows }
              userFriends={ userFriends }
              userFollows={ userFollows }
              userFollowers={ userFollowers }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '圈关系' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mmy_relation.css')}"/>
</head>
<body>
<div id="page">${relation}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.tag = ${data.helper.stringify(tag)};
  $CONFIG.follows = ${data.helper.stringify(follows)};
  $CONFIG.userFriends = ${data.helper.stringify(userFriends)};
  $CONFIG.userFollows = ${data.helper.stringify(userFollows)};
  $CONFIG.userFollowers = ${data.helper.stringify(userFollowers)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mmy_relation.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
