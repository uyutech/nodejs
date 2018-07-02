/**
 * Created by army8735 on 2018/6/30.
 */

'use strict';

import Home from '../assets/rhyme/ysjxy/Home.jsx';

export default function(data) {
  migi.resetUid();

  let info = data.info;
  let originWorks = data.originWorks;

  let home = migi.preRender(
    <Home info={ info }
          originWorks={ originWorks }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: info.title })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/ysjxy.css')}"/>
</head>
<body>
${home}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.info = ${data.helper.stringify(info)};
  $CONFIG.originWorks = ${data.helper.stringify(originWorks)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/ysjxy.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
