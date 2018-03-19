/**
 * Created by army8735 on 2017/11/17.
 */

'use strict';

import Message from '../../../assets/d/my/message/Message.jsx';

export default function(data) {
  migi.resetUid();

  let messages = data.messages;
  (messages.data || []).forEach(function(item) {
    let content = item.Content || '';
    if(content.length > 64) {
      item.Content = content.slice(0, 64) + '...';
    }
  });

  let message = migi.preRender(<Message messages={ messages }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead({ title: '消息' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dmy_message.css')}"/>
</head>
<body>
<div id="page">${message}</div>
${data.helper.getDTopNav({ pageId: 10 })}
${data.helper.getDBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.messages = ${data.helper.stringify(messages)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/dmy_message.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
