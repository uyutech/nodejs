/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

import Author from '../../assets/d/author/Author.jsx';

export default function(data) {
  migi.Element.resetUid();
  let authorID = data.authorID;
  let authorDetail = data.authorDetail;
  let homeDetail = data.homeDetail;
  let tags = data.tags;
  let playList = data.playList;
  let playList2 = data.playList2;
  let commentData = data.commentData;

  let author = migi.preRender(<Author
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
  var $CONFIG = {
    authorID: ${JSON.stringify(authorID)},
    authorDetail: ${JSON.stringify(authorDetail)},
    homeDetail: ${JSON.stringify(homeDetail)},
    tags: ${JSON.stringify(tags)},
    playList: ${JSON.stringify(playList)},
    playList2: ${JSON.stringify(playList2)},
    commentData: ${JSON.stringify(commentData)},
  };
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dauthor.js')}"></script>
</body>
</html>`;
};
