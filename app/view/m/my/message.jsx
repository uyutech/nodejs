/**
 * Created by army8735 on 2017/11/18.
 */

'use strict';

import Message from '../../../assets/m/my/message/Message.jsx';

export default function(data) {
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
  ${data.helper.getMHead({ title: '消息' })}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/mmy_message.css')}"/>
</head>
<body>
<div id="page">${message}</div>
${data.helper.getMTopNav()}
${data.helper.getMBotNav()}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.messages = ${data.helper.stringify(messages)};
</script>
<script src="${data.helper.getAssetUrl('/mcommon.js')}" defer="defer"></script>
<script src="${data.helper.getAssetUrl('/mmy_message.js')}" defer="defer"></script>
${data.helper.getStat()}
</body>
</html>`;
};
