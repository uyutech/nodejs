/**
 * Created by army8735 on 2017/10/18.
 */

'use strict';

import Collection from '../../assets/d/collection/Collection.jsx';

export default function(data) {
  let isLogin = !!data.ctx.session.uid;
  let collectionID = data.collectionID;
  let collectionDetail = data.collectionDetail;
  let commentData = data.commentData;

  let collection = migi.preRender(<Collection
    isLogin={ isLogin }
    collectionID={ collectionID }
    collectionDetail={ collectionDetail }
    commentData={ commentData }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcollection.css')}"/>
</head>
<body>
<div id="page">${collection}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.collectionID = ${JSON.stringify(collectionID)};
  $CONFIG.collectionDetail = ${JSON.stringify(collectionDetail)};
  $CONFIG.commentData = ${JSON.stringify(commentData)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dcollection.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
