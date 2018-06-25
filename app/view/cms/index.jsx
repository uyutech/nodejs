/**
 * Created by army8735 on 2018/5/20.
 */

'use strict';

import Home from '../../assets/cms/index/Home.jsx';

export default function(data) {
  migi.resetUid();

  let worksNum = data.worksNum;
  let worksLimit = data.worksLimit;
  let postNum = data.postNum;
  let postLimit = data.postLimit;
  let circlingTypeIsAllPost = data.circlingTypeIsAllPost;

  let home = migi.preRender(
    <Home worksNum={ worksNum }
          worksLimit={ worksLimit }
          postNum={ postNum }
          postLimit={ postLimit }
          circlingTypeIsAllPost={ circlingTypeIsAllPost }/>
  );

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/cindex.css')}"/>
</head>
<body>
${home}
${data.helper.getDTopNav({ pageId: 0 })}
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.worksNum = ${data.helper.stringify(worksNum)};
  $CONFIG.worksLimit = ${data.helper.stringify(worksLimit)};
  $CONFIG.postNum = ${data.helper.stringify(postNum)};
  $CONFIG.postLimit = ${data.helper.stringify(postLimit)};
  $CONFIG.circlingTypeIsAllPost = ${data.helper.stringify(circlingTypeIsAllPost)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/cindex.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
