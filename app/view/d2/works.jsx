/**
 * Created by army8735 on 2018/1/29.
 */

'use strict';

import Works from '../../assets/d2/works/Works.jsx';

export default function(data) {
  migi.resetUid();

  let isLogin = !!data.ctx.session.uid;
  let worksId = parseInt(data.worksId);
  let workId = data.workId;
  let info = data.info;
  let collection = data.collection;
  let authors = data.authors;
  let comment = data.comment;

  let works = migi.preRender(
    <Works worksId={ worksId }
           workId={ workId }
           info={ info }
           collection={ collection }
           authors={ authors }
           comment={ comment }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: info.title })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dworks.css')}"/>
</head>
<body>
<div id="page">${works}</div>
${data.helper.getDTopNav({ pageId: 1 })}
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.worksId = ${data.helper.stringify(worksId)};
  $CONFIG.workId = ${data.helper.stringify(workId)};
  $CONFIG.info = ${data.helper.stringify(info)};
  $CONFIG.collection = ${data.helper.stringify(collection)};
  $CONFIG.authors = ${data.helper.stringify(authors)};
  $CONFIG.comment = ${data.helper.stringify(comment)};
</script>
${data.helper.getStat()}
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dworks2.js')}" defer="defer"></script>
</body>
</html>`;
};
