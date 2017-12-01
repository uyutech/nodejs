/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

import Author from '../../assets/d/author/Author.jsx';

export default function(data) {
  let uid = data.ctx.session.uid;
  let authorID = data.authorID;
  let authorDetail = data.authorDetail;
  let homeDetail = data.homeDetail;
  let album = data.album;
  let commentData = data.commentData;
  let hotPlayList = data.hotPlayList;

  let author = migi.preRender(<Author
    uid={ uid }
    authorID={ authorID }
    authorDetail={ authorDetail }
    homeDetail={ homeDetail }
    album={ album }
    commentData={ commentData }
    hotPlayList={ hotPlayList }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: authorDetail.AuthorName })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dauthor.css')}"/>
</head>
<body>
<div id="page">${author}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.authorID = ${data.helper.stringify(authorID)};
  $CONFIG.authorDetail = ${data.helper.stringify(authorDetail)};
  $CONFIG.homeDetail = ${data.helper.stringify(homeDetail)};
  $CONFIG.album = ${data.helper.stringify(album)};
  $CONFIG.commentData = ${data.helper.stringify(commentData)};
  $CONFIG.hotPlayList = ${data.helper.stringify(hotPlayList)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dauthor.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
