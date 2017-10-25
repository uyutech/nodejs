/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

import TopNav from '../../assets/m/component/topnav/TopNav.jsx';
import BotNav from '../../assets/m/component/botnav/BotNav.jsx';
import Author from '../../assets/m/author/Author.jsx';

export default function(data) {
  let authorID = data.authorID;
  let authorDetail = data.authorDetail;
  let homeDetail = data.homeDetail;
  let tags = data.tags;
  let playList = data.playList;
  let commentData = data.commentData;

  let author = migi.preRender(<Author
    authorID={ authorID }
    authorDetail={ authorDetail }
    homeDetail={ homeDetail }
    tags={ tags }
    playList={ playList }
    commentData={ commentData }/>);
  let topNav = migi.preRender(<TopNav/>);
  let botNav = migi.preRender(<BotNav/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getMHead({title:authorDetail.AuthorName})}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mauthor.css')}"/>
</head>
<body>
<div id="page">${author}</div>
${topNav}
${botNav}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.authorID = ${JSON.stringify(authorID)};
  $CONFIG.authorDetail = ${JSON.stringify(authorDetail)};
  $CONFIG.homeDetail = ${JSON.stringify(homeDetail)};
  $CONFIG.tags = ${JSON.stringify(tags)};
  $CONFIG.playList = ${JSON.stringify(playList)};
  $CONFIG.commentData = ${JSON.stringify(commentData)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mauthor.js')}"></script>
</body>
</html>`;
};
