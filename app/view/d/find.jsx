/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

import Find from '../../assets/d/find/Find.jsx';

export default function(data) {
  let hotWorkList = data.hotWorkList;
  let hotAuthorList = data.hotAuthorList;
  let hotMusicAlbumList = data.hotMusicAlbumList;
  let hotPhotoAlbumList = data.hotPhotoAlbumList;
  let hotPostList = data.hotPostList;
  let tags = data.tags;
  let playList = data.playList;
  let playList2 = data.playList;

  let find = migi.preRender(<Find
    hotWorkList={ hotWorkList }
    hotAuthorList={ hotAuthorList }
    hotMusicAlbumList={ hotMusicAlbumList }
    hotPhotoAlbumList={ hotPhotoAlbumList }
    hotPostList={ hotPostList }
    tags={ tags }
    playList={ playList }
    playList2={ playList2 }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({title:'发现'})}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dfind.css')}"/>
</head>
<body>
<div id="page">${find}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.hotWorkList = ${JSON.stringify(hotWorkList)};
  $CONFIG.hotAuthorList = ${JSON.stringify(hotAuthorList)};
  $CONFIG.hotMusicAlbumList = ${JSON.stringify(hotMusicAlbumList)};
  $CONFIG.hotPhotoAlbumList = ${JSON.stringify(hotPhotoAlbumList)};
  $CONFIG.hotPostList = ${JSON.stringify(hotPostList)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dfind.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
