/**
 * Created by army8735 on 2018/8/15.
 */

'use strict';

import Home from '../../assets/sczl/home/Home.jsx';

export default function(data) {
  migi.resetUid();

  let originWorks = data.originWorks;
  let worksList = data.worksList;

  let home = migi.preRender(
    <Home originWorks={ originWorks }
          worksList={ worksList }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: '丝绸之路' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/sczl_common.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/sczl_home.css')}"/>
</head>
<body>
${home}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.originWorks = ${data.helper.stringify(originWorks)};
  $CONFIG.worksList = ${data.helper.stringify(worksList)};
</script>
<script src="${data.helper.getAssetUrl('/sczl_common.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/sczl_home.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
