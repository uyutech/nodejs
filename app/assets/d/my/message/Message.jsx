/**
 * Created by army8735 on 2017/11/17.
 */

'use strict';

import Messages from '../../component/messages/Messages.jsx';
import Page from '../../component/page/Page.jsx';
import SubCmt from '../../component/subcmt/SubCmt.jsx';

let take = 10;
let skip = take;

class Message extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      // console.log(self.props.messages);
    });
  }
  render() {
    return <div class="message fn-clear">
      <div class="main">
        <Page ref="page" total={ Math.ceil(this.props.messages.Count / take) }/>
        <Messages data={ this.props.messages.data }/>
        <Page ref="page2" total={ Math.ceil(this.props.messages.Count / take) }/>
      </div>
      <SubCmt/>
    </div>;
  }
}

export default Message;
