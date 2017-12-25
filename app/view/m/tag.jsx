/**
 * Created by army8735 on 2017/12/24.
 */

'use strict';

import Tag from '../../assets/m/tag/Tag.jsx';

export default function(data) {
  migi.resetUid();

  let tag = data.tag;
  let postList = data.postList;

  let t = migi.preRender(
    <Tag tag={ tag } postList={ postList }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '话题-' + tag })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mtag.css')}"/>
</head>
<body>
<div id="page">${t}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.tag = ${data.helper.stringify(tag)};
  $CONFIG.postList = ${data.helper.stringify(postList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mtag.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
