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
  let commentData = data.commentData;
  let hotPlayList = data.hotPlayList;
  let hotPicList = data.hotPicList;

  let author = migi.preRender(<Author
    isLogin={ isLogin }
    authorID={ authorID }
    tag={ tag }
    authorDetail={ authorDetail }
    homeDetail={ homeDetail }
    album={ album }
    commentData={ commentData }
    hotPlayList={ hotPlayList }
    hotPicList={ hotPicList }/>);

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
  $CONFIG.commentData = ${data.helper.stringify(commentData)};
  $CONFIG.hotPlayList = ${data.helper.stringify(hotPlayList)};
  $CONFIG.hotPicList = ${data.helper.stringify(hotPicList)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mauthor.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
