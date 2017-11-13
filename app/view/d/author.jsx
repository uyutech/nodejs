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
  let hotCommentData = data.hotCommentData;

  let author = migi.preRender(<Author
    uid={ uid }
    authorID={ authorID }
    authorDetail={ authorDetail }
    homeDetail={ homeDetail }
    tags={ tags }
    playList={ playList }
    playList2={ playList2 }
    commentData={ commentData }
    hotCommentData={ hotCommentData }/>);

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
  $CONFIG.tags = ${data.helper.stringify(tags)};
  $CONFIG.playList = ${data.helper.stringify(playList)};
  $CONFIG.playList2 = ${data.helper.stringify(playList2)};
  $CONFIG.commentData = ${data.helper.stringify(commentData)};
  $CONFIG.hotCommentData = ${data.helper.stringify(hotCommentData)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dauthor.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
