/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';

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
      self.on(migi.Event.DOM, function() {
        let $list = $(this.ref.list.element);
        $list.on('click', '.like', function() {
          let $li = $(this);
          if($li.hasClass('loading')) {
            return;
          }
          $li.addClass('loading');
          let postID = $li.attr('rel');
          net.postJSON('/api/post/like', { postID }, function(res) {
            if(res.success) {
              let data = res.data;
              if(data.ISLike) {
                $li.addClass('has');
              }
              else {
                $li.removeClass('has');
              }
              $li.text(data.LikeCount);
            }
            else {
              alert(res.message || util.ERROR_MESSAGE);
            }
            $li.removeClass('loading');
          }, function() {
            alert(res.message || util.ERROR_MESSAGE);
            $li.removeClass('loading');
          });
        });
      });
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
          <pre class="con">
            { len > maxLen ? (item.Content.slice(0, maxLen) + '...') : item.Content }
            <a href={ '/post/' + item.ID } class="more">查看全部</a>
          </pre>
          <ul class="btn fn-clear">
            <li class={ 'like' + (item.ISLike ? ' has' : '') } rel={ item.ID }>{ item.LikeCount }</li>
            <li class="comment">{ item.CommentCount }</li>
          </ul>
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
        <pre class="con">
          { len > maxLen ? (item.Content.slice(0, maxLen) + '...') : item.Content }
          <a href={ '/post/' + item.ID } class="more">点击展开></a>
        </pre>
        <ul class="btn fn-clear">
          <li class={ 'like' + (item.ISLike ? ' has' : '') } rel={ item.ID }>{ item.LikeCount }</li>
          <li class="comment" rel={ item.ID }>{ item.CommentCount }</li>
        </ul>
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
