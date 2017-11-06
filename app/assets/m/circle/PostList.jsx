/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';

class PostList extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.datas.Size) {
      let html = '';
      self.props.datas.data.forEach(function(item) {
        html += self.genItem(item);
      });
      self.html = html;
    }
  }
  genItem(item) {
    let len = item.Content.length;
    let maxLen = 64;
    if(item.IsAuthor) {
      return <li class="author">
        <div class="profile fn-clear">
          <img class="pic" src={ util.autoSsl(util.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
          <div class="txt">
            <a href={ '/author/' + item.IsAuthor } class="name">{ item.SendUserNickName }</a>
            <small class="time">{ util.formatDate(item.Createtime) }</small>
          </div>
        </div>
        <div class="wrap">
          {
            item.Title
              ? <a href={ '/post/' + item.ID } class="t">{ item.Title }</a>
              : ''
          }
          <pre class="con">{ len > maxLen ? (item.Content.slice(0, maxLen) + '...') : item.Content }</pre>
          <div class="fn">
            <a href={ '/post/' + item.ID } class="more">查看全部</a>
            <ul class="btn fn-clear">
              <li class={ 'like' + (item.ISLike ? ' has' : '') } rel={ item.ID }>{ item.ZanCount }</li>
              <li class={ 'favor' + (item.ISCollection ? ' has' : '')} rel={ item.ID }>{ item.FavorCount }</li>
              <li class="share" rel={ item.ID }/>
            </ul>
          </div>
          <b class="arrow"/>
        </div>
      </li>;
    }
    return <li>
      <div class="profile fn-clear">
        <img class="pic" src={ util.autoSsl(util.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png')) }/>
        <div class="txt">
          <span class="name">{ item.SendUserNickName }</span>
          <small class="time">{ util.formatDate(item.Createtime) }</small>
        </div>
      </div>
      <div class="wrap">
        {
          item.Title
            ? <a href={ '/post/' + item.ID } class="t">{ item.Title }</a>
            : ''
        }
        <pre class="con">{ len > maxLen ? (item.Content.slice(0, maxLen) + '...') : item.Content }</pre>
        <div class="fn">
          <a href={ '/post/' + item.ID } class="more">查看全部</a>
          <ul class="btn fn-clear">
            <li class={ 'like' + (item.ISLike ? ' has' : '') } rel={ item.ID }>{ item.ZanCount }</li>
            <li class={ 'favor' + (item.ISCollection ? ' has' : '')} rel={ item.ID }>{ item.FavorCount }</li>
            <li class="share" rel={ item.ID }/>
          </ul>
        </div>
        <b class="arrow"/>
      </div>
    </li>;
  }
  render() {
    return <div class="post-list">
      {
        this.props.datas.Size
          ? <ol ref="list" dangerouslySetInnerHTML={ this.html }/>
          : <div class="empty">暂无内容</div>
      }
    </div>;
  }
}

export default PostList;
