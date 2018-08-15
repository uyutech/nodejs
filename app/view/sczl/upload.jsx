/**
 * Created by army8735 on 2018/8/15.
 */

'use strict';

import Upload from '../../assets/sczl/upload/Upload.jsx';

export default function(data) {
  migi.resetUid();

  let originWorks = data.originWorks;

  let home = migi.preRender(
    <Upload originWorks={ originWorks }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: '丝绸之路' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/sczl_common.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/sczl_upload.css')}"/>
</head>
<body>
${home}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.originWorks = ${data.helper.stringify(originWorks)};
</script>
<script src="${data.helper.getAssetUrl('/sczl_common.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/sczl_upload.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
