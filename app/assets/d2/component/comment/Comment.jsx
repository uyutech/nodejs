/**
 * Created by army8735 on 2018/1/30.
 */

'use strict';

import util from "../../../d/common/util";

class Comment extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    let html = '';
    (self.props.data || []).forEach(function(item) {
      html += self.genComment(item);
    });
    self.html = html;
  }
  @bind empty
  @bind message
  setData(data) {
    let self = this;
    let html = '';
    (data || []).forEach(function(item) {
      html += self.genComment(item);
    });
    $(self.ref.list.element).html(html);
  }
  genComment(item) {
    return <li id={ 'comment_' + item.id }
               class={ 'item' + (item.isAuthor ? ' author' : '') }>
      <div class="t fn-clear">
        <div class="profile fn-clear">
          <a class="pic"
             href={ item.isAuthor
               ? '/author/' + item.authorId
               : '/user/' + item.userId }>
            <img class="pic"
                 src={ util.autoSsl(util.img60_60_80(item.headUrl
                   || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
          </a>
          <div class="txt">
            <a class="name"
               href={ item.isAuthor
                 ? '/author/' + item.authorId
                 : '/user/' + item.userId }>{ item.isAuthor ? item.name : item.nickname }</a>
            <small class="time" rel={ 1 }>{ util.formatDate(item.updateTime) }</small>
          </div>
        </div>
      </div>
      <div class="c">
        {
          item.quote
            ? <div class="quote">
                <span>回复@{ item.quote.isAuthor ? item.quote.name : item.quote.nickname }：</span>
                <p>{ item.quote.content }</p>
              </div>
            : ''
        }
        <pre>{ item.content }<span class="placeholder"/></pre>
        <div class="slide">
          <small class="like"></small>
          <small class="sub"></small>
        </div>
      </div>
    </li>;
  }
  render() {
    return <div class="cp-comment">
      <ul class="list" ref="list" dangerouslySetInnerHTML={ this.html }/>
      <p class={ 'empty' + (this.empty ? '' : ' fn-hide') }>这儿空空的，需要你的留言噢(* ॑꒳ ॑* )</p>
      <p class={ 'message' + (this.message ? '' : ' fn-hide') }>{ this.message }</p>
    </div>;
  }
}

export default Comment;
