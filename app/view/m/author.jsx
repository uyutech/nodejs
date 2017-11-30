/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

import Author from '../../assets/m/author/Author.jsx';

export default function(data) {
  let isLogin = !!data.ctx.session.uid;
  let authorID = data.authorID;
  let tag = data.tag;
  let authorDetail = data.authorDetail;
  let homeDetail = data.homeDetail;
  let album = data.album;
  let tags = data.tags;
  let playList = data.playList;
  let playList2 = data.playList2;
  let commentData = data.commentData;
  let hotCommentData = data.hotCommentData;

  let author = migi.preRender(<Author
    isLogin={ isLogin }
    authorID={ authorID }
    tag={ tag }
    authorDetail={ authorDetail }
    homeDetail={ homeDetail }
    album={ album }
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
  $CONFIG.authorID = ${data.helper.stringify(authorID)};
  $CONFIG.tag = ${data.helper.stringify(tag)};
  $CONFIG.authorDetail = ${data.helper.stringify(authorDetail)};
  $CONFIG.homeDetail = ${data.helper.stringify(homeDetail)};
  $CONFIG.album = ${data.helper.stringify(album)};
  $CONFIG.tags = ${data.helper.stringify(tags)};
  $CONFIG.playList = ${data.helper.stringify(playList)};
  $CONFIG.playList2 = ${data.helper.stringify(playList2)};
  $CONFIG.commentData = ${data.helper.stringify(commentData)};
  $CONFIG.hotCommentData = ${data.helper.stringify(hotCommentData)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mauthor.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
