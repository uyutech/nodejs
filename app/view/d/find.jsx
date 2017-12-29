/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

import Find from '../../assets/d/find/Find.jsx';

export default function(data) {
  migi.resetUid();

  let hotWorkList = data.hotWorkList;
  let hotAuthorList = data.hotAuthorList;
  let hotMusicAlbumList = data.hotMusicAlbumList;
  let hotPhotoAlbumList = data.hotPhotoAlbumList;
  let hotCircleList = data.hotCircleList;
  let hotPostList = data.hotPostList;
  let hotPlayList = data.hotPlayList;
  let banner = data.banner;
  let myCircleList = data.myCircleList;
  let activityLabel = data.activityLabel;
  let tags = data.tags;

  let find = migi.preRender(<Find
    hotWorkList={ hotWorkList }
    hotAuthorList={ hotAuthorList }
    hotMusicAlbumList={ hotMusicAlbumList }
    hotPhotoAlbumList={ hotPhotoAlbumList }
    hotCircleList={ hotCircleList }
    hotPostList={ hotPostList }
    hotPlayList={ hotPlayList }
    banner={ banner }
    myCircleList={ myCircleList }
    activityLabel={ activityLabel }
    tags={ tags }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: '发现' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dfind.css')}"/>
</head>
<body>
<div id="page">${find}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.hotWorkList = ${data.helper.stringify(hotWorkList)};
  $CONFIG.hotAuthorList = ${data.helper.stringify(hotAuthorList)};
  $CONFIG.hotMusicAlbumList = ${data.helper.stringify(hotMusicAlbumList)};
  $CONFIG.hotPhotoAlbumList = ${data.helper.stringify(hotPhotoAlbumList)};
  $CONFIG.hotCircleList = ${data.helper.stringify(hotCircleList)};
  $CONFIG.hotPostList = ${data.helper.stringify(hotPostList)};
  $CONFIG.hotPlayList = ${data.helper.stringify(hotPlayList)};
  $CONFIG.banner = ${data.helper.stringify(banner)};
  $CONFIG.myCircleList = ${data.helper.stringify(myCircleList)};
  $CONFIG.activityLabel = ${data.helper.stringify(activityLabel)};
  $CONFIG.tags = ${data.helper.stringify(tags)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dfind.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
