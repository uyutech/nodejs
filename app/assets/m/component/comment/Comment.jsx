/**
 * Created by army8735 on 2017/8/26.
 */

'use strict';

import $util from '../../common/util';

let exist = {};

const MAX_LEN = 144;

class Comment extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.empty = self.props.empty;
    self.message = self.props.message;

    self.on(migi.Event.DOM, function() {
      let $list = $(this.ref.list.element);
      $list.on('click', '.reply', function() {
        let $this = $(this);
        let id = $this.attr('rel');
        self.emit('reply', id);
      });
      $list.on('click', '.more, .less', function() {
        let $li = $(this).closest('li');
        $li.find('.snap, .full').toggleClass('fn-hide');
      });
    });
  }
  @bind message
  @bind empty
  setData(data) {
    let self = this;
    exist = {};
    if(!data) {
      return;
    }
    let s = '';
    if(!Array.isArray(data)) {
      data = [data];
    }
    data.forEach(function(item) {
      s += self.genItem(item) || '';
    });
    $(self.ref.list.element).html(s);
    self.empty = !s;
  }
  appendData(data) {
    let self = this;
    if(!data) {
      return;
    }
    let s = '';
    if(!Array.isArray(data)) {
      data = [data];
    }
    data.forEach(function(item) {
      s += self.genItem(item) || '';
    });
    $(self.ref.list.element).append(s);
    if(s) {
      self.empty = false;
    }
  }
  prependData(data) {
    let self = this;
    if(!data) {
      return;
    }
    let s = '';
    if(!Array.isArray(data)) {
      data = [data];
    }
    data.forEach(function(item) {
      s += self.genItem(item) || '';
    });
    $(self.ref.list.element).prepend(s);
    if(s) {
      self.empty = false;
    }
  }
  clearData() {
    let self = this;
    exist = {};
    $(self.ref.list.element).html('');
  }
  genItem(item) {
    let id = item.id;
    if(exist[id]) {
      return;
    }
    exist[id] = true;
    let url = item.authorId
      ? '/author.html?id=' + item.authorId
      : '/user.html?id=' + item.userId;
    return <li class={ item.authorId ? 'author'  : 'user' }>
      <div class="t">
        <div class="profile fn-clear">
          <div class="pic"
             title={ item.authorId ? item.name : item.nickname }>
            <img class="pic"
                 src={ $util.img(item.headUrl, 60, 60, 80) || '/src/common/head.png' }/>
          </div>
          <div class="txt">
            <div class="name"
               title={ item.authorId
                 ? item.name
                 : item.nickname }>{ item.authorId
              ? item.name
              : item.nickname }</div>
            <small class="time"
                   rel={ item.createTime }>{ $util.formatDate(item.createTime) }</small>
          </div>
        </div>
        <b class="fn"
           rel={ id }
           own={ item.isOwn }/>
      </div>
      <div class="wrap">
        {
          item.quote
            ? <div class="quote">
                <span>回复@{ item.quote.authorId ? item.quote.name : item.quote.nickname }：</span>
                <p class={ item.quote.isDelete ? 'delete' : '' }>{ item.quote.isDelete ? '内容已删除' : item.quote.content }</p>
              </div>
            : ''
        }
        {
          item.content.length > MAX_LEN
            ? <pre class="snap">
                { item.content.slice(0, MAX_LEN) + '...' }
                <span class="more">查看全文</span>
              </pre>
            : ''
        }
        {
          item.content.length > MAX_LEN
            ? <pre class="full fn-hide">
                { item.content }
                <span class="less">收起全文</span>
              </pre>
            : <pre class="full">
                { item.content }
                <span class="placeholder"/>
              </pre>
        }
        <div class="slide">
          <small class={ 'like' + (item.isLike ? ' liked' : '') }
                 rel={ item.id }>{ item.likeCount || '' }</small>
          <small class="reply"
                 rel={ item.id }/>
        </div>
      </div>
    </li>;
  }
  render() {
    return <div class="cp-comment">
      <ul class="list"
          ref="list"
          dangerouslySetInnerHTML={ this.html }/>
      <p class={ 'empty' + (this.empty ? '' : ' fn-hide') }>这儿空空的，需要你的留言噢(* ॑꒳ ॑* )</p>
      <p class={ 'message' + (this.message ? '' : ' fn-hide') }>{ this.message }</p>
    </div>;
  }
}

export default Comment;
