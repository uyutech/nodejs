/**
 * Created by army8735 on 2017/10/3.
 */

'use strict';

import TopNav from '../../assets/m/component/topnav/TopNav.jsx';
import BotNav from '../../assets/m/component/botnav/BotNav.jsx';
import Author from '../../assets/m/author/Author.jsx';

export default function(data) {
  migi.Element.resetUid();
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
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <meta charset="UTF-8"/>
  <title>${authorDetail.AuthorName}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  <meta name="renderer" content="webkit"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
  <meta name="format-detection" content="telephone=no"/>
  <meta name="format-detection" content="email=no"/>
  <meta name="wap-font-scale" content="no"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mauthor.css')}"/>
</head>
<body>
<div id="page">${author}</div>
${topNav}
${botNav}
<script>
  var $CONFIG = {
    authorID: '${authorID}',
    authorDetail: ${JSON.stringify(authorDetail)},
    homeDetail: ${JSON.stringify(homeDetail)},
    tags: ${JSON.stringify(tags)},
    playList: ${JSON.stringify(playList)},
    commentData: ${JSON.stringify(commentData)},
  };
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/mauthor.js')}"></script>
</body>
</html>`;
};
