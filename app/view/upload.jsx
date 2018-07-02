/**
 * Created by army8735 on 2018/6/30.
 */

'use strict';

import Upload from '../assets/rhyme/upload/Upload.jsx';

export default function(data) {
  migi.resetUid();

  let info = data.info;
  let originWorks = data.originWorks;

  let upload = migi.preRender(
    <Upload info={ info }
            originWorks={ originWorks }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: '上传' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/ysjxy_upload.css')}"/>
</head>
<body>
<div id="page">${upload}</div>
<script>
  ${data.helper.$CONFIG}
  $CONFIG.info = ${data.helper.stringify(info)};
  $CONFIG.originWorks = ${data.helper.stringify(originWorks)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/ysjxy_upload.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
