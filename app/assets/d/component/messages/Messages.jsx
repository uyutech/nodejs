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
    self.on(migi.Event.DOM, function() {
      let $list = $(self.ref.list.element);
      $list.on('click', '.comment', function() {
        let $comment = $(this);
        let $li = $comment.closest('ul').closest('li');
        $list.children('li.cur').removeClass('cur');
        $li.addClass('cur');
        self.emit('comment', $li.attr('id'), $comment.attr('rid'), $comment.attr('cid'), $comment.attr('name'), parseInt($comment.attr('type')), $comment.attr('tid'));
      });
    });
  }
  genItem(item) {
    let type = item.TargetType;
    let url = '#';
    if(type === 1) {
      url = '/author/' + item.urlID;
    }
    else if(type === 2) {
      url = '/works/' + item.urlID;
    }
    else if(type === 3 || type === 4) {
      url = '/post/' + item.urlID;
    }
    if(item.Send_UserISAuthor) {
      return <li class="author" id={ 'message_' + item.NotifyID }>
        <div class="profile fn-clear">
          <img class="pic" src={ util.autoSsl(util.img96_96_80(item.Send_UserHeadUrl || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
          <div class="txt">
            <a href={ '/author/' + item.Send_UserID } class="name">{ item.Send_UserName }</a>
            <a class="time" href={ url }>{ util.formatDate(item.Send_Time) }</a>
          </div>
        </div>
        <div class="wrap">
          <a class="quote" href={ url }>
            <label>{ item.Action }：</label>
            <span>{ item.Content }</span>
          </a>
          <pre class="con">{ item.Send_Content }</pre>
          <ul class="btn fn-clear">
            <li class="comment" type={ type } cid={ item.ParentID } rid={ item.RootID } name={ item.Send_UserName } tid={ item.urlID }>回复</li>
          </ul>
          <b class="arrow"/>
        </div>
      </li>;
    }
    return <li id={ 'message_' + item.NotifyID }>
      <div class="profile fn-clear">
        <img class="pic" src={ util.autoSsl(util.img96_96_80(item.Send_UserHeadUrl || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
        <div class="txt">
          <a href={ '/user/' + item.Send_UserID } class="name">{ item.Send_UserName }</a>
          <a class="time" href={ url }>{ util.formatDate(item.Send_Time) }</a>
        </div>
      </div>
      <div class="wrap">
        <a class="quote" href={ url }>
          <label>{ item.Action }：</label>
          <span>{ item.Content }</span>
        </a>
        <pre class="con">{ item.Send_Content }</pre>
        <ul class="btn fn-clear">
          <li class="comment" type={ type } cid={ item.ParentID } rid={ item.RootID } name={ item.Send_UserName } tid={ item.urlID }>回复</li>
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
  appendChild(content, mid) {
    let $li = $('#' + mid);
    $li.find('.wrap').append(`<pre class="reply">我：${content}</pre>`);
  }
  render() {
    return <div class="cp-messages">
      {
        this.props.data && this.props.data.length
          ? <ol class="list" ref="list" dangerouslySetInnerHTML={ this.html }/>
          : <div class="empty">还没有人回复你哦~</div>
      }
    </div>;
  }
}

export default Messages;
