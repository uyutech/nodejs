/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

import Author from '../../assets/m/author/Author.jsx';

export default function(data) {
  let isLogin = !!data.ctx.session.uid;
  let authorID = data.authorID;
  let authorDetail = data.authorDetail;
  let homeDetail = data.homeDetail;
  let tags = data.tags;
  let playList = data.playList;
  let playList2 = data.playList2;
  let commentData = data.commentData;
  let hotCommentData = data.hotCommentData;

  let author = migi.preRender(<Author
    isLogin={ isLogin }
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
  ${data.helper.getMHead({ title: authorDetail.AuthorName })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mauthor.css')}"/>
</head>
<body>
<div id="page">${author}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.authorID = ${JSON.stringify(authorID)};
  $CONFIG.authorDetail = ${JSON.stringify(authorDetail)};
  $CONFIG.homeDetail = ${JSON.stringify(homeDetail)};
  $CONFIG.tags = ${JSON.stringify(tags)};
  $CONFIG.playList = ${JSON.stringify(playList)};
  $CONFIG.playList2 = ${JSON.stringify(playList2)};
  $CONFIG.commentData = ${JSON.stringify(commentData)};
  $CONFIG.hotCommentData = ${JSON.stringify(hotCommentData)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mauthor.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
