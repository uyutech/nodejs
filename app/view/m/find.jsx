/**
 * Created by army8735 on 2017/10/1.
 */

'use strict';

import Find from '../../assets/m/find/Find.jsx';

export default function(data) {
  let hotWorkList = data.hotWorkList;
  let hotAuthorList = data.hotAuthorList;
  let hotMusicAlbumList = data.hotMusicAlbumList;
  let hotPhotoAlbumList = data.hotPhotoAlbumList;
  let hotCircleList = data.hotCircleList;
  let hotPlayList = data.hotPlayList;

  let find = migi.preRender(<Find
    hotWorkList={ hotWorkList }
    hotAuthorList={ hotAuthorList }
    hotMusicAlbumList={ hotMusicAlbumList }
    hotPhotoAlbumList={ hotPhotoAlbumList }
    hotCircleList={ hotCircleList }
    hotPlayList={ hotPlayList }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({ title: '发现' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mfind.css')}"/>
</head>
<body>
<div id="page">${find}</div>
${data.helper.getMTopNav()}
${data.helper.getMTopMenu(0)}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.hotWorkList = ${data.helper.stringify(hotWorkList)};
  $CONFIG.hotAuthorList = ${data.helper.stringify(hotAuthorList)};
  $CONFIG.hotMusicAlbumList = ${data.helper.stringify(hotMusicAlbumList)};
  $CONFIG.hotPhotoAlbumList = ${data.helper.stringify(hotPhotoAlbumList)};
  $CONFIG.hotCircleList = ${data.helper.stringify(hotCircleList)};
  $CONFIG.hotPlayList = ${data.helper.stringify(hotPlayList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mfind.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
