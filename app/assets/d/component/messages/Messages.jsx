/**
 * Created by army8735 on 2017/11/18.
 */

'use strict';

import net from '../../common/net';
import util from '../../common/util';

class Messages extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.data && self.props.data.length) {
      let html = '';
      self.props.data.forEach(function(item) {
        html += self.genItem(item);
      });
      self.html = html;
    }
  }
  genItem(item) {
    console.log(item);
    if(item.Send_UserISAuthor) {
      return <li>
        <div class="profile fn-clear">
          <img class="pic" src={ util.autoSsl(util.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
        </div>
        <div class="quote">
          <label>{ item.Action }：</label>
          <p>{ item.Content }</p>
        </div>
      </li>;
    }
    return <li>
      <div class="profile fn-clear">
        <img class="pic" src={ util.autoSsl(util.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
      </div>
      <div class="quote">
        <label>{ item.Action }：</label>
        <p>{ item.Content }</p>
      </div>
    </li>;
  }
  setData(data) {
    let self = this;
    let html = '';
    data.forEach(function(item) {
      html += self.genItem(item);
    });
    $(self.ref.list.element).html(html);
  }
  render() {
    return <div class="cp-messages">
      {
        this.props.data && this.props.data.length
          ? <ol class="list" ref="list" dangerouslySetInnerHTML={ this.html }/>
          : <div class="empty">暂无内容</div>
      }
    </div>;
  }
}

export default Messages;
