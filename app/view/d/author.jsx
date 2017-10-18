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
  let tags = data.tags;
  let playList = data.playList;
  let playList2 = data.playList2;
  let commentData = data.commentData;

  let author = migi.preRender(<Author
    uid={ uid }
    authorID={ authorID }
    authorDetail={ authorDetail }
    homeDetail={ homeDetail }
    tags={ tags }
    playList={ playList }
    playList2={ playList2 }
    commentData={ commentData }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDTopNav()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dauthor.css')}"/>
</head>
<body>
<div id="page">${author}</div>
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.authorID = ${JSON.stringify(authorID)};
  $CONFIG.authorDetail = ${JSON.stringify(authorDetail)};
  $CONFIG.homeDetail = ${JSON.stringify(homeDetail)};
  $CONFIG.tags = ${JSON.stringify(tags)};
  $CONFIG.playList = ${JSON.stringify(playList)};
  $CONFIG.playList2 = ${JSON.stringify(playList2)};
  $CONFIG.commentData = ${JSON.stringify(commentData)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dauthor.js')}"></script>
</body>
</html>`;
};
