/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

import SubCmt from '../../assets/m/subcomment/SubCmt.jsx';

export default function(data) {
  let id = data.id;
  let type = data.type;
  let cid = data.cid;
  let rid = data.rid;

  let subCmt = migi.preRender(<SubCmt id={ id } type={ type } cid={ cid } rid={ rid }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '评论' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/msubcomment.css')}"/>
</head>
<body>
<div id="page">${subCmt}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.id = ${data.helper.stringify(id)};
  $CONFIG.type = ${data.helper.stringify(type)};
  $CONFIG.cid = ${data.helper.stringify(cid)};
  $CONFIG.rid = ${data.helper.stringify(rid)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/msubcomment.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
