/**
 * Created by army8735 on 2018/3/29.
 */

'use strict';

import Author from '../../assets/d2/author/Author.jsx';

export default function(data) {
  migi.resetUid();

  let isLogin = !!data.ctx.session.uid;
  let authorId = parseInt(data.authorId);
  let info = data.info;
  let aliases = data.aliases;
  let outsides = data.outsides;
  let comment = data.comment;

  let author = migi.preRender(
    <Author authorId={ authorId }
            info={ info }
            aliases={ aliases }
            outsides={ outsides }
            comment={ comment }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: info.name })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dworks.css')}"/>
</head>
<body>
<div id="page">${author}</div>
${data.helper.getDTopNav({ pageId: 2 })}
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.authorId = ${data.helper.stringify(authorId)};
  $CONFIG.info = ${data.helper.stringify(info)};
  $CONFIG.aliases = ${data.helper.stringify(aliases)};
  $CONFIG.outsides = ${data.helper.stringify(outsides)};
  $CONFIG.comment = ${data.helper.stringify(comment)};
</script>
${data.helper.getStat()}
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dauthor2.js')}" defer="defer"></script>
</body>
</html>`;
};
