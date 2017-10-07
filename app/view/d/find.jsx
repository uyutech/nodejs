/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

import Find from '../../assets/d/find/Find.jsx';

export default function(data) {
  migi.Element.resetUid();
  let hotWorkList = data.hotWorkList;
  let hotAuthorList = data.hotAuthorList;
  let tags = data.tags;
  let playList = data.playList;
  let playList2 = data.playList;

  let find = migi.preRender(<Find
    hotWorkList={ hotWorkList }
    hotAuthorList={ hotAuthorList }
    tags={ tags }
    playList={ playList }
    playList2={ playList2 }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDTopNav()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dfind.css')}"/>
</head>
<body>
<div id="page">${find}</div>
${data.helper.getDBotNav()}
<script>
  var $CONFIG = {
    hotWorkList: ${JSON.stringify(hotWorkList)},
    hotAuthorList: ${JSON.stringify(hotAuthorList)},
    tags: ${JSON.stringify(tags)},
    playList: ${JSON.stringify(playList)},
    playList2: ${JSON.stringify(playList2)},
  };
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dfind.js')}"></script>
</body>
</html>`;
};
