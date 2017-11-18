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
    let id = item.Target;
    let type = item.TargetType;
    let url = '#';
    if(type === 1) {
      url = '/author/' + item.urlID;
    }
    else if(type === 2) {
      url = '/works/' + item.urlID;
    }
    else if(type === 3) {
      url = '/post/' + item.urlID;
    }
    if(item.Send_UserISAuthor) {
      return <li class="author">
        <div class="profile fn-clear">
          <img class="pic" src={ util.autoSsl(util.img96_96_80(item.Send_UserHeadUrl || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
          <div class="txt">
            <a href={ '/author/' + item.Send_UserID } class="name">{ item.Send_UserName }</a>
            <a class="time" href={ url }>{ util.formatDate(item.Send_Time) }</a>
          </div>
        </div>
        <div class="wrap">
          <div class="quote">
            <label>{ item.Action }：</label>
            <p>{ item.Content }</p>
          </div>
          <pre class="con">{ item.Send_Content }</pre>
          <ul class="btn fn-clear">
            <li class="comment" type={ type } rel={ id }>{ item.CommentCount }</li>
          </ul>
          <b class="arrow"/>
        </div>
      </li>;
    }
    return <li>
      <div class="profile fn-clear">
        <img class="pic" src={ util.autoSsl(util.img96_96_80(item.Send_UserHeadUrl || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
        <div class="txt">
          <span class="name">{ item.Send_UserName }</span>
          <a class="time" href={ url }>{ util.formatDate(item.Send_Time) }</a>
        </div>
      </div>
      <div class="wrap">
        <div class="quote">
          <label>{ item.Action }：</label>
          <p>{ item.Content }</p>
        </div>
        <pre class="con">{ item.Send_Content }</pre>
        <ul class="btn fn-clear">
          <li class="comment" type={ type } rel={ id }>{ item.CommentCount }</li>
        </ul>
        <b class="arrow"/>
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
  appendData(data) {
    let self = this;
    let html = '';
    data.forEach(function(item) {
      html += self.genItem(item);
    });
    $(self.ref.list.element).append(html);
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
