/**
 * Created by army8735 on 2017/10/15.
 */

'use strict';

import Upload from '../../assets/d/upload/Upload.jsx';

export default function(data) {
  let worksTypeList = data.worksTypeList;

  let upload = migi.preRender(
    <Upload worksTypeList={ worksTypeList }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: '上传' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dupload.css')}"/>
</head>
<body>
<div id="page">${upload}</div>
${data.helper.getDTopNav({ pageId: 12 })}
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.worksTypeList = ${data.helper.stringify(worksTypeList)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dupload.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
